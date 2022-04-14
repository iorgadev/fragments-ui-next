import { useState } from "react";
import { useAtom } from "jotai";
import { DocumentIcon } from "@heroicons/react/solid";
import { getMimeTypeExtension } from "../../utils/fragmentTypes";
// import { selectedFragmentAtom } from "@/pages/_app";

const fragmentColors = {
  "text/plain": "text-slate-400",
  "text/markdown": "text-yellow-400",
  "text/html": "text-purple-400",
  "application/json": "text-orange-400",
  "image/png": "text-green-400",
  "image/jpeg": "text-blue-400",
  "image/webp": "text-red-400",
  "image/gif": "text-lime-400",
};
import { atom } from "jotai";
export const selectedFragmentAtom = atom({});

function InfoIconBig(props) {
  const { fragment } = props;
  const [selected, setSelected] = useState(false);
  const [selectedFragment, setSelectedFragment] = useAtom(selectedFragmentAtom);

  const handleClick = () => {
    // console.log("InfoIconBig.jsx handleClick(): ", fragment);
    // setSelected((prev) => true);
    setSelectedFragment((prev) => (prev = fragment));
  };

  return (
    <div
      className={`border flex flex-col items-center justify-center p-2 cursor-pointer  ${
        selectedFragment.id === fragment.id
          ? `border-teal-700 bg-teal-800`
          : `border-transparent bg-transparent hover:border-teal-900 hover:bg-teal-900 hover:bg-opacity-20`
      }`}
      onClick={handleClick}
    >
      <div className="relative flex items-center justify-center">
        <DocumentIcon
          className={`w-24 h-24 ${fragmentColors[fragment.type]}`}
        />
        <span
          className="absolute text-xs font-black uppercase text-teal-50"
          style={{ textShadow: `1px 1px 0px #000000` }}
        >
          .{getMimeTypeExtension(fragment.type)}
        </span>
      </div>
      <span className="relative text-sm -top-1">{fragment.id.slice(0, 6)}</span>
    </div>
  );
}

export default InfoIconBig;
