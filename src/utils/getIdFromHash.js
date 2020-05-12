// Decoded in case there are special characters
export const getIdFromHash = (hash) => decodeURI(hash.substr(1));
