import React from "react";
import { useAtom } from "jotai";
import { selectedLinkAtom, userAtom, userFragmentsAtom } from "@/pages/_app";
import { fragmentColors } from "@/utils/fragmentTypes";

import { ChevronDownIcon } from "@heroicons/react/solid";
import { CubeIcon, ViewGridAddIcon, UserIcon } from "@heroicons/react/outline";

function Menu() {
  const [user] = useAtom(userAtom);
  const [selectedLink, setSelectedLink] = useAtom(selectedLinkAtom);
  const [fragments] = useAtom(userFragmentsAtom);

  return (
    <div className="menu">
      <div className="menu__container">
        <div className={`menu__item ${selectedLink === "all" ? `active` : ``}`}>
          <CubeIcon />
          <span>All Fragments </span>
          <span className="px-1 py-0.5 text-xs bg-teal-900 rounded-md">
            {fragments.length}
          </span>
        </div>
        <div className="menu__item">
          <ViewGridAddIcon />
          <span>Create Fragment</span>
          <ChevronDownIcon className="w-4 h-4" />
        </div>
        <ul className="menu__types">
          <li>
            <span
              className={`file ${fragmentColors["text/plain"]} bg-slate-800`}
            >
              txt
            </span>
            <span>text/plain</span>
          </li>
          <li>
            <span
              className={`file ${fragmentColors["text/markdown"]}  bg-yellow-800`}
            >
              md
            </span>
            <span>text/markdown</span>
          </li>
          <li>
            <span
              className={`file ${fragmentColors["text/html"]}  bg-purple-800`}
            >
              html
            </span>
            <span>text/html</span>
          </li>
          <li>
            <span
              className={`file ${fragmentColors["application/json"]}  bg-orange-800`}
            >
              json
            </span>
            <span>application/json</span>
          </li>
          <li>
            <span
              className={`file ${fragmentColors["image/png"]}  bg-green-800`}
            >
              png
            </span>
            <span>image/png</span>
          </li>
          <li>
            <span
              className={`file ${fragmentColors["image/jpeg"]}  bg-blue-800`}
            >
              jpg
            </span>
            <span>image/jpeg</span>
          </li>
          <li>
            <span
              className={`file ${fragmentColors["image/webp"]}  bg-red-800`}
            >
              webp
            </span>
            <span>image/webp</span>
          </li>
          <li>
            <span
              className={`file ${fragmentColors["image/gif"]}  bg-neutral-800`}
            >
              gif
            </span>
            <span>image/gif</span>
          </li>
        </ul>
      </div>
      <div className="menu__footer">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center flex-grow space-x-2">
            <UserIcon className="w-6 h-6 p-1 text-teal-200 bg-teal-700 rounded-md" />
            <span className="text-sm font-bold uppercase">{user.username}</span>
          </div>
          <span className="text-xs uppercase text-neutral-400 font-semibold bg-neutral-900 py-0.5 px-1 rounded-md flex-none">
            logout
          </span>
        </div>
      </div>
    </div>
  );
}

export default Menu;
