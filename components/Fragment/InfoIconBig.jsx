import React from "react";
import { FolderIcon } from "@heroicons/react/solid";

function InfoIconBig(props) {
  return (
    <div className="border border-blue-100">
      <FolderIcon className="w-10 h-10" />
      <span>.JSON</span>
    </div>
  );
}

export default InfoIconBig;
