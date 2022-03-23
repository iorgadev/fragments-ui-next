import { useEffect, useState } from "react";
import { useAtom, atom } from "jotai";
import { userAtom, selectedFragmentAtom } from "../../pages/_app";
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

export const userFragmentsAtom = atom([]);

function Fragments() {
  const [user] = useAtom(userAtom);
  const [fragments, setFragments] = useAtom(userFragmentsAtom);
  const [compFragments, setCompFragments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLink, setSelectedLink] = useState("all");
  const [selectedFragment, setSelectedFragment] = useAtom(selectedFragmentAtom);

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
    setFragments(data.fragments);
    return data;
  };

  useEffect(() => {
    console.log("Fragments.jsx useEffect(): ", fragments);
    setCompFragments((prev) => (prev = fragments));
  }, [fragments]);

  useEffect(() => {
    if (!user || !user.signInUserSession?.idToken) return;
    console.log("Fragments.jsx useEffect()[user]: ");
    getUserFragments();
  }, [user]);

  useEffect(() => {
    if (!user || !user.signInUserSession?.idToken) return;
    getUserFragments();
  }, []);

  if (!user || !user.username || !compFragments) return <div>loading...</div>;
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
          <div className="flex flex-col flex-grow overflow-hidden">
            <div className="fragments__search">
              <div className="fragments__search__container">
                <div className="fragments__search__input">
                  <input
                    type="text"
                    placeholder="Search Fragments"
                    className="fragments__search__input__input"
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
                </select>
                <SortDescendingIcon className="active" />
                <SortAscendingIcon />
              </div>
            </div>
            <div className="fragments__container">
              {loading ? (
                <Loading />
              ) : compFragments.length > 0 ? (
                compFragments.map((fragment) => {
                  return <InfoIconBig key={fragment.id} fragment={fragment} />;
                })
              ) : (
                "0 fragments"
              )}
            </div>

            {/* Fragments Footer */}
            <div className="fragments__footer">
              <span className="fragments__footer__stat">
                <CubeIcon />
                <span className="fragments__footer__value">
                  {compFragments.length}
                </span>
                <span>fragments</span>
              </span>
              <span className="spacer"></span>
              <span className="fragments__footer__stat">
                <ChartPieIcon />
                <span className="fragments__footer__value">
                  {humanFileSize(getTotalSize(compFragments))}
                </span>
                <span>space used</span>
              </span>
              <span className="spacer"></span>
              <span className="fragments__footer__stat">
                <ArrowsExpandIcon />
                <span className="fragments__footer__value">
                  {humanFileSize(getLargestFragment(compFragments))}
                </span>
                <span>largest fragment</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Fragments;
