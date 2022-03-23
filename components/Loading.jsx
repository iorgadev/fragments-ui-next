import React from "react";

function Loading() {
  return (
    <div className="absolute flex items-center justify-center w-full h-full col-span-6">
      <div className="loader">
        <div className="loader__inner"></div>
      </div>
    </div>
  );
}

export default Loading;
