import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import {
  userAtom,
  selectedFragmentAtom,
  userFragmentsAtom,
} from "../../pages/_app";
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

// export const userFragmentsAtom = atom([]);

function Fragments() {
  const [user] = useAtom(userAtom);
  const [fragments, setFragments] = useAtom(userFragmentsAtom);
  // const [compFragments, setCompFragments] = useState([]);
  const [filteredFragments, setFilteredFragments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLink, setSelectedLink] = useState("all");
  const [selectedFragment, setSelectedFragment] = useAtom(selectedFragmentAtom);
  const [searchString, setSearchString] = useState("");

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
    console.log("getUserFragments() data: ", data);
    setLoading((prev) => false);
    if (data.fragments !== undefined) setFragments(data.fragments);
    // setCompFragments(data.fragments);
    return data;
  };

  const filterFragments = () => {
    let filtered = [];
    if (searchString === "") {
      filtered = fragments;
    } else {
      filtered = fragments.filter((fragment) =>
        fragment.id.includes(searchString)
      );
    }
    setFilteredFragments(filtered);
  };

  useEffect(() => {
    console.log("Fragments.jsx useEffect()[fragments]: ", fragments);
    filterFragments();
  }, [fragments]);

  useEffect(() => {
    if (!user || !user.signInUserSession?.idToken) return;
    console.log("Fragments.jsx useEffect()[user]: ");
    getUserFragments();
  }, [user]);

  useEffect(() => {
    // if (!searchString || searchString.length === 0) {
    //   console.log("Fragments.jsx useEffect()[searchString 0]: ", searchString);
    //   setFilteredFragments((prev) => (prev = fragments));
    // } else {
    //   const filtered = fragments.filter((fragment) => {
    //     return fragment.id.includes(searchString);
    //   });
    //   console.log("Fragments.jsx useEffect()[filtered]: ", filtered);
    //   setFilteredFragments((prev) => (prev = filtered));
    // }
    filterFragments();
  }, [searchString]);

  useEffect(() => {
    if (fragments.length === 0) {
      console.log("Fragments.jsx useEffect()[fragments.length]: ", fragments);
      getUserFragments();
    } else {
      console.log("Fragments.jsx useEffect()[fragments.length]: ", fragments);
    }
  }, []);

  // if (!user || !user.username || !compFragments) return <div>loading...</div>;
  if (!user || !user.username) return <div>loading...</div>;
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
          <PlusIcon />
          <RefreshIcon onClick={() => getUserFragments()} />
        </div>
      </div>

      {/* Fragments Container */}
      <div className="relative flex flex-grow overflow-hidden">
        {/* inner page */}
        {selectedFragment.id ? <BigCard /> : null}

        {/* menu */}
        <Menu />

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
                <select>
                  <option>All Types</option>
                </select>
                <select>
                  <option>Date Created</option>
                  <option>Fragment Size</option>
                  <option>Fragment Type</option>
                </select>
                <SortDescendingIcon className="active" />
                <SortAscendingIcon />
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
              ) : filteredFragments.length > 0 ? (
                filteredFragments.map((fragment) => {
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
                    {fragments.length}
                  </span>
                  <span>fragments</span>
                </span>
                <span className="spacer"></span>
                <span className="fragments__footer__stat">
                  <ChartPieIcon />
                  <span className="fragments__footer__value">
                    {humanFileSize(getTotalSize(fragments))}
                  </span>
                  <span>space used</span>
                </span>
                <span className="spacer"></span>
                <span className="fragments__footer__stat">
                  <ArrowsExpandIcon />
                  <span className="fragments__footer__value">
                    {humanFileSize(getLargestFragment(fragments))}
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
