import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userAtom, userFragmentsAtom } from "../pages/_app";
import { selectedFragmentAtom } from "@/components/Fragment/InfoIconBig";
import { selectedLinkAtom } from "@/components/Menu";
import BigCard from "@/components/Fragment/BigCard";
import Menu from "./Menu";
import { CubeTransparentIcon, UserIcon } from "@heroicons/react/solid";
import { filterTypesArray } from "@/components/Fragment/FilterType";
import SearchFilters from "@/components/Fragments/SearchFilters";
import FooterStats from "./Fragments/FooterStats";
import GridListContainer from "./Fragments/GridListContainer";

import CreateNew from "@/components/Fragments/CreateNew";

function Fragments() {
  const [user] = useAtom(userAtom);
  const [fragments, setFragments] = useAtom(userFragmentsAtom);
  const [loading, setLoading] = useState(false);
  const [selectedFragment] = useAtom(selectedFragmentAtom);
  const [searchString, setSearchString] = useState("");
  const [sortDirection, setSortDirection] = useState("desc");
  const [sortBy, setSortBy] = useState("created");
  const [showFilterTypes, setShowFilterTypes] = useState(false);
  const [filterTypes, setFilterTypes] = useState(filterTypesArray);
  const [selectedLink] = useAtom(selectedLinkAtom);

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

    return filtered;
  };

  // handle sort by option change
  const handleSortByOption = (option) => {
    setSortBy((prev) => option);
  };

  // useEffect(() => {
  //   if (!user || !user.signInUserSession?.idToken) return;
  //   console.log("Fragments.jsx useEffect()[user]: ");
  //   getUserFragments();
  // }, [user]);

  useEffect(() => {
    console.log("Fragments.jsx useEffect()[selectedFragment]: ", selectedLink);
  }, [selectedLink]);

  useEffect(() => {
    // console.log(
    //   "Fragments.jsx useEffect()[filter options]: ",
    //   searchString,
    //   sortDirection,
    //   sortBy
    // );
    filterFragments();
  }, [searchString, sortDirection, sortBy]);

  useEffect(() => {
    if (fragments.length === 0) getUserFragments();
  }, []);

  // // Set to Loading if user is not loaded yet
  // if (!user || !user.username) return <div>loading...</div>;

  // Display component if user is loaded
  return (
    <div className="fragments">
      {/* if Filter Types drop down is showing, handle clicking outside of it to hide container */}
      {showFilterTypes ? (
        <div
          className="absolute top-0 left-0 z-10 w-screen h-screen"
          onClick={() => setShowFilterTypes((prev) => false)}
        ></div>
      ) : null}
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
          {/* <div className="flex items-center justify-between w-full"> */}
          <div className="flex items-center flex-none space-x-2">
            <UserIcon className="w-6 h-6 p-1 text-teal-200 bg-teal-700 rounded-md" />
            <span className="text-sm font-bold text-teal-200 uppercase">
              {user.username}
            </span>
          </div>
          <span className="text-xs uppercase text-neutral-400 font-semibold bg-neutral-900 py-0.5 px-1 rounded-md flex-none">
            logout
          </span>
          {/* </div> */}
        </div>
      </div>

      {/* App Container */}
      <div className="relative flex flex-grow overflow-hidden">
        {/* inner page */}
        {selectedFragment.id ? <BigCard /> : null}

        {/* menu */}
        <Menu getUserFragments={getUserFragments} loading={loading} />

        {/* inner screens */}
        <div className="relative flex w-full h-full overflow-hidden">
          <div className="flex flex-col w-full overflow-hidden">
            <SearchFilters
              searchString={searchString}
              setSearchString={setSearchString}
              sortBy={sortBy}
              handleSortByOption={handleSortByOption}
              filterTypes={filterTypes}
              setFilterTypes={setFilterTypes}
              showFilterTypes={showFilterTypes}
              setShowFilterTypes={setShowFilterTypes}
              sortDirection={sortDirection}
              setSortDirection={setSortDirection}
            />
            {selectedLink === "all" ? (
              <GridListContainer
                loading={loading}
                filterFragments={filterFragments}
              />
            ) : null}
            {selectedLink === "create" ? <CreateNew /> : null}
            <FooterStats filterFragments={filterFragments} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Fragments;
