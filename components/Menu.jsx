import React from "react";
import { useAtom, atom } from "jotai";
import { userFragmentsAtom } from "@/pages/_app";
import { fragmentColors } from "@/utils/fragmentTypes";
import {
  CubeIcon,
  ViewGridAddIcon,
  RefreshIcon,
  DocumentTextIcon,
  CodeIcon,
  PhotographIcon,
} from "@heroicons/react/outline";

export const selectedLinkAtom = atom("all");

function Menu({ getUserFragments, loading }) {
  const [selectedLink, setSelectedLink] = useAtom(selectedLinkAtom);
  const [fragments] = useAtom(userFragmentsAtom);

  return (
    <div className="menu">
      <div className="menu__container">
        {/* All Fragments Link */}
        <div
          className={`menu__item ${selectedLink === "all" ? `active` : ``}`}
          onClick={() => setSelectedLink((prev) => "all")}
        >
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

        {/* Create Fragments Link */}
        <div
          className={`menu__item  ${selectedLink === "create" ? `active` : ``}`}
          onClick={() => setSelectedLink((prev) => "create")}
        >
          <ViewGridAddIcon />
          <span>Create Fragment</span>
        </div>

        {/* Create Fragments By Type Links */}
        <ul className="menu__types">
          <li className="title">Supported Types:</li>
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
    </div>
  );
}

export default Menu;
