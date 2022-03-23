// given an array of fragment objects with a size property, return the largest fragment in the array
const getLargestFragment = (fragmentsArray) => {
  if (fragmentsArray.length === 0) return null;
  let largestFragment = fragmentsArray[0];
  for (let fragment of fragmentsArray)
    if (fragment.size > largestFragment.size) largestFragment = fragment;
  return largestFragment.size;
};

// given a size in kilobytes, return a human readable size
const humanFileSize = (size) => {
  if (size < 1024) return "0";
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return (
    (size / Math.pow(1024, i)).toFixed(2) * 1 +
    " " +
    ["B", "kB", "MB", "GB", "TB"][i]
  );
};

// given an array of fragment objects with a size property, return the sum of all sizes in kilobytes
const getTotalSize = (fragments) => {
  let totalSize = 0;
  for (let fragment of fragments) {
    totalSize += fragment.size;
  }
  return totalSize;
};

// given a date, return a human readable date in 24 hour format without AM/PM
const humanDate = (date) => {
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  };
  return new Date(date).toLocaleString("en-US", options);
  // return new Date(date).toLocaleString();
};

export { getLargestFragment, humanFileSize, getTotalSize, humanDate };
