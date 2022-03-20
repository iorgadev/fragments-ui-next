import React from "react";
import { FingerPrintIcon } from "@heroicons/react/solid";

function LoggedInAs() {
  return (
    <div className="w-40 p-4 text-xl rounded-lg bg-zinc-800">
      {/* <div className=""> */}
      <div className="p-2 rounded-lg bg-zinc-900 w-min">
        <FingerPrintIcon className="w-8 h-8" />
        {/* </div> */}
      </div>
      <span className="text-white">
        <span className="text-sm font-black tracking-wider text-orange-500 uppercase">
          IORGADEV
        </span>
      </span>
    </div>
  );
}

export default LoggedInAs;
