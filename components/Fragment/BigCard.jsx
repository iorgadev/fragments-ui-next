import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/pages/_app";
import { selectedFragmentAtom } from "@/components/Fragment/InfoIconBig";
import {
  getValidConversionTypes,
  getMimeTypeExtension,
  getExtensionMimeType,
  backgroundColors,
} from "@/utils/fragmentTypes";
import SyntaxHighlighter from "react-syntax-highlighter";
import { stackoverflowDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import {
  EyeIcon,
  XIcon,
  PencilAltIcon,
  TrashIcon,
  FingerPrintIcon,
  ClockIcon,
  DocumentIcon,
  ArrowsExpandIcon,
  ColorSwatchIcon,
  ArrowSmRightIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import Loading from "@/components/Loading";
import Stat from "./Stat";
import { humanFileSize, humanDate } from "@/utils/fragmentUtils";
import Edit from "./Edit";
import Delete from "./Delete";

function BigCard() {
  const [user] = useAtom(userAtom);
  const [fragmentData, setFragmentData] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedFragment, setSelectedFragment] = useAtom(selectedFragmentAtom);
  const [conversionExtension, setConversionExtension] = useState("");
  const [fragmentMimeType, setFragmentMimeType] = useState("");
  const [action, setAction] = useState("");

  const handleCloseFragmentData = (e) => {
    e.stopPropagation();
    setSelectedFragment({});
  };

  const fetchFragmentData = async (fragment, ext = "") => {
    setLoading((prev) => true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/fragments/${fragment.id}${
        ext.length > 0 ? "." + ext : ""
      }`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.signInUserSession.idToken.jwtToken}`,
        },
      }
    );

    var data;
    if (
      selectedFragment.type === "text/plain" ||
      selectedFragment.type === "text/markdown" ||
      selectedFragment.type === "text/html" ||
      selectedFragment.type === "application/json"
    ) {
      data = await response.text();
      data = data.toString();
    } else if (
      selectedFragment.type === "image/png" ||
      selectedFragment.type === "image/jpeg" ||
      selectedFragment.type === "image/webp" ||
      selectedFragment.type === "image/gif"
    ) {
      data = await response.blob();
      data = await data.arrayBuffer();
      data = await Buffer.from(data).toString("base64");
    }
    setLoading((prev) => false);
    setFragmentMimeType((prev) =>
      conversionExtension.length > 0
        ? getExtensionMimeType(conversionExtension)
        : selectedFragment.type
    );
    setFragmentData(data);
  };

  useEffect(() => {
    if (selectedFragment.id) {
      fetchFragmentData(selectedFragment, conversionExtension);
    }
  }, [conversionExtension]);

  useEffect(() => {
    console.log("Fragment Type: ", fragmentMimeType);
  }, [fragmentMimeType]);

  useEffect(() => {
    if (!selectedFragment) return;
    fetchFragmentData(selectedFragment);
  }, [selectedFragment]);

  return (
    <div className="fragment" onClick={(e) => handleCloseFragmentData(e)}>
      <div
        className="fragment__container"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {/* Stats */}
        <div className="fragment__stats">
          <Stat
            icon={<FingerPrintIcon />}
            label="Fragment ID"
            value={selectedFragment.id}
          />

          <Stat
            icon={<ClockIcon />}
            label="Created"
            value={humanDate(selectedFragment.created)}
          />

          <Stat
            icon={<PencilAltIcon />}
            label="Modified"
            value={humanDate(selectedFragment.updated)}
          />

          <Stat
            icon={<DocumentIcon />}
            label="Type"
            value={
              conversionExtension ? (
                <>
                  <div className="flex items-center space-x-2">
                    <span>{selectedFragment.type}</span>
                    <div className="flex items-center text-xs text-orange-200">
                      <ArrowSmRightIcon className="w-4 h-4" />
                    </div>

                    <span>.{conversionExtension}</span>
                    <XCircleIcon
                      className="w-5 h-5 text-teal-900 bg-teal-500 rounded-full cursor-pointer"
                      onClick={() => {
                        setAction("");
                        setConversionExtension((prev) => "");
                      }}
                    />
                  </div>
                </>
              ) : (
                <span className="h-7">{selectedFragment.type}</span>
              )
            }
          />

          <Stat
            icon={<ArrowsExpandIcon />}
            label="Size"
            value={humanFileSize(selectedFragment.size)}
          />

          <Stat
            icon={<ColorSwatchIcon />}
            label="Conversions"
            value={getValidConversionTypes(selectedFragment.type).map(
              (type, i) => {
                const mainType = type.split("/")[0];
                const subType = type.split("/")[1];

                return (
                  <div
                    key={i}
                    className="conversion"
                    onClick={(e) => {
                      e.stopPropagation();
                      setAction("");
                      setConversionExtension(getMimeTypeExtension(type));
                    }}
                  >
                    <div className="conversion__item">
                      <span
                        className="p-1 font-semibold uppercase rounded-sm"
                        style={{ backgroundColor: backgroundColors[type] }}
                      >
                        {mainType}
                      </span>
                      <span className="uppercase">{subType}</span>
                    </div>
                    <EyeIcon className="eye" />
                  </div>
                );
              }
            )}
          />
        </div>

        {/* Fragment Data + Actions */}
        <div className="fragment__data">
          <div className="actions">
            <div className="icon" onClick={(e) => handleCloseFragmentData(e)}>
              <XIcon className="close" />
            </div>

            <div className="icon" onClick={() => setAction((prev) => "")}>
              <EyeIcon className={action === "" ? `active` : ``} />
            </div>

            <div className="icon" onClick={() => setAction((prev) => "edit")}>
              <PencilAltIcon className={action === "edit" ? `active` : ``} />
            </div>

            <div className="icon" onClick={() => setAction((prev) => "delete")}>
              <TrashIcon className={action === "delete" ? `active` : ``} />
            </div>
          </div>

          {loading ? (
            <Loading />
          ) : action === "" ? (
            <div className="fragment__data__container">
              {fragmentMimeType === "text/plain" ? (
                // <pre>{fragmentData}</pre>
                <SyntaxHighlighter
                  language="text"
                  style={stackoverflowDark}
                  wrapLongLines={true}
                  lineNumberStyle={{
                    fontWeight: "bold",
                    borderRight: "1px solid #ccc",
                    marginRight: "1rem",
                  }}
                >
                  {fragmentData}
                </SyntaxHighlighter>
              ) : null}

              {fragmentMimeType === "text/markdown" ? (
                <SyntaxHighlighter
                  language="markdown"
                  style={stackoverflowDark}
                  wrapLongLines={true}
                  showLineNumbers={true}
                  lineNumberStyle={{
                    fontWeight: "bold",
                    borderRight: "1px solid #ccc",
                    marginRight: "1rem",
                  }}
                >
                  {fragmentData}
                </SyntaxHighlighter>
              ) : null}

              {fragmentMimeType === "text/html" ? (
                <SyntaxHighlighter
                  language="html"
                  style={stackoverflowDark}
                  // customStyle={{ width: "100%" }}
                  wrapLongLines={true}
                  // useInlineStyles={false}
                  showLineNumbers={true}
                  lineNumberStyle={{
                    fontWeight: "bold",
                    borderRight: "1px solid #ccc",
                    marginRight: "1rem",
                  }}
                >
                  {fragmentData}
                </SyntaxHighlighter>
              ) : null}

              {fragmentMimeType === "application/json" ? (
                <SyntaxHighlighter
                  language="json"
                  style={stackoverflowDark}
                  wrapLongLines={true}
                  // showLineNumbers={true}
                  lineNumberStyle={{
                    fontWeight: "bold",
                    borderRight: "1px solid #ccc",
                    marginRight: "1rem",
                  }}
                >
                  {fragmentData}
                </SyntaxHighlighter>
              ) : null}

              {fragmentMimeType === "image/png" ||
              fragmentMimeType === "image/jpeg" ||
              fragmentMimeType === "image/webp" ||
              fragmentMimeType === "image/gif" ? (
                <div className="fragment__data__container__image">
                  <img
                    src={`data:image/png;base64,${fragmentData}`}
                    width="auto"
                  />
                </div>
              ) : null}
            </div>
          ) : action === "edit" ? (
            <Edit fragment={selectedFragment} setAction={setAction} />
          ) : action === "delete" ? (
            <Delete fragment={selectedFragment} setAction={setAction} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default BigCard;
