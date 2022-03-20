import { useState } from "react";
import { FolderIcon } from "@heroicons/react/solid";

function InfoIconBig(props) {
  const { fragment } = props;
  const [selected, setSelected] = useState(false);

  return (
    <div
      className={`border border-teal-900 flex flex-col items-center justify-center p-2 ${
        selected
          ? `border-teal-900 bg-teal-800`
          : `border-transparent bg-transparent`
      }`}
      onClick={() => setSelected((prev) => !prev)}
    >
      <FolderIcon className="w-24 h-24" />
      <span>{fragment.id.slice(0, 6)}</span>
    </div>
  );
}

export default InfoIconBig;
