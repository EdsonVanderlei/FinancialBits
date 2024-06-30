export const getDocumentColors = (documentElement: HTMLElement) => {
  const computedStyle = getComputedStyle(documentElement);
  return {
    surfaceBorder: computedStyle.getPropertyValue('--surface-border'),
    green: computedStyle.getPropertyValue('--green-400'),
    red: computedStyle.getPropertyValue('--red-400'),
    grey: computedStyle.getPropertyValue('--text-color-secondary'),
  };
};
