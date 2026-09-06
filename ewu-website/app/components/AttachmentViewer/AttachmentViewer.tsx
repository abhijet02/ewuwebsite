import React from "react";

type AttachmentViewerProps = {
  key?: any;
  url?: string | null;
  className?: string;
};

const AttachmentViewer: React.FC<AttachmentViewerProps> = ({
  key,
  url,
  className,
}) => {
  if (!url) return <span>N/A</span>;

  const extension = url.split(".").pop()?.toLowerCase();

  const imageExt = ["jpg", "jpeg", "png", "gif", "webp", "svg"];
  const videoExt = ["mp4", "webm", "ogg", "mov"];

  if (extension && imageExt.includes(extension)) {
    return (
      <img
        src={url}
        alt="image"
        className={
          className || "mt-2 h-auto max-h-[200px] w-auto max-w-[200px]"
        }
      />
    );
  }

  if (extension && videoExt.includes(extension)) {
    return (
      <video
        controls
        className={className || "h-auto max-h-[200px] w-auto max-w-[200px]"}
      >
        <source src={url} type={`video/${extension}`} />
        Your browser does not support the video tag.
      </video>
    );
  }

  return (
    <iframe
      src={url}
      className={className || "h-[200px] w-full border"}
      title="attachment"
    />
  );
};

export default AttachmentViewer;
