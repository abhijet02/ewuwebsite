export function detectLinkType(url) {
  if (!url || typeof url !== "string") return "unknown";
  // Normalize
  const lowerUrl = url.toLowerCase();
  // --- IMAGE ---
  if (/\.(jpg|jpeg|png|gif|bmp|webp|svg|tiff|ico)(\?|$)/.test(lowerUrl)) {
    return "image";
  }
  // --- VIDEO ---
  if (/\.(mp4|webm|ogg|mov|avi|mkv|flv)(\?|$)/.test(lowerUrl)) {
    return "video";
  }
  // --- PDF ---
  if (/\.(pdf)(\?|$)/.test(lowerUrl)) {
    return "pdf";
  }
  // --- EMBEDDED VIDEO (YouTube, Vimeo, etc.) ---
  if (
    /(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|vimeo\.com\/|vimeo\.com\/video\/)/.test(
      lowerUrl
    )
  ) {
    return "embedded-video";
  }
  return "unknown";
}
