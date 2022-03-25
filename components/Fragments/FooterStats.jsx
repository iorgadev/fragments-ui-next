import React from "react";

import {
  getLargestFragment,
  humanFileSize,
  getTotalSize,
} from "../../utils/fragmentUtils";

import {
  CubeIcon,
  ChartPieIcon,
  ArrowsExpandIcon,
} from "@heroicons/react/outline";

function FooterStats({ filterFragments }) {
  return (
    <div className="fragments__footer">
      <div className="fragments__footer__container">
        <span className="fragments__footer__stat">
          <CubeIcon />
          <span className="fragments__footer__value">
            {filterFragments().length}
          </span>
          <span>fragments</span>
        </span>
        <span className="fragments__footer__stat">
          <ChartPieIcon />
          <span className="fragments__footer__value">
            {humanFileSize(getTotalSize(filterFragments()))}
          </span>
          <span>space used</span>
        </span>
        <span className="fragments__footer__stat">
          <ArrowsExpandIcon />
          <span className="fragments__footer__value">
            {humanFileSize(getLargestFragment(filterFragments()))}
          </span>
          <span>largest fragment</span>
        </span>
      </div>
    </div>
  );
}

export default FooterStats;
