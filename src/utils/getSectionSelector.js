import { getIdFromHash } from './getIdFromHash';

export const getSectionSelector = (element) => {
  if (element.dataset.sectionSelector) return element.dataset.sectionSelector;
  if (element.hash) return `#${getIdFromHash(element.hash)}`;

  return '';
};
