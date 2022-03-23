import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/pages/_app";
import { selectedFragmentAtom } from "@/components/Fragment/InfoIconBig";
import { XIcon } from "@heroicons/react/solid";
import { getValidConversionTypes } from "@/utils/fragmentTypes";
import SyntaxHighlighter from "react-syntax-highlighter";
import { stackoverflowDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import {
  FingerPrintIcon,
  ClockIcon,
  PencilAltIcon,
  DocumentIcon,
  ArrowsExpandIcon,
  ColorSwatchIcon,
} from "@heroicons/react/solid";
import Loading from "@/components/Loading";
import Stat from "./Stat";
import { humanFileSize, humanDate } from "@/utils/fragmentUtils";

function BigCard() {
  const [user] = useAtom(userAtom);
  const [fragmentData, setFragmentData] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedFragment, setSelectedFragment] = useAtom(selectedFragmentAtom);

  const handleCloseFragmentData = (e) => {
    e.stopPropagation();
    setSelectedFragment({});
  };

  const fetchFragmentData = async (fragment) => {
    setLoading((prev) => true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/fragments/${fragment.id}`,
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
    setFragmentData(data);
  };

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
            value={selectedFragment.type}
          />

          <Stat
            icon={<ArrowsExpandIcon />}
            label="Size"
            value={humanFileSize(selectedFragment.size)}
          />

          <Stat
            icon={<ColorSwatchIcon />}
            label="Conversions"
            value={getValidConversionTypes(selectedFragment.type).join(", ")}
          />
        </div>
        <div className="fragment__data">
          <div
            className="absolute top-0 right-0"
            onClick={(e) => handleCloseFragmentData(e)}
          >
            <span className="relative -top-5 -right-5">
              <XIcon className="close-icon" />
            </span>
          </div>
          {loading ? (
            <Loading />
          ) : (
            <div className="fragment__data__container">
              {selectedFragment.type === "text/plain" ? (
                // <pre>{fragmentData}</pre>
                <SyntaxHighlighter
                  language="text"
                  style={stackoverflowDark}
                  wrapLongLines={true}
                >
                  {fragmentData}
                </SyntaxHighlighter>
              ) : null}

              {selectedFragment.type === "text/markdown" ? (
                <SyntaxHighlighter
                  language="markdown"
                  style={stackoverflowDark}
                  wrapLongLines={true}
                >
                  {fragmentData}
                </SyntaxHighlighter>
              ) : null}

              {selectedFragment.type === "text/html" ? (
                <SyntaxHighlighter
                  language="html"
                  style={stackoverflowDark}
                  // customStyle={{ width: "100%" }}
                  wrapLongLines={true}
                  // useInlineStyles={false}
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

              {selectedFragment.type === "application/json" ? (
                <SyntaxHighlighter
                  language="json"
                  style={stackoverflowDark}
                  wrapLongLines={true}
                >
                  {fragmentData}
                </SyntaxHighlighter>
              ) : null}

              {selectedFragment.type === "image/png" ||
              selectedFragment.type === "image/jpeg" ||
              selectedFragment.type === "image/webp" ||
              selectedFragment.type === "image/gif" ? (
                <div className="fragment__data__container__image">
                  <img
                    src={`data:image/png;base64,${fragmentData}`}
                    width="auto"
                  />
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BigCard;
