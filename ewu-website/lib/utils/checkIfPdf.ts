export const checkIfPdf = (sliderFilePath: string) => {
  if (
    sliderFilePath?.match(".pdf")
  ) {
    return true;
  }
  return false;
};
