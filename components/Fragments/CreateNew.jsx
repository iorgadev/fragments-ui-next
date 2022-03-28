import { useState, useEffect, useRef } from "react";
import {
  fragmentTypes,
  getAllExtensions,
  isValidType,
} from "@/utils/fragmentTypes";
import { useAtom } from "jotai";
import { userAtom } from "@/pages/_app";
import { selectedLinkAtom } from "@/components/Menu";
import {
  getFileType,
  getExtensionMimeType,
  fragmentColors,
  backgroundColors,
} from "@/utils/fragmentTypes";
import { humanFileSize } from "@/utils/fragmentUtils";
import {
  CheckCircleIcon,
  XCircleIcon,
  ViewGridIcon,
  DocumentIcon,
} from "@heroicons/react/solid";

function CreateNew({ getUserFragments }) {
  const [user] = useAtom(userAtom);
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [dropError, setDropError] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [filesDropped, setFilesDropped] = useState(false);
  const droppedFilesRef = useRef();
  const [selectedLink, setSelectedLink] = useAtom(selectedLinkAtom);

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

  const addToListWithDelay = (file, delay, last = false) => {
    setTimeout(() => {
      if (isValidType(getExtensionMimeType(getFileType(file.name)))) {
        const response = fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/fragments`,
          {
            method: "POST",
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
      }
      setFiles((prev) => [...prev, file]);
      // scroll to the bottom of the droppedFilesRef div
      droppedFilesRef.current.scrollTop = droppedFilesRef.current.scrollHeight;
      if (last) {
        getUserFragments();
      }
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
      addToListWithDelay(
        droppedFiles[i],
        i * 300,
        i === droppedFiles.length - 1
      );
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
        <img src="/images/upload-fragments.png" alt="No Fragments" />

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
        <div className="relative flex flex-col w-full space-y-2 overflow-hidden">
          <div
            className={`create__dropped ${filesDropped ? `open` : ``}`}
            ref={droppedFilesRef}
          >
            {files.map((file, i) => {
              const mimeType = getExtensionMimeType(getFileType(file.name));
              const textColor = fragmentColors[mimeType];
              const backgroundColor = backgroundColors[mimeType];
              const validType = isValidType(mimeType);
              return (
                <div key={i} className="create__dropped__file">
                  <div
                    className={`relative w-14 h-14 flex-none flex items-center justify-center ${textColor} rounded-md`}
                    // style={{ backgroundColor: backgroundColor }}
                  >
                    <DocumentIcon
                      className={`absolute w-full h-full -top-1 `}
                      style={{ color: validType ? backgroundColor : "red" }}
                    />
                    <span
                      className={`relative font-bold uppercase ${
                        validType ? `text-teal-50` : `text-red-200`
                      } -top-1`}
                    >
                      {getFileType(file.name)}
                    </span>
                    {validType ? (
                      <CheckCircleIcon className="absolute w-4 h-4 text-teal-300 right-1 bottom-1" />
                    ) : (
                      <XCircleIcon className="absolute w-4 h-4 text-red-300 right-1 bottom-1" />
                    )}
                  </div>
                  <div className="flex flex-col px-1">
                    <span
                      className={`text-sm ${
                        validType ? textColor : `text-red-600`
                      }`}
                    >
                      {file.name}
                    </span>
                    <span
                      className={`text-xs ${
                        validType ? `text-neutral-400` : `text-red-300`
                      }`}
                    >
                      {validType
                        ? humanFileSize(file.size) + " uploaded"
                        : "Failed, not supported"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div
            className="flex items-center justify-center flex-none h-12 p-2 space-x-1 bg-teal-500 rounded-md cursor-pointer"
            onClick={() => setSelectedLink("all")}
          >
            <ViewGridIcon className="w-8 h-8 text-teal-300" />
            <span className="text-xl text-teal-100">View New Fragments</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default CreateNew;
