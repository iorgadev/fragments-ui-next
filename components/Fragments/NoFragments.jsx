import React from "react";
import Image from "next/image";
import { useAtom } from "jotai";
import { selectedLinkAtom } from "@/components/Menu";

function NoFragments() {
  const [selectedLink, setSelectedLink] = useAtom(selectedLinkAtom);
  return (
    <div className="flex flex-col items-center justify-start w-full h-full pt-10 border-4 border-transparent">
      <Image
        src="/images/not-found.png"
        alt="No Fragments"
        width={256}
        height={256}
        layout="intrinsic"
      />

      <span className="mt-4 text-3xl font-semibold text-teal-300">
        No Fragments Found
      </span>

      <span className="mt-2 text-base text-teal-600">
        <span
          className="text-teal-300 underline cursor-pointer underline-offset-4 hover:text-orange-500"
          onClick={() => setSelectedLink("create")}
        >
          Click here
        </span>{" "}
        to create your first Fragment.
      </span>
      {/* <div className="flex flex-col p-3 mt-3 space-y-2 bg-teal-900 rounded-md bg-opacity-30">
        <span className="text-xs font-semibold text-teal-300 uppercase">
          Valid Fragment Types:
        </span>
        <div className="flex flex-wrap items-center justify-center space-x-2">
          {getAllExtensions().map((type, i) => {
            return (
              <span key={i} className="px-1 py-0.5 bg-neutral-900 rounded-sm">
                .{type}
              </span>
            );
          })}
        </div>
      </div> */}
    </div>
  );
}

export default NoFragments;
