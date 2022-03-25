import React from "react";

import {
  ChevronDownIcon,
  DocumentSearchIcon,
  SortAscendingIcon,
  SortDescendingIcon,
} from "@heroicons/react/solid";

import FilterType from "@/components/Fragment/FilterType";

function SearchFilters({
  searchString,
  setSearchString,
  handleSortByOption,
  showFilterTypes,
  setShowFilterTypes,
  filterTypes,
  setFilterTypes,
  sortDirection,
  setSortDirection,
}) {
  return (
    <div className="fragments__search">
      <div className="fragments__search__container">
        <div className="fragments__search__input">
          <input
            type="text"
            placeholder="Search Fragments"
            className="fragments__search__input__input"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
          />
          <DocumentSearchIcon />
        </div>
      </div>
      <div className="fragments__filters">
        <div className="filtertypes">
          <div
            className={`display ${showFilterTypes ? "open" : ""}`}
            onClick={() => setShowFilterTypes((prev) => !prev)}
          >
            <span>
              Types -{" "}
              <span className="font-semibold text-teal-400">
                {
                  // count how many types from filterTypes are selected
                  filterTypes.filter((type) => type.selected).length > 0
                    ? filterTypes.filter((type) => type.selected).length +
                      " selected"
                    : "All"
                }
              </span>
            </span>
            <ChevronDownIcon className="w-5 h-5 text-teal-500" />
          </div>
          {showFilterTypes ? (
            <div className="py-2 space-y-1 dropdown">
              {filterTypes.map((filterType, id) => (
                <FilterType
                  key={id}
                  filterType={filterType}
                  filterTypes={filterTypes}
                  setFilterTypes={setFilterTypes}
                />
              ))}
            </div>
          ) : null}
        </div>
        <select
          className="cursor-pointer"
          onChange={(e) => handleSortByOption(e.target.value)}
        >
          <option value="created">Date Created</option>
          <option value="size">Fragment Size</option>
          <option value="type">Fragment Type</option>
        </select>
        <SortDescendingIcon
          className={sortDirection === "desc" ? "active" : ""}
          onClick={() => setSortDirection((prev) => "desc")}
        />
        <SortAscendingIcon
          className={sortDirection === "asc" ? "active" : ""}
          onClick={() => setSortDirection((prev) => "asc")}
        />
      </div>
    </div>
  );
}

export default SearchFilters;
