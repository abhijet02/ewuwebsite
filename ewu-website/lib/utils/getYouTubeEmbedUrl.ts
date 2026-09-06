export const getYouTubeEmbedUrl = (url: string) => {
  if (!url) return "";

  try {
    const parsed = new URL(url);

    if (
      parsed.hostname.includes("youtube.com") &&
      parsed.searchParams.get("v")
    ) {
      return `https://www.youtube.com/embed/${parsed.searchParams.get("v")}`;
    }

    if (parsed.hostname === "youtu.be") {
      return `https://www.youtube.com/embed${parsed.pathname}`;
    }

    if (parsed.pathname.startsWith("/shorts/")) {
      return `https://www.youtube.com/embed${parsed.pathname.replace(
        "/shorts/",
        "/"
      )}`;
    }

    return url;
  } catch {
    return url;
  }
};
