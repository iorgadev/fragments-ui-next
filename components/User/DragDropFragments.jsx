import { useState, useEffect } from "react";
import { useAtom, atom } from "jotai";
import { userAtom } from "../../pages/_app";

function DragDropFragments() {
  const [user] = useAtom(userAtom);
  const [files, setFiles] = useState([]);
  const [dropError, setDropError] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);

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

  const fileDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    console.log(files);
    setFiles((prevFiles) => (prevFiles = []));
    for (let file of files) {
      setFiles((prevFiles) => [...prevFiles, file.name]);
    }
  };

  const wrongDrop = (e) => {
    e.preventDefault();
    if (e.target.id != "dropFileContainer") setDropError(true);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    // setFilesDropped(true);
    // setLoading(true);
    const files = e.dataTransfer.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/fragments`,
        {
          method: "POST",
          headers: {
            "Content-Type": files[i].type,
            Authorization: `Bearer ${user.signInUserSession.idToken.jwtToken}`,
          },
          // onUploadProgress: (progressEvent) => {
          //   setProgress(
          //     Math.round((progressEvent.loaded * 100) / progressEvent.total)
          //   );
          // },
          // body: formData,
          body: Buffer.from(files[i].name, "base64"),
        }
      );
      // clear formData
      formData.delete("files");

      const data = await response.json();
      console.log("Data Response: ", data);
    }
    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_API_URL}/v1/fragments`,
    //   {
    //     method: "POST",
    //     headers: {
    //       Authorization: `Bearer ${user.signInUserSession.idToken.jwtToken}`,
    //     },
    //     onUploadProgress: (progressEvent) => {
    //       setProgress(
    //         Math.round((progressEvent.loaded * 100) / progressEvent.total)
    //       );
    //     },
    //     body: formData,
    //   }
    // );
    // const data = await response.json();
    // console.log("handleDrop() data: ", data);
    // setLoading(false);
    // setFragments(data.fragments);
  };

  useEffect(() => {
    console.log("Files: ", files);
  }, [files]);

  return (
    <div
      className={`flex items-center justify-center w-full h-full border-4 border-orange-600 transition-all duration-500 rounded-xl ${
        isDragging ? "" : "border-dashed"
      }`}
      onDragOver={dragOver}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDrop={handleDrop}
    >
      {files ? (
        <span className="text-lg text-orange-300 pointer-events-none">
          Drag and drop files here to create Fragments
        </span>
      ) : (
        files.map((file) => {
          return (
            <span className="text-lg text-orange-300 pointer-events-none">
              {file}
            </span>
          );
        })
      )}
    </div>
  );
}

export default DragDropFragments;
