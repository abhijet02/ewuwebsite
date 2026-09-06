export const checkIfVideo = (sliderFilePath: string) => {
  if (
    sliderFilePath?.match(".mp4") ||
    sliderFilePath?.match(".webm") ||
    sliderFilePath?.match(".ogg") ||
    sliderFilePath?.match(".mov") ||
    sliderFilePath?.match(".avi") ||
    sliderFilePath?.match(".wmv") ||
    sliderFilePath?.match(".flv") ||
    sliderFilePath?.match(".mkv") ||
    sliderFilePath?.match(".m4v")
  ) {
    return true;
  }
  return false;
};
