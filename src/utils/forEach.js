// Must be called with 'call' to prevent bugs on some devices
export const forEach = (list, callback) => [].forEach.call(list, callback);
