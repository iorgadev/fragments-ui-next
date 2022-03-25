import React from "react";

function Loading() {
  return (
    <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full col-span-6">
      <div className="loader">
        <div className="loader__inner"></div>
      </div>
    </div>
  );
}

export default Loading;
