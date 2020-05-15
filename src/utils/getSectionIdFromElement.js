export const getSectionIdFromElement = (element) => {
  if (element.dataset.sectionSelector && element.dataset.sectionSelector.substr(0, 1) === '#') {
    return element.dataset.sectionSelector;
  }

  return element.hash;
};
