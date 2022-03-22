import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../../pages/_app";
import { getFileType, getExtensionMimeType } from "../../utils/fragmentTypes";

function DragDropFragments() {
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

  const wrongDrop = (e) => {
    e.preventDefault();
    if (e.target.id != "dropFileContainer") setDropError(true);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging((prev) => false);
    setFilesDropped(true);
    // setLoading(true);
    setFiles([]);
    var droppedFiles = e.dataTransfer.files;
    for (var i = 0; i < droppedFiles.length; i++) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/fragments`,
        {
          method: "POST",
          headers: {
            "Content-Type": getExtensionMimeType(
              getFileType(droppedFiles[i].name)
            ),
            Authorization: `Bearer ${user.signInUserSession.idToken.jwtToken}`,
          },
          // onUploadProgress: (progressEvent) => {
          //   setProgress(
          //     Math.round((progressEvent.loaded * 100) / progressEvent.total)
          //   );
          // },
          body: droppedFiles[i],
        }
      );
      const data = await response.json();
      setFiles((prev) => {
        return [...prev, droppedFiles[i].name];
      });
      // console.log("File: ", uploadedFiles[i].name);
      // (function (uploadedFiles) {
      //   setTimeout(function () {
      //     console.log("File: ", uploadedFiles[i].name);
      //     // setProgress((prev) => prev + 1);
      //   }, 500);
      // })(uploadedFiles);

      // currentFile = droppedFiles[i].name;
      // setTimeout(() => {
      //   console.log("File: ", droppedFiles[i].name);
      //   // uploaded.push(droppedFiles[i].name);
      //   console.log("File: ", uploaded);
      //   setFiles((prev) => [...prev, currentFile]);
      // }, i * 1000);
    }
  };

  // useEffect(() => {
  //   console.log("Files: ", files);
  // }, [files]);

  return (
    <div
      className={`flex flex-col items-center justify-center w-full h-full border-4 border-orange-600 transition-all duration-500 rounded-xl ${
        isDragging ? "" : "border-dashed"
      }`}
      onDragOver={dragOver}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDrop={handleDrop}
    >
      {files.length === 0 ? (
        <span className="text-lg text-orange-300 pointer-events-none">
          Drag and drop files here to create Fragments
        </span>
      ) : (
        files.map((file, i) => {
          return (
            <div
              key={i}
              className="text-lg text-orange-300 pointer-events-none"
            >
              {file}
            </div>
          );
        })
      )}
    </div>
  );
}

export default DragDropFragments;
