/**
 * Pushes the given hash to the URL using primarily pushState if available to prevent the
 * scroll from jumping to the hash element. Uses window.location.hash as a fallback.
 *
 * @param {String} hash The hash value to be pushed
 */
export const pushHashToUrl = (hash) => {
  if (window.history.pushState) {
    window.history.pushState(null, null, hash);

    return;
  }

  window.location.hash = hash;
};
