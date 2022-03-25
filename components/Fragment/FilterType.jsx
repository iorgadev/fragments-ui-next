import React from "react";
import { CheckIcon } from "@heroicons/react/solid";

export const filterTypesArray = [
  {
    type: "text/plain",
    label: "Plain Text",
    selected: false,
  },
  {
    type: "text/markdown",
    label: "Markdown",
    selected: false,
  },
  {
    type: "text/html",
    label: "HTML",
    selected: false,
  },
  {
    type: "application/json",
    label: "JSON",
    selected: false,
  },
  {
    type: "image/png",
    label: "PNG",
    selected: false,
  },
  {
    type: "image/jpeg",
    label: "JPEG",
    selected: false,
  },
  {
    type: "image/webp",
    label: "WebP",
    selected: false,
  },
  {
    type: "image/gif",
    label: "GIF",
    selected: false,
  },
];

function FilterType({ filterType, filterTypes, setFilterTypes }) {
  // handle selecting types to filter by
  const handleFilterTypes = (type) => {
    const newFilterTypes = filterTypes.map((filterType) => {
      if (filterType.type === type) {
        filterType.selected = !filterType.selected;
      }
      return filterType;
    });
    setFilterTypes((prev) => newFilterTypes);
  };
  // is the filter type selected?
  const isFilterTypeSelected = (type) => {
    const selected = filterTypes.find((filterType) => filterType.type === type);
    return selected.selected;
  };

  return (
    <div
      className={`flex items-center space-x-2 cursor-pointer p-2 hover:text-teal-300 hover:bg-gray-500`}
      onClick={() => handleFilterTypes(filterType.type)}
    >
      <div
        className={`w-4 h-4 flex items-center justify-center rounded-sm ${
          isFilterTypeSelected(filterType.type) ? `bg-teal-300` : `bg-gray-600`
        }`}
      >
        {isFilterTypeSelected(filterType.type) ? (
          <CheckIcon className="w-4 h-4 text-teal-900" />
        ) : null}
      </div>
      <span className="text-sm uppercase">{filterType.type}</span>
    </div>
  );
}

export default FilterType;
