"use client";

import { FC, useState } from "react";
import "./Helpcenter.scss";
import { Icon } from "@iconify/react";
import ChatBox from "../ChatBox/ChatBox";

// Optionally: import icon objects to avoid network fetch/flicker
// import whatsappIcon from '@iconify/icons-logos/whatsapp';
// import messengerIcon from '@iconify/icons-logos/facebook-messenger';
// import chatIcon from '@iconify/icons-material-symbols/chat-outline-rounded';

const HelpCenter: FC = () => {
  const [open, setOpen] = useState(false);
  const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER;
  const messengerUsername = process.env.NEXT_PUBLIC_MESSENGER_USER_NAME;
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="helpcenter-container">
      {/* Options are ALWAYS in the DOM now */}
      <div className={`helpcenter-options ${open ? "open" : ""}`}>
        <a
          data-i="3" /* highest index appears last on open, first on close (we reverse) */
          className="helpcenter-option"
          href={`https://wa.me/${phoneNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
        >
          {/* If you imported icon objects use: <Icon icon={whatsappIcon} height={20} width={20} /> */}
          <Icon icon="ic:baseline-whatsapp" height={32} width={32} />
        </a>

        <a
          data-i="2"
          className="helpcenter-option"
          href={`https://m.me/${messengerUsername}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Messenger"
        >
          <Icon icon="fe:messanger" height={32} width={32} />
        </a>

        <a
          data-i="1"
          className="helpcenter-option"
          onClick={() => {
            setChatOpen(true);
            setOpen(false); // ✅ Close options
          }}
          aria-label="Site chat"
        >
          <Icon icon="bxs:chat" height={32} width={32} />
        </a>
      </div>

      {/* Main Button (always in same place) */}
      <button
        type="button"
        className="helpcenter-button"
        onClick={() => setOpen((s) => !s)}
        aria-expanded={open}
        aria-label={open ? "Close support menu" : "Open support menu"}
      >
        <Icon
          icon={
            open
              ? "material-symbols:close"
              : "material-symbols:contact-support-outline-rounded"
          }
          height={40}
          width={40}
        />
      </button>
      <ChatBox isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
};

export default HelpCenter;
