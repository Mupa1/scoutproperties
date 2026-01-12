export const getValidImages = (images: unknown[]): string[] => {
  if (!Array.isArray(images)) return [];

  return images.filter(
    (img): img is string =>
      typeof img === 'string' &&
      img.trim() !== '' &&
      img !== 'null' &&
      img !== 'undefined',
  );
};
