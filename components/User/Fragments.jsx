import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import {
  userAtom,
  // selectedFragmentAtom,
  userFragmentsAtom,
} from "../../pages/_app";
import { selectedFragmentAtom } from "@/components/Fragment/InfoIconBig";
import Loading from "@/components/Loading";
import InfoIconBig from "@/components/Fragment/InfoIconBig";
import BigCard from "@/components/Fragment/BigCard";
import Menu from "../Menu";

import {
  getLargestFragment,
  humanFileSize,
  getTotalSize,
} from "../../utils/fragmentUtils";

import {
  RefreshIcon,
  PlusIcon,
  CubeTransparentIcon,
  ChevronDownIcon,
  DocumentSearchIcon,
  SortAscendingIcon,
  SortDescendingIcon,
} from "@heroicons/react/solid";
import {
  CubeIcon,
  ViewGridAddIcon,
  ChartPieIcon,
  ArrowsExpandIcon,
  UserIcon,
} from "@heroicons/react/outline";

import FilterType from "@/components/Fragment/FilterType";

const filterTypesArray = [
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

// export const userFragmentsAtom = atom([]);

function Fragments() {
  const [user] = useAtom(userAtom);
  const [fragments, setFragments] = useAtom(userFragmentsAtom);
  // const [filteredFragments, setFilteredFragments] = useState([]);9
  const [loading, setLoading] = useState(false);
  const [selectedFragment] = useAtom(selectedFragmentAtom);
  const [searchString, setSearchString] = useState("");
  const [sortDirection, setSortDirection] = useState("desc");
  const [sortBy, setSortBy] = useState("created");
  const [showFilterTypes, setShowFilterTypes] = useState(false);
  const [filterTypes, setFilterTypes] = useState(filterTypesArray);

  const getUserFragments = async () => {
    setLoading((prev) => true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/fragments?expand=1`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.signInUserSession.idToken.jwtToken}`,
        },
      }
    );
    const data = await response.json();
    // console.log("getUserFragments() data: ", data);
    setLoading((prev) => false);
    if (data.fragments !== undefined) setFragments(data.fragments);
    // TODO: else, display error message (example: Unauthorized)
    // return data;
  };

  const filterFragments = () => {
    let filtered = [];

    // filter by search string
    if (searchString === "") {
      filtered = fragments;
    } else {
      filtered = fragments.filter((fragment) =>
        fragment.id.includes(searchString)
      );
    }

    // // filter fragments of multiple types by selected filter types
    if (filterTypes.find((type) => type.selected)) {
      filtered = filtered.filter((fragment) => {
        const results = filterTypes.some((filterType) => {
          return filterType.selected && fragment.type === filterType.type;
        });
        return results;
      });
    }

    if (sortBy === "size") {
      if (sortDirection === "desc") {
        filtered.sort((a, b) => b.size - a.size);
      } else {
        filtered.sort((a, b) => a.size - b.size);
      }
    } else if (sortBy === "name") {
      if (sortDirection === "desc") {
        filtered.sort((a, b) => b.name.localeCompare(a.name));
      } else {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
      }
    } else if (sortBy === "type") {
      if (sortDirection === "desc") {
        filtered.sort((a, b) => b.type.localeCompare(a.type));
      } else {
        filtered.sort((a, b) => a.type.localeCompare(b.type));
      }
    } else if (sortBy === "created") {
      if (sortDirection === "desc") {
        filtered.sort((a, b) => Date.parse(b.created) - Date.parse(a.created));
      } else {
        filtered.sort((a, b) => Date.parse(a.created) - Date.parse(b.created));
      }
    }

    // setFilteredFragments((prev) => filtered);
    return filtered;
  };

  // handle sort by option change
  const handleSortByOption = (option) => {
    setSortBy((prev) => option);
  };

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

  useEffect(() => {
    console.log("Fragments.jsx useEffect()[fragments]: ", fragments);
    // filterFragments();
  }, [fragments]);

  useEffect(() => {
    if (!user || !user.signInUserSession?.idToken) return;
    console.log("Fragments.jsx useEffect()[user]: ");
    getUserFragments();
  }, [user]);

  useEffect(() => {
    console.log(
      "Fragments.jsx useEffect()[filter options]: ",
      searchString,
      sortDirection,
      sortBy
    );
    filterFragments();
  }, [searchString, sortDirection, sortBy]);

  useEffect(() => {
    if (fragments.length === 0) {
      console.log("Fragments.jsx useEffect()[fragments.length]: ", fragments);
      getUserFragments();
    } else {
      console.log("Fragments.jsx useEffect()[fragments.length]: ", fragments);
    }
  }, []);

  // Set to Loading if user is not loaded yet
  if (!user || !user.username) return <div>loading...</div>;

  // Display component if user is loaded
  return (
    <div className="fragments">
      {/* Fragments Header */}
      <div className="fragments__header">
        <div className="flex items-center space-x-2">
          <CubeTransparentIcon className="w-8 h-8 text-teal-500" />
          <span className="text-3xl font-bold tracking-wide text-teal-200">
            Fragments
          </span>
        </div>
        <div className="fragments__header__icons">
          {/* <PlusIcon /> */}
          {/* <RefreshIcon onClick={() => getUserFragments()} /> */}
        </div>
      </div>

      {/* Fragments Container */}
      <div className="relative flex flex-grow overflow-hidden">
        {/* inner page */}
        {selectedFragment.id ? <BigCard /> : null}

        {/* menu */}
        <Menu getUserFragments={getUserFragments} loading={loading} />

        {/* inner screens */}
        <div className="relative flex w-full h-full overflow-hidden">
          <div className="flex flex-col w-full overflow-hidden">
            {/* search bar */}
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
                  {/* <select onClick={() => setShowFilterTypes((prev) => !prev)}>
                    <option>All Types</option>
                  </select> */}
                  <div
                    className={`display ${showFilterTypes ? "open" : ""}`}
                    onClick={() => setShowFilterTypes((prev) => !prev)}
                  >
                    Types
                  </div>
                  {showFilterTypes ? (
                    <div className="dropdown">
                      {filterTypes.map((filterType) => (
                        <div
                          key={filterType.type}
                          className={`flex items-center space-x-2`}
                          onClick={() => handleFilterTypes(filterType.type)}
                        >
                          <div
                            className={`w-4 h-4 rounded-sm ${
                              isFilterTypeSelected(filterType.type)
                                ? `bg-teal-300`
                                : `bg-red-500`
                            }`}
                          ></div>
                          <span>{filterType.type}</span>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
                <select onChange={(e) => handleSortByOption(e.target.value)}>
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

            {/* fragments container */}
            <div
              className={`fragments__container ${
                loading ? `items-center justify-center` : `items-start`
              }`}
            >
              {loading ? (
                <Loading />
              ) : filterFragments().length > 0 ? (
                filterFragments().map((fragment) => {
                  return <InfoIconBig key={fragment.id} fragment={fragment} />;
                })
              ) : (
                "0 fragments"
              )}
            </div>

            {/* Fragments Footer */}
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Fragments;
