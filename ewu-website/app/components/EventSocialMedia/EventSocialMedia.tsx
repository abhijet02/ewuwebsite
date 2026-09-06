"use client";

import "./EventSocialMedia.scss";

const EventSocialMedia: React.FC = () => {
  return (
    <div>
      <iframe
        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fmyewu%2F&tabs=timeline&width=400&height=600&small_header=false&adapt_container_width=false&hide_cover=false&show_facepile=true&appId"
        style={{
          border: "none",
          width: "100%",
          minWidth: "400px",
          height: "600px",
        }}
        scrolling="no"
        frameBorder="0"
        allowFullScreen={true}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default EventSocialMedia;
