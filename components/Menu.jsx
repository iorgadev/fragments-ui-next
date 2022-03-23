import React from "react";
import { useAtom } from "jotai";
import { selectedLinkAtom, userAtom, userFragmentsAtom } from "@/pages/_app";
import { fragmentColors } from "@/utils/fragmentTypes";

import { ChevronDownIcon } from "@heroicons/react/solid";
import {
  CubeIcon,
  ViewGridAddIcon,
  UserIcon,
  RefreshIcon,
  DocumentTextIcon,
  CodeIcon,
  PhotographIcon,
} from "@heroicons/react/outline";

function Menu({ getUserFragments, loading }) {
  const [user] = useAtom(userAtom);
  const [selectedLink, setSelectedLink] = useAtom(selectedLinkAtom);
  const [fragments] = useAtom(userFragmentsAtom);

  return (
    <div className="menu">
      <div className="menu__container">
        <div className={`menu__item ${selectedLink === "all" ? `active` : ``}`}>
          <CubeIcon className="flex-none" />
          <span className="whitespace-nowrap">All Fragments </span>
          <span className="px-1 py-0.5 text-xs bg-teal-900 rounded-md">
            {fragments.length}
          </span>
          <div className="flex items-center justify-end w-full">
            <RefreshIcon
              className={`refresh-icon ${loading ? "spin" : ""}`}
              onClick={() => getUserFragments()}
            />
          </div>
        </div>
        <div className="menu__item">
          <ViewGridAddIcon />
          <span>Create Fragment</span>
          <ChevronDownIcon className="w-4 h-4" />
        </div>
        <ul className="menu__types">
          <li className="type">
            <DocumentTextIcon />
            <span>TEXT</span>
          </li>
          <li>
            <span
              className={`file ${fragmentColors["text/plain"]} bg-slate-800`}
            >
              txt
            </span>
            <span>plain</span>
          </li>
          <li>
            <span
              className={`file ${fragmentColors["text/markdown"]}  bg-yellow-800`}
            >
              md
            </span>
            <span>markdown</span>
          </li>
          <li>
            <span
              className={`file ${fragmentColors["text/html"]}  bg-purple-800`}
            >
              html
            </span>
            <span>html</span>
          </li>
          <li className="type">
            <CodeIcon />
            <span>APPLICATION</span>
          </li>
          <li>
            <span
              className={`file ${fragmentColors["application/json"]}  bg-orange-800`}
            >
              json
            </span>
            <span>json</span>
          </li>
          <li className="type">
            <PhotographIcon />
            <span>IMAGE</span>
          </li>
          <li>
            <span
              className={`file ${fragmentColors["image/png"]}  bg-green-800`}
            >
              png
            </span>
            <span>png</span>
          </li>
          <li>
            <span
              className={`file ${fragmentColors["image/jpeg"]}  bg-blue-800`}
            >
              jpg
            </span>
            <span>jpeg</span>
          </li>
          <li>
            <span
              className={`file ${fragmentColors["image/webp"]}  bg-red-800`}
            >
              webp
            </span>
            <span>webp</span>
          </li>
          <li>
            <span
              className={`file ${fragmentColors["image/gif"]}  bg-neutral-800`}
            >
              gif
            </span>
            <span>gif</span>
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
