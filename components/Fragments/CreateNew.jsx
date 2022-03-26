import { useState, useEffect } from "react";
import Image from "next/image";
import { fragmentTypes, getAllExtensions } from "@/utils/fragmentTypes";
import { useAtom } from "jotai";
import { userAtom } from "@/pages/_app";
import {
  getFileType,
  getExtensionMimeType,
  fragmentColors,
  backgroundColors,
} from "@/utils/fragmentTypes";
import { humanFileSize } from "@/utils/fragmentUtils";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";

function CreateNew() {
  const [user] = useAtom(userAtom);
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [dropError, setDropError] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [filesDropped, setFilesDropped] = useState(false);

  const dragOver = (e) => {
    e.preventDefault();
    setDropError(false);
  };

  const dragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const dragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const addToListWithDelay = (file, delay) => {
    setTimeout(() => {
      // const response = await fetch(
      //   `${process.env.NEXT_PUBLIC_API_URL}/v1/fragments`,
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": getExtensionMimeType(
      //         getFileType(file.name)
      //       ),
      //       Authorization: `Bearer ${user.signInUserSession.idToken.jwtToken}`,
      //     },
      //     // onUploadProgress: (progressEvent) => {
      //     //   setProgress(
      //     //     Math.round((progressEvent.loaded * 100) / progressEvent.total)
      //     //   );
      //     // },
      //     body: file,
      //   }
      // );
      setFiles((prev) => [...prev, file]);
    }, delay);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("handleDrop()");
    setFilesDropped((prev) => true);
    setIsDragging((prev) => false);
    // setLoading(true);
    setFiles([]);
    var droppedFiles = e.dataTransfer.files;
    var filesArray = [];
    for (var i = 0; i < droppedFiles.length; i++) {
      addToListWithDelay(droppedFiles[i], i * 300);
    }
    return;
  };

  return (
    <div className="create">
      <div
        className={`create__container ${filesDropped ? `mini` : ``} ${
          isDragging ? `dragging` : ``
        }`}
        onDragOver={dragOver}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        onDrop={handleDrop}
      >
        <Image
          src="/images/upload-fragments.png"
          alt="No Fragments"
          width={256}
          height={256}
          layout="intrinsic"
        />

        <span className="text-3xl font-semibold text-teal-300">
          Create New Fragments
        </span>

        <span className="mt-2 text-base text-teal-700">
          Drag and drop files in here to create new Fragments.
        </span>
        <div className="flex flex-col p-3 mt-3 space-y-2 bg-teal-900 rounded-md bg-opacity-30">
          <span className="text-xs font-semibold text-teal-300 uppercase">
            Valid Fragment Types:
          </span>
          <div className="flex flex-wrap items-center justify-center space-x-2">
            {getAllExtensions().map((type, i) => {
              return (
                <span key={i} className="px-1 py-0.5 bg-neutral-900 rounded-sm">
                  .{type}
                </span>
              );
            })}
          </div>
        </div>
      </div>
      {filesDropped && files.length > 0 ? (
        <div className={`create__dropped ${filesDropped ? `open` : ``}`}>
          {files.map((file, i) => {
            const mimeType = getExtensionMimeType(getFileType(file.name));
            const textColor = fragmentColors[mimeType];
            const backgroundColor = backgroundColors[mimeType];
            return (
              <div key={i} className="create__dropped__file">
                <div
                  className={`relative w-10 h-10 flex-none flex items-center justify-center ${textColor} rounded-md`}
                  style={{ backgroundColor: backgroundColor }}
                >
                  <span className="relative font-bold uppercase -top-1">
                    {getFileType(file.name)}
                  </span>
                  <CheckCircleIcon className="absolute w-4 h-4 text-green-400 -bottom-0.5 -right-1" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm">{file.name}</span>
                  <span className="text-xs text-orange-400">
                    {humanFileSize(file.size)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default CreateNew;
