export default function myImageLoader({ src, width, quality }) {
  if (!src) return "";

  if (src.startsWith("https")) {
    // Historical CMS records contain localcloud URLs.  Public browsers must
    // load these assets from the current public origin, not the retired host.
    if (src.startsWith("https://localcloud.ewubd.edu/backend/")) {
      src = src.replace(
        "https://localcloud.ewubd.edu/backend",
        process.env.NEXT_PUBLIC_SERVER_FILE_PATH,
      );
    }

    if (src.includes("/api") && src.includes(process.env.NEXT_PUBLIC_DOMAIN_NAME)) {
      src = src.replace(
          process.env.NEXT_PUBLIC_SERVER_FILE_PATH_OLD,
          process.env.NEXT_PUBLIC_SERVER_FILE_PATH,
      );

      return `${src}?w=${200}&q=${quality || 75}`;
    }
    return `${src}?w=${200}&q=${quality || 75}`;
  }
  if (src.startsWith(`${process.env.NEXT_PUBLIC_SERVER_FILE_PATH}`)) {
    return `${src}?w=${200}&q=${quality || 75}`;
  }
  // Default case for local images
  return `${process.env.NEXT_PUBLIC_LOCAL_FILE_PATH}${src}?w=${width}&q=${
    quality || 75
  }`;
}
