export const checkIfImage = (sliderFilePath: string) => {
  if (
    sliderFilePath?.match(/\.(jpeg|jpg|png|gif|bmp|svg|webp)$/i)
  ) {
    return true;
  }
  return false;
};