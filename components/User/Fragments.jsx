import { useEffect, useState } from "react";
import { useAtom, atom } from "jotai";
import { userAtom } from "../../pages/_app";
import InfoIconBig from "../Fragment/InfoIconBig";

export const userFragmentsAtom = atom([]);

function Fragments() {
  const [user] = useAtom(userAtom);
  const [fragments, setFragments] = useAtom(userFragmentsAtom);
  const [compFragments, setCompFragments] = useState([]);
  const [loading, setLoading] = useState(false);

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
    setCompFragments((prev) => (prev = fragments));
  }, [fragments]);

  useEffect(() => {
    if (!user || !user.signInUserSession?.idToken) return;
    getUserFragments();

    return () => {
      setFragments([]);
    };
  }, [user]);

  if (!user || !user.username) return <div>loading...</div>;
  return (
    <div className="fragments">
      <div className="fragments__container">
        {loading
          ? "loading..."
          : compFragments.length > 0
          ? compFragments.map((fragment) => {
              return <InfoIconBig key={fragment.id} fragment={fragment} />;
            })
          : "0 fragments"}
      </div>
      <button onClick={() => getUserFragments()}>Refresh Fragments</button>
    </div>
  );
}

export default Fragments;
