import React from "react";
import Image from "next/image";
import { useAtom } from "jotai";
import { selectedLinkAtom } from "@/components/Menu";

function NoFragments() {
  const [selectedLink, setSelectedLink] = useAtom(selectedLinkAtom);
  const [animate, setAnimate] = React.useState(false);

  const handleDragEnter = () => {
    setAnimate(true);
    setTimeout(() => {
      setSelectedLink("create");
    }, 300);
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      className={`flex flex-col items-center justify-start w-full h-full pt-10 border-4 border-transparent transform transition-all duration-300 translate-x-0 ${
        animate ? `-translate-x-full` : ``
      }`}
    >
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
    </div>
  );
}

export default NoFragments;
