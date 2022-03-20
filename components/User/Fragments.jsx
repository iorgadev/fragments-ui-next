import { useEffect, useState } from "react";
import { useAtom, atom } from "jotai";
import { userAtom } from "../../pages/_app";
import InfoIconBig from "../Fragment/InfoIconBig";

import { RefreshIcon, PlusIcon } from "@heroicons/react/outline";

export const userFragmentsAtom = atom([]);

function Fragments() {
  const [user] = useAtom(userAtom);
  const [fragments, setFragments] = useAtom(userFragmentsAtom);
  const [compFragments, setCompFragments] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [fetchFragments, setFetchFragments] = useState(false);

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
    getUserFragments();

    // return () => {
    //   setFragments([]);
    // };
  }, []);

  if (!user || !user.username) return <div>loading...</div>;
  return (
    <div className="fragments">
      <div className="fragments__header">
        <span className="text-xl font-bold text-teal-50 tracking-wide">
          Fragments
        </span>
        <div className="fragments__header__icons">
          <PlusIcon />
          <RefreshIcon onClick={() => getUserFragments()} />
        </div>
      </div>
      <div className="fragments__container">
        {loading
          ? "loading..."
          : compFragments.length > 0
          ? compFragments.map((fragment) => {
              return <InfoIconBig key={fragment.id} fragment={fragment} />;
            })
          : "0 fragments"}
      </div>

      <div className="fragments__footer">
        <span>Space Used: {0}kb</span>

        <span>Fragments: {compFragments.length}</span>

        <span>Biggest Fragment: {10}kb</span>
      </div>
    </div>
  );
}

export default Fragments;
