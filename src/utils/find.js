// Must be called with 'call' to prevent bugs on some devices
export const find = (list, callback) => [].find.call(list, callback);
