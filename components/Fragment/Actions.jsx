import React from "react";
import {
  EyeIcon,
  XIcon,
  PencilAltIcon,
  TrashIcon,
} from "@heroicons/react/solid";

export default function Actions({
  action,
  setAction,
  handleCloseFragmentData,
}) {
  return (
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
  );
}
