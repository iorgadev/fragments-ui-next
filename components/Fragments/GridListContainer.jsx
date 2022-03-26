import React from "react";

import Loading from "@/components/Loading";
import InfoIconBig from "@/components/Fragment/InfoIconBig";
import NoFragments from "./NoFragments";

function GridListContainer({ loading, filterFragments }) {
  return (
    <div className={`fragments__container`}>
      {loading ? (
        <Loading />
      ) : filterFragments().length > 0 ? (
        <div className="grid grid-cols-6 gap-3">
          {filterFragments().map((fragment) => {
            return <InfoIconBig key={fragment.id} fragment={fragment} />;
          })}
        </div>
      ) : (
        <NoFragments />
      )}
    </div>
  );
}

export default GridListContainer;
