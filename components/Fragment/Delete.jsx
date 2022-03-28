import { useState } from "react";
import { DocumentRemoveIcon, TrashIcon } from "@heroicons/react/solid";
import { useAtom } from "jotai";
import { userAtom, userFragmentsAtom } from "@/pages/_app";
import { selectedFragmentAtom } from "@/components/Fragment/InfoIconBig";

function Delete({ fragment, setAction }) {
  const [user] = useAtom(userAtom);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedFragment, setSelectedFragment] = useAtom(selectedFragmentAtom);
  const [fragmentId, setFragmentId] = useState(fragment.id + "");
  const [fragments, setFragments] = useAtom(userFragmentsAtom);

  const deleteFragmentId = () => {
    for (var i = 0; i < fragmentId.length; i++) {
      setTimeout(() => {
        if (fragmentId.length > 0)
          setFragmentId((prev) => {
            // remove the last character of the string
            return prev.substring(0, prev.length - 1);
          });
      }, i * 50);
    }
  };

  const handleDeleteResponse = () => {
    deleteFragmentId();

    setTimeout(() => {
      setLoading((prev) => false);
      setError("");
      setSelectedFragment({});
      setFragments((prev) => prev.filter((frag) => frag.id !== fragment.id));
    }, 1000);
  };

  const handleDeleteFragment = async () => {
    setLoading((prev) => true);
    // fetch DELETE /v1/fragments/:id
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/fragments/${fragment.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.signInUserSession.idToken.jwtToken}`,
        },
      }
    );

    if (response.status === 200) {
      console.log("Fragment deleted successfully.");
      handleDeleteResponse();
    }
  };

  return (
    <div className="delete">
      <div className="delete__container">
        <DocumentRemoveIcon
          className={`w-40 h-40 text-red-900 ${loading ? `animate-pulse` : ``}`}
        />
        <span className="text-3xl font-bold text-center text-red-500">
          {loading ? "Deleting" : "Delete "}
          {loading ? "..." : "Fragment"}
        </span>
        <span className="p-3 text-3xl text-red-200 bg-red-900 rounded-md bg-opacity-20">
          {fragmentId}
        </span>
        <div className="h-0.5 bg-red-500 bg-opacity-20 w-20" />
        <div className="relative text-neutral-300">
          Once deleted, a Fragment is lost forever. Are you sure?
        </div>

        <div className={`delete__buttons ${loading ? `hide` : ``}`}>
          <button className="confirm" onClick={handleDeleteFragment}>
            <TrashIcon className="text-red-400" />
            <span>Delete</span>
          </button>
          <button className="cancel" onClick={() => setAction("")}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Delete;
