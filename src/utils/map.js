// Must be called with 'call' to prevent bugs on some devices
export const map = (list, callback) => [].map.call(list, callback);
