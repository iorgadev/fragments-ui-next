/**
 * @param {object} fragmentTypes object representing a mime type to conversion and extension mapping
 * (e.g., {'text/markdown': {conversions: ['text/markdown', 'text/plain', 'text/html'], extension: 'md'}})
 */
const fragmentTypes = {
  "text/plain": {
    conversions: ["text/plain"],
    extension: "txt",
    textColor: "text-teal-400",
    backgroundColor: "bg-teal-500",
  },
  "text/markdown": {
    conversions: ["text/markdown", "text/plain", "text/html"],
    extension: "md",
    textColor: "text-blue-400",
    backgroundColor: "bg-blue-500",
  },
  "text/html": {
    conversions: ["text/html", "text/plain"],
    extension: "html",
    textColor: "text-orange-400",
    backgroundColor: "bg-orange-500",
  },
  "application/json": {
    conversions: ["application/json", "text/plain"],
    extension: "json",
    textColor: "text-green-400",
    backgroundColor: "bg-green-500",
  },
  "image/png": {
    conversions: ["image/png", "image/jpeg", "image/webp", "image/gif"],
    extension: "png",
    textColor: "text-red-400",
    backgroundColor: "bg-red-500",
  },
  "image/jpeg": {
    conversions: ["image/jpeg", "image/png", "image/webp", "image/gif"],
    extension: "jpg",
    textColor: "text-red-400",
    backgroundColor: "bg-red-500",
  },
  "image/webp": {
    conversions: ["image/webp", "image/png", "image/jpeg", "image/gif"],
    extension: "webp",
    textColor: "text-red-400",
    backgroundColor: "bg-red-500",
  },
  "image/gif": {
    conversions: ["image/gif", "image/png", "image/jpeg", "image/webp"],
    extension: "gif",
    textColor: "text-red-400",
    backgroundColor: "bg-red-500",
  },
};
const fragmentColors = {
  "text/plain": "text-slate-400",
  "text/markdown": "text-yellow-400",
  "text/html": "text-purple-400",
  "application/json": "text-orange-400",
  "image/png": "text-green-400",
  "image/jpeg": "text-blue-400",
  "image/webp": "text-red-400",
  "image/gif": "text-brown-400",
};
const backgroundColors = {
  "text/plain": "#1e293b",
  "text/markdown": "#854d0e",
  "text/html": "#6b21a8",
  "application/json": "#9a3412",
  "image/png": "#166534",
  "image/jpeg": "#1e40af",
  "image/webp": "#991b1b",
  "image/gif": "#ff1fdc",
};

/**
 * Checks if the given mime type is a valid Fragment type
 * @param {string} mimeType string representing a mime type (e.g., 'text/markdown')
 * @returns {boolean} true if given mime type is a valid Fragment type
 */
const isValidType = (mimeType) => {
  return Object.keys(fragmentTypes).includes(mimeType);
};

/**
 * Returns all valid mime types
 * @returns {Array<string>} list of valid mime types
 */
const getAllMimeTypes = () => {
  return Object.keys(fragmentTypes);
};

/**
 * Returns all valid extensions
 * @returns {Array<string>} list of valid extensions
 */
const getAllExtensions = () => {
  return Object.values(fragmentTypes).map((type) => type.extension);
};

/**
 * Returns the mime type for the given extension
 * @param {string} mimeType string representing a mime type (e.g., 'text/plain')
 * @returns {string} extension of given mime type (e.g., 'text/plain' -> 'txt')
 */
const getMimeTypeExtension = (mimeType) => {
  return fragmentTypes[mimeType] && fragmentTypes[mimeType].extension;
};

/**
 * Returns the extension for the given mime type
 * @param {string} extension string representing a file extension type (e.g., 'txt')
 * @returns {string} mime type of given extension (e.g., 'txt' -> 'text/plain')
 */
const getExtensionMimeType = (extension) => {
  return Object.keys(fragmentTypes).find((key) => {
    return fragmentTypes[key].extension.includes(extension);
  });
};

/**
 * Returns the valid conversion mime types for the given mime type
 * @param {string} mimeType string representing a mime type (e.g., 'text/plain')
 * @returns {Array<string>} list of valid conversion mime types for given mime type (e.g., 'text/markdown' -> ['text/plain', 'text/html'])
 */
const getValidConversionTypes = (mimeType) => {
  if (!fragmentTypes[mimeType]) return [];
  return fragmentTypes[mimeType].conversions;
};

/**
 * Returns the valid conversion extensions for the given mime type
 * @param {string} mimeType string representing a mime type (e.g., 'text/plain')
 * @returns {Array<string>} list of valid conversion extensions for given mime type (e.g., 'text/markdown' -> ['txt', 'html'])
 */
const getValidConversionExtensions = (mimeType) => {
  return getValidConversionTypes(mimeType).map((type) => {
    return fragmentTypes[type].extension;
  });
};

/**
 * Checks if the given mime type is valid for conversion
 * @param {string} mimeType string representing a mime type (e.g., 'text/markdown')
 * @param {string} extension string representing a file extension type (e.g., 'txt')
 * @returns {boolean} true if given extension is valid for conversion to given mime type
 */
const isSupportedConversionExtension = (fromMimeType, extension) => {
  return getValidConversionExtensions(fromMimeType).includes(extension);
};

/**
 * Checks if the given mime type is valid for conversion to another mime type
 * @param {string} fromMimeType string representing a mime type (e.g., 'text/markdown')
 * @param {string} toMimeType string representing a mime type (e.g., 'text/plain')
 * @returns {boolean} true if given mime type is valid for conversion to another mime type
 */
const isSupportedConversionMimeType = (fromMimeType, toMimeType) => {
  return getValidConversionTypes(fromMimeType).includes(toMimeType);
};

// given a filename, extract the file type
const getFileType = (filename) => {
  const extension = filename.split(".").pop();
  return extension;
};

module.exports = {
  fragmentTypes,
  fragmentColors,
  backgroundColors,
  isValidType,
  getMimeTypeExtension,
  getExtensionMimeType,
  getValidConversionTypes,
  getValidConversionExtensions,
  isSupportedConversionExtension,
  isSupportedConversionMimeType,
  getFileType,
  getAllMimeTypes,
  getAllExtensions,
};
