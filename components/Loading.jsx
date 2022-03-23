import React from "react";

function Loading() {
  return (
    <div className="relative flex items-center justify-center h-full col-span-6">
      <div className="loader">
        <div className="loader__inner"></div>
      </div>
    </div>
  );
}

export default Loading;
