"use client";

import {
  useEffect,
  useImperativeHandle,
  useRef,
  forwardRef,
  useState,
} from "react";

export type ScreenReaderHandle = {
  toggleReading: () => void;
};

const ScreenReader = forwardRef<ScreenReaderHandle>((_, ref) => {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const [reading, setReading] = useState<"idle" | "speaking" | "paused">(
    "idle"
  );

  const getVisibleText = () => {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;

          const style = getComputedStyle(parent);
          const rect = parent.getBoundingClientRect();
          const inViewport = rect.top < window.innerHeight && rect.bottom > 0;

          const visible =
            style.visibility !== "hidden" &&
            style.display !== "none" &&
            inViewport;

          return visible ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        },
      }
    );

    let text = "",
      node;
    while ((node = walker.nextNode())) {
      text += node.textContent + " ";
    }

    return text.trim();
  };

  const speak = () => {
    const synth = window.speechSynthesis;
    const text = getVisibleText();
    if (!text) return;

    synth.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.onend = () => setReading("idle");
    utter.onerror = () => setReading("idle");

    utteranceRef.current = utter;
    synth.speak(utter);
    setReading("speaking");
  };

  const toggleReading = () => {
    const synth = window.speechSynthesis;

    if (reading === "idle") {
      speak();
    } else if (reading === "speaking") {
      synth.pause();
      setReading("paused");
    } else if (reading === "paused") {
      synth.resume();
      setReading("speaking");
    }
  };

  useImperativeHandle(ref, () => ({
    toggleReading,
  }));

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  return null;
});

export default ScreenReader;
