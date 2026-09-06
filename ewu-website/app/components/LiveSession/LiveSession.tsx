"use client";

import { useState, useEffect } from "react";
import { useLiveSessionData } from "@lib/hooks/useLiveSessionData";
import "./LiveSession.scss";

const LiveSession = () => {
  const { liveSessions } = useLiveSessionData();
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [visibleSessions, setVisibleSessions] = useState<any[]>([]);

  // Filter sessions that are not expired
  useEffect(() => {
    if (!liveSessions || liveSessions.length === 0) return;

    const now = new Date();
    const filtered = liveSessions.filter((session) => {
      const expiry = new Date(session.expiryDate);
      return expiry > now;
    });
    setVisibleSessions(filtered);

    // Set a timer to remove expired sessions dynamically
    const timers = filtered.map((session) => {
      const expiry = new Date(session.expiryDate).getTime();
      const delay = expiry - now.getTime();
      return setTimeout(() => {
        setVisibleSessions((prev) => prev.filter((s) => s.id !== session.id));
        // If the expired session is currently open, close it
        if (selectedSession?.id === session.id) setSelectedSession(null);
      }, delay);
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [liveSessions, selectedSession]);

  if (!visibleSessions || visibleSessions.length === 0) return null;

  const handleOpenModal = (session: any) => {
    setSelectedSession(session);
  };

  const handleCloseModal = () => {
    setSelectedSession(null);
  };

  return (
    <>
      <div className="live-session-popup">
        <div className="live-animation-div">
          {visibleSessions[0] && (
            <div
              className={`live-blob ${
                visibleSessions[0].platform?.toLowerCase() || ""
              }`}
            ></div>
          )}
          <p>Live</p>
        </div>

        {visibleSessions.map((session) => (
          <div
            key={session.id}
            className="live-session-card"
            onClick={() => handleOpenModal(session)}
          >
            {session.title}
          </div>
        ))}
      </div>
      <div className="live-session-mobile">
        <div className="live-animation-div">
          {visibleSessions[0] && (
            <div
              className={`live-blob ${
                visibleSessions[0].platform?.toLowerCase() || ""
              }`}
            ></div>
          )}
          <p>Live</p>
        </div>
      </div>
      {/* Modal */}
      {selectedSession && (
        <div className="live-modal-overlay" onClick={handleCloseModal}>
          <div className="live-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h6>{selectedSession.title}</h6>
              <button className="close-btn" onClick={handleCloseModal}>
                ✕
              </button>
            </div>

            {/* Video Embed */}
            {selectedSession.link && (
              <div className="video-wrapper">
                {getEmbeddedPlayer(selectedSession.link)}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

// Function to embed video player
const getEmbeddedPlayer = (url: string) => {
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const embedUrl = url
      .replace("watch?v=", "embed/")
      .replace("youtu.be/", "www.youtube.com/embed/");
    return (
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
      />
    );
  }

  if (url.includes("facebook.com")) {
    return (
      <iframe
        src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
          url
        )}&show_text=false&width=734`}
        width="100%"
        height="100%"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
    );
  }

  return <p>Unsupported video link</p>;
};

export default LiveSession;
