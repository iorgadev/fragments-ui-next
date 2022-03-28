import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/pages/_app";
import {
  isValidType,
  getFileType,
  getMimeTypeExtension,
  getExtensionMimeType,
} from "@/utils/fragmentTypes";
import { CubeIcon } from "@heroicons/react/solid";

import { selectedFragmentAtom } from "@/components/Fragment/InfoIconBig";

function Edit({ fragment, setAction }) {
  const [user] = useAtom(userAtom);
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState();
  const [dropError, setDropError] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileDropped, setFileDropped] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedFragment, setSelectedFragment] = useAtom(selectedFragmentAtom);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const dragOver = (e) => {
    e.preventDefault();
    setDropError((prev) => false);
  };

  const dragEnter = (e) => {
    e.preventDefault();
    setIsDragging((prev) => true);
  };

  const dragLeave = (e) => {
    e.preventDefault();
    setIsDragging((prev) => false);
  };

  const updateSelectedFragment = (fragment) => {
    console.log("Successfully uploaded file: ", fragment);
    setUpdateSuccess((prev) => true);
    setTimeout(() => {
      setSelectedFragment((prev) => fragment);
      setAction((prev) => "");
    }, 1000);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging((prev) => false);
    // If the user drops more than 1 file, show error
    if (e.dataTransfer.files.length > 1) {
      setDropError(true);
      setErrorMessage("You can only upload one file at a time.");
      return;
    }

    // If the user drops a file with an invalid type, show error
    if (
      getExtensionMimeType(getFileType(e.dataTransfer.files[0].name)) !==
      fragment.type
    ) {
      setDropError(true);
      setErrorMessage(
        `Invalid file type. Please upload a .${getMimeTypeExtension(
          fragment.type
        )} file.`
      );
      console.log("Invalid file type");
      return;
    }
    setLoading((prev) => true);
    setFileDropped((prev) => true);
    setFile(e.dataTransfer.files[0]);

    const file = e.dataTransfer.files[0];

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/fragments/${selectedFragment.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": getExtensionMimeType(getFileType(file.name)),
          Authorization: `Bearer ${user.signInUserSession.idToken.jwtToken}`,
        },
        // onUploadProgress: (progressEvent) => {
        //   setProgress(
        //     Math.round((progressEvent.loaded * 100) / progressEvent.total)
        //   );
        // },
        body: file,
      }
    );

    setLoading((prev) => false);
    if (response.status === 200) {
      const data = await response.json();
      updateSelectedFragment(data.fragment);
    } else {
      console.log("Response: ", response.status);
      setErrorMessage("There was an error uploading your file.");
    }
  };

  return (
    <div className="edit">
      <div
        className={`edit__container ${
          isDragging || fileDropped ? `dragging` : ``
        }`}
        onDragOver={dragOver}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        onDrop={handleDrop}
      >
        {!loading && !fileDropped ? (
          <>
            <img src="/images/upload-fragments.png" width={128} height={128} />
            <span className="text-2xl font-semibold text-teal-200">
              Edit Fragment Data
            </span>
            <span>Upload new fragment data of same type.</span>
            <div className="flex flex-col p-3 mt-3 mb-3 space-y-2 bg-teal-900 rounded-md bg-opacity-30">
              <span className="text-xs font-semibold text-teal-300 uppercase">
                Valid Fragment Types:
              </span>
              <div className="flex flex-wrap items-center justify-center space-x-2">
                <span className="px-1 py-0.5 bg-neutral-900 rounded-sm">
                  .{getMimeTypeExtension(fragment.type)}
                </span>
              </div>
            </div>
            {errorMessage.length > 0 ? (
              <div className="p-1 font-semibold text-red-500 bg-red-900 rounded-sm bg-opacity-20">
                {errorMessage}
              </div>
            ) : (
              <div className="invisible">Error:</div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <CubeIcon className="w-20 h-20 text-teal-200 animate-ping" />
            <span className="text-2xl font-semibold text-teal-300">
              Updating Fragment
            </span>
            <span className="text-sm">
              Your Fragment is being updated with your new data.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Edit;
