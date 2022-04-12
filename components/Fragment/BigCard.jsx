import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/pages/_app";
import { selectedFragmentAtom } from "@/components/Fragment/InfoIconBig";
import { getExtensionMimeType } from "@/utils/fragmentTypes";
import SyntaxHighlighter from "react-syntax-highlighter";
import { stackoverflowDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";

import Loading from "@/components/Loading";
import Edit from "./Edit";
import Delete from "./Delete";
import Stats from "./Stats";
import Actions from "./Actions";

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
        {/* Fragment Side Panel Stats */}
        <Stats
          setAction={setAction}
          conversionExtension={conversionExtension}
          setConversionExtension={setConversionExtension}
          selectedFragment={selectedFragment}
        />

        {/* Fragment Data + Actions */}
        <div className="fragment__data">
          <Actions
            handleCloseFragmentData={handleCloseFragmentData}
            action={action}
            setAction={setAction}
          />

          {loading ? (
            <Loading />
          ) : action === "" ? (
            <div className="fragment__data__container">
              {fragmentMimeType === "application/json" ||
              fragmentMimeType === "text/plain" ||
              fragmentMimeType === "text/markdown" ||
              fragmentMimeType === "text/html" ? (
                <SyntaxHighlighter
                  language={
                    fragmentMimeType.split("/")[1] === "plain"
                      ? "text"
                      : fragmentMimeType.split("/")[1]
                  }
                  style={stackoverflowDark}
                  wrapLongLines={true}
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
                    src={`data:${fragmentMimeType};base64,${fragmentData}`}
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
