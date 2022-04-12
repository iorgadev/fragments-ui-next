import React from "react";
import { humanDate, humanFileSize } from "@/utils/fragmentUtils";
import {
  getValidConversionTypes,
  getMimeTypeExtension,
  backgroundColors,
} from "@/utils/fragmentTypes";
import Stat from "./Stat";
import {
  EyeIcon,
  PencilAltIcon,
  FingerPrintIcon,
  ClockIcon,
  DocumentIcon,
  ArrowsExpandIcon,
  ColorSwatchIcon,
  ArrowSmRightIcon,
  XCircleIcon,
} from "@heroicons/react/solid";

export default function Stats({
  setAction,
  conversionExtension,
  setConversionExtension,
  selectedFragment,
}) {
  return (
    <div className="fragment__stats">
      <Stat
        icon={<FingerPrintIcon />}
        label="Fragment ID"
        value={selectedFragment.id}
      />

      <Stat
        icon={<ClockIcon />}
        label="Created"
        value={humanDate(selectedFragment.created)}
      />

      <Stat
        icon={<PencilAltIcon />}
        label="Modified"
        value={humanDate(selectedFragment.updated)}
      />

      <Stat
        icon={<DocumentIcon />}
        label={
          <>
            <span>Type</span>
            {conversionExtension ? (
              <span className="ml-2 text-orange-300">(Converted)</span>
            ) : (
              ``
            )}
          </>
        }
        value={
          conversionExtension ? (
            <>
              <div className="flex items-center space-x-2">
                <span>{selectedFragment.type}</span>
                <div className="flex items-center text-xs text-orange-200">
                  <ArrowSmRightIcon className="w-4 h-4" />
                </div>

                <span>.{conversionExtension}</span>
                <XCircleIcon
                  className="w-5 h-5 text-teal-900 bg-teal-500 rounded-full cursor-pointer"
                  onClick={() => {
                    setAction("");
                    setConversionExtension((prev) => "");
                  }}
                />
              </div>
            </>
          ) : (
            <span className="h-7">{selectedFragment.type}</span>
          )
        }
      />

      <Stat
        icon={<ArrowsExpandIcon />}
        label="Size"
        value={humanFileSize(selectedFragment.size)}
      />

      <Stat
        icon={<ColorSwatchIcon />}
        label="Conversions"
        value={getValidConversionTypes(selectedFragment.type).map((type, i) => {
          const mainType = type.split("/")[0];
          const subType = type.split("/")[1];

          return (
            <div
              key={i}
              className="conversion"
              onClick={(e) => {
                e.stopPropagation();
                setAction("");
                setConversionExtension(getMimeTypeExtension(type));
              }}
            >
              <div className="conversion__item">
                <span
                  className="p-1 font-semibold uppercase rounded-sm"
                  style={{ backgroundColor: backgroundColors[type] }}
                >
                  {mainType}
                </span>
                <span className="uppercase">{subType}</span>
              </div>
              <EyeIcon className="eye" />
            </div>
          );
        })}
      />
    </div>
  );
}
