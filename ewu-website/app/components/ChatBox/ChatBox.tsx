"use client";

import { FC, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import chatuser from "../../assets/chat-user.png";
import { useState } from "react";
import adminUser from "../../assets/admin.png";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { faqActions } from "@lib/slices/faq/faq.slice";
import { faqKeywordActions } from "@lib/slices/faqKeyword/faqKeyword.slice";
import "./Chatbox.scss";
interface ChatMessage {
  id: string;
  sender: "user" | "admin";
  message: string;
  link: string;
  timestamp: Date;
}
interface ChatBoxProps {
  isOpen: boolean;
  onClose: () => void;
}
const ChatBox: FC<ChatBoxProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();

  const faqKeywords = useAppSelector(
    (state) => state.faqKeyword.getFaqKeywordResponse?.faqkeywords
  );
  const faqs = useAppSelector((state) => state.faq.getFaqResponse?.faqs);

  useEffect(() => {
    dispatch(
      faqActions.getFaq({
        request: {
          page: 1,
          limit: 500,
        },
      })
    );

    dispatch(
      faqKeywordActions.getFaqKeyword({
        request: {
          page: 1,
          limit: 500,
        },
      })
    );
  }, [dispatch]);

  const [inputMessage, setInputMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "admin",
      message: "Hello! How can I help you today?",
      link: "",
      timestamp: new Date(Date.now()),
    },
  ]);

  // Function to find matching FAQ keyword
  const findMatchingKeyword = (message: string) => {
    if (!faqKeywords || !Array.isArray(faqKeywords)) return null;

    const messageLower = message.toLowerCase();
    const messageWords = messageLower.split(/\s+/);

    // Sort keywords by length (longer keywords first) to prioritize more specific matches
    const sortedKeywords = [...faqKeywords].sort(
      (a, b) => (b.label?.length || 0) - (a.label?.length || 0)
    );

    for (const keyword of sortedKeywords) {
      if (keyword.label) {
        const keywordLower = keyword.label.toLowerCase();
        const keywordWords = keywordLower.split(/\s+/);

        // Check for exact phrase match first
        if (messageLower.includes(keywordLower)) {
          return keyword;
        }

        // Check if all words in the keyword exist in the message
        const allKeywordWordsPresent = keywordWords.every((kwWord) =>
          messageWords.some(
            (msgWord) =>
              msgWord === kwWord ||
              (kwWord.length > 3 && msgWord.includes(kwWord)) ||
              (msgWord.length > 3 && kwWord.includes(msgWord))
          )
        );

        if (allKeywordWordsPresent && keywordWords.length > 0) {
          return keyword;
        }
      }
    }
    return null;
  };

  // Function to find FAQ by keyword ID
  const findFaqByKeywordId = (keywordId: string | number) => {
    if (!faqs || !Array.isArray(faqs)) return null;

    return faqs.find((faq) => faq.keywordId === keywordId);
  };

  // Function to handle sending message
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      message: inputMessage.trim(),
      link: "",
      timestamp: new Date(),
    };

    // Add user message to chat
    setChatMessages((prev) => [...prev, userMessage]);

    // Search for matching keyword
    const matchingKeyword = findMatchingKeyword(inputMessage);

    if (matchingKeyword) {
      // Find the corresponding FAQ
      const matchingFaq = findFaqByKeywordId(matchingKeyword.id);

      if (matchingFaq && matchingFaq.answer) {
        // Add admin response with FAQ answer
        const adminResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: "admin",
          message: matchingFaq.answer,
          link: matchingFaq.link,
          timestamp: new Date(Date.now() + 1000), // 1 second later
        };

        setTimeout(() => {
          setChatMessages((prev) => [...prev, adminResponse]);
        }, 1000); // Simulate typing delay
      } else {
        // No FAQ found for the keyword
        const adminResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: "admin",
          message:
            "I found your keyword but don't have a specific answer for that. Could you please rephrase your question?",
          link: "",
          timestamp: new Date(Date.now() + 1000),
        };

        setTimeout(() => {
          setChatMessages((prev) => [...prev, adminResponse]);
        }, 1000);
      }
    } else {
      // No matching keyword found
      const adminResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "admin",
        message:
          "I'm sorry, I didn't understand your question. Could you please try rephrasing it or use different keywords?",
        link: "",
        timestamp: new Date(Date.now() + 1000),
      };

      setTimeout(() => {
        setChatMessages((prev) => [...prev, adminResponse]);
      }, 1000);
    }

    // Clear input
    setInputMessage("");
  };

  // Function to handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Function to format timestamp
  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - timestamp.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes === 1) return "1 min ago";
    return `${diffInMinutes} mins ago`;
  };

  return (
    <div className="chatbox-wrapper">
      {isOpen ? (
        <div className="chatbox-items">
          <div className="card">
            <div className="card-header">
              <span>Chat Box</span>
              <button
                className="dropdown-hover"
                onClick={onClose}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <Icon icon="iconamoon:close-fill" width="24" height="24" />
              </button>
            </div>
            <div className="card-body chat-care">
              <ul className="chat">
                {chatMessages.map((msg) => (
                  <li
                    key={msg.id}
                    className={
                      msg.sender === "admin"
                        ? "agent clearfix"
                        : "admin clearfix"
                    }
                  >
                    <span
                      className={`chat-img ${
                        msg.sender === "admin" ? "left" : "right"
                      } clearfix mx-2`}
                    >
                      <Image
                        src={msg.sender === "admin" ? adminUser : chatuser}
                        width={30}
                        height={30}
                        className="img-circle"
                        alt={msg.sender === "admin" ? "Agent" : "User"}
                      />
                    </span>
                    <div className="chat-body clearfix">
                      <div className="header clearfix">
                        {msg.sender === "admin" ? (
                          <>
                            <strong className="primary-font">Admin</strong>{" "}
                            <small className="right text-muted">
                              <span className="glyphicon glyphicon-time"></span>
                              {formatTimestamp(msg.timestamp)}
                            </small>
                          </>
                        ) : (
                          <>
                            <small className="left text-muted">
                              <span className="glyphicon glyphicon-time"></span>
                              {formatTimestamp(msg.timestamp)}
                            </small>
                            <strong className="right primary-font">You</strong>
                          </>
                        )}
                      </div>
                      <p>
                        {msg.message}{" "}
                        {msg.link && <Link href={msg.link}>View More</Link>}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-footer">
              <div className="input-group">
                <input
                  id="btn-input"
                  type="text"
                  className="form-control input-sm"
                  placeholder="Type your message here..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <span className="input-group-btn">
                  <button
                    className="btn"
                    id="btn-chat"
                    onClick={handleSendMessage}
                  >
                    <Icon icon="bi:send" width="24" height="24" />
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ChatBox;
