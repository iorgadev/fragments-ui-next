import React from "react";
import { useAtom } from "jotai";
import { selectedFragmentAtom } from "@/pages/_app";
import { XIcon } from "@heroicons/react/solid";
import { getValidConversionTypes } from "@/utils/fragmentTypes";

function BigCard() {
  const [selectedFragment, setSelectedFragment] = useAtom(selectedFragmentAtom);

  const handleCloseFragmentData = (e) => {
    e.stopPropagation();
    setSelectedFragment({});
  };

  return (
    <div className="fragment" onClick={(e) => handleCloseFragmentData(e)}>
      <div className="absolute top-0 right-0">
        <span className="relative top-2 right-2">
          <XIcon className="close-icon" />
        </span>
      </div>
      <div
        className="fragment__container"
        onClick={(e) => {
          e.stopPropagation();
          console.log("clicked on inner fragment data");
        }}
      >
        {/* <span>ID: {selectedFragment.id}</span>
        <span>Created: {selectedFragment.created}</span>
        <span>Modified: {selectedFragment.updated}</span>
        <span>Type: {selectedFragment.type}</span>
        <span>Size: {selectedFragment.size}</span>
        <span>
          Conversions:{" "}
          {getValidConversionTypes(selectedFragment.type).map((type) => (
            <span>{type}</span>
          ))}
        </span> */}
        <div className="fragment__data">data</div>
        <div className="fragment__stats"></div>
      </div>
    </div>
  );
}

export default BigCard;
