import React from "react";
import DOMPurify from "dompurify";
import { Icon } from "@iconify/react";

export function BoTHtmlParse(htmlString: string) {
  if (!htmlString) return null;

  const cleanHTML = DOMPurify.sanitize(htmlString, {
    ALLOWED_TAGS: ["ul", "ol", "li"],
    ALLOWED_ATTR: [],
  });

  const parser = new DOMParser();
  const doc = parser.parseFromString(cleanHTML, "text/html");

  const convertNodeToReact = (node: Node, key: number): React.ReactNode => {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent;
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement;
      const children = Array.from(el.childNodes)
        .map((child, idx) => convertNodeToReact(child, idx))
        .filter(Boolean);

      switch (el.tagName.toLowerCase()) {
        case "ul":
          return (
            <ul key={key} className="pl-1 my-2 list-none" style={{ margin: 0, padding: 0 }}>
              {children}
            </ul>
          );

        case "ol":
          return (
            <ol key={key} className="pl-1 my-2 list-decimal" style={{ margin: 0, padding: 0 }}>
              {children}
            </ol>
          );

        case "li": {
          const parentTag = el.parentElement?.tagName.toLowerCase();

          if (parentTag === "ul") {
            return (
              <li
                key={key}
                className="mb-2 p-1 flex items-start gap-2"
              >
                <Icon
                  icon="carbon:badge"
                  width="24"
                  height="24"
                />
                <span>{children}</span>
              </li>
            );
          }

          if (parentTag === "ol") {
            return (
              <li key={key} className="mb-2 p-1" style={{ color: "#444444" }}>
                {children}
              </li>
            );
          }

          return (
            <li key={key} className="mb-2 p-1" style={{ color: "#444444" }}>
              {children}
            </li>
          );
        }

        default:
          return <div key={key}>{children}</div>;
      }
    }

    return null;
  };

  return (
    <>
      {Array.from(doc.body.childNodes).map((node, idx) =>
        convertNodeToReact(node, idx)
      )}
    </>
  );
}
