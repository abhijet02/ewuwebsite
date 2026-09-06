import "@/app/globals.scss";
import React, { JSX, useState } from "react";
import DOMPurify from "dompurify";
import PdfViewer from "@/app/components/PdfViewer/PdfViewer";
import { Icon } from "@iconify/react";
import PdfLink from "./PdfLink";
import { checkIfPdf } from "./checkIfPdf";
import Image from "next/image";

const FILE_EXTENSIONS = [
  ".pdf",
  ".doc",
  ".docx",
  ".xls",
  ".xlsx",
  ".ppt",
  ".pptx",
];
const normalizeEwuUrl = (url: string) => {
  if (!url) return url;
  if (url.includes(process.env.NEXT_PUBLIC_DOMAIN_NAME) && url.includes("/api")) {
    return url.replace(
      process.env.NEXT_PUBLIC_SERVER_FILE_PATH_OLD,
      process.env.NEXT_PUBLIC_SERVER_FILE_PATH,
    );
  }

  return url;
};
const parseStyle = (styleString: string): React.CSSProperties => {
  const style: React.CSSProperties = {};
  styleString.split(";").forEach((rule) => {
    const [key, value] = rule.split(":").map((s) => s.trim());
    if (key && value) {
      // Convert CSS-style (e.g. font-size) to camelCase (e.g. fontSize)
      const camelKey = key.replace(/-([a-z])/g, (_, char) =>
        char.toUpperCase(),
      );
      (style as any)[camelKey as keyof React.CSSProperties] = value;
    }
  });
  return style;
};

export function renderSafeHTML(htmlString: string) {
  if (!htmlString) return null;

  const cleanHTML = DOMPurify.sanitize(htmlString, {
    ALLOWED_TAGS: [
      "b",
      "i",
      "em",
      "strong",
      "u",
      "p",
      "br",
      "ul",
      "ol",
      "li",
      "a",
      "table",
      "thead",
      "tbody",
      "tr",
      "td",
      "th",
      "span",
      "div",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "blockquote",
      "code",
      "pre",
      "img", // added 'img'
    ],
    ALLOWED_ATTR: ["href", "style", "src", "alt", "width", "height"], // added img attrs
  });

  const parser = new DOMParser();
  const doc = parser.parseFromString(cleanHTML, "text/html");

  const removeEmptyNodes = (node: Node): boolean => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement;
      const children = Array.from(el.childNodes);

      for (const child of children) {
        if (!removeEmptyNodes(child)) {
          el.removeChild(child);
        }
      }

      // Don't treat table elements as empty
      const tableTags = ["table", "thead", "tbody", "tr", "td", "th"];

      const isEmptyTag =
        el.childNodes.length === 0 &&
        !el.innerHTML.includes("&nbsp;") &&
        !el.textContent?.match(/\S/) && // no non-whitespace content
        el.tagName.toLowerCase() !== "img" &&
        !tableTags.includes(el.tagName.toLowerCase());

      return !isEmptyTag;
    }

    if (node.nodeType === Node.TEXT_NODE) {
      return !!node.textContent?.trim();
    }

    return false;
  };

  Array.from(doc.body.childNodes).forEach((node) => {
    if (!removeEmptyNodes(node)) {
      doc.body.removeChild(node);
    }
  });

  const convertNodeToReact = (node: Node, key: number): React.ReactNode => {
    const BulletIcon = () => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="bullet-color"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.84712 1.36052C7.78848 1.38479 7.70401 1.43744 7.65943 1.47755C7.6148 1.51762 7.25915 2.18819 6.86901 2.96767C6.07224 4.55969 5.82522 4.96811 5.40538 5.38753C4.96572 5.82674 4.69141 5.99148 3.02366 6.81799C1.36678 7.63908 1.33325 7.66235 1.33325 7.9924C1.33325 8.31544 1.36915 8.34052 2.99932 9.15582C4.69618 10.0044 4.95751 10.1617 5.39197 10.5957C5.83971 11.043 6.05212 11.3921 6.87869 13.0393C7.56386 14.4047 7.63905 14.5356 7.77515 14.6001C7.9763 14.6955 8.10699 14.6887 8.2805 14.5739C8.40367 14.4925 8.55134 14.2311 9.22189 12.908C9.65931 12.0449 10.0841 11.2433 10.1657 11.1266C10.3779 10.8238 10.8764 10.3337 11.179 10.1304C11.3216 10.0346 12.1147 9.61796 12.9416 9.20443C13.7953 8.7775 14.4916 8.40262 14.5526 8.33709C14.6945 8.18471 14.7064 7.81658 14.5741 7.66983C14.5268 7.61735 13.8304 7.24603 13.0265 6.84461C11.4982 6.08154 11.1376 5.87115 10.7485 5.51589C10.2664 5.07573 10.0945 4.80255 9.24339 3.123C8.70644 2.06347 8.38974 1.48498 8.31911 1.43469C8.18038 1.33592 7.98194 1.30474 7.84712 1.36052Z"
        />
      </svg>
    );

    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent;
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement;
      const children = Array.from(el.childNodes)
        .map((child, idx) => convertNodeToReact(child, idx))
        .filter(Boolean);

      const styleAttr = el.getAttribute("style");
      const style = styleAttr ? parseStyle(styleAttr) : undefined;

      const withSpacing = (element: React.ReactNode) => (
        <React.Fragment key={key}> {element} </React.Fragment>
      );

      const lineBreak = (element: React.ReactNode) => (
        <React.Fragment key={key}>
          {element}
          <br />
        </React.Fragment>
      );

      switch (el.tagName.toLowerCase()) {
        case "img":
          return lineBreak(
            <div style={{ textAlign: "center" }}>
              <Image
                key={key}
                src={normalizeEwuUrl(el.getAttribute("src") || "")}
                alt={el.getAttribute("alt") || ""}
                width={parseInt(el.getAttribute("width").toString()) || 200}
                height={parseInt(el.getAttribute("height").toString()) || 200}
                style={style}
              />
              <br />
            </div>,
          );
        case "table":
          return lineBreak(
            <div
              key={key}
              style={{
                overflowX: "auto",
                WebkitOverflowScrolling: "touch",
                marginBottom: "1rem",
                marginTop: "1rem",
                width: "100%",
              }}
            >
              <table
                key={key + "-inner"}
                className="table table-striped table-hover common-table"
              >
                {children}
              </table>
            </div>,
          );

        case "thead":
          return <thead key={key}>{children}</thead>;
        case "tbody":
          return <tbody key={key}>{children}</tbody>;
        case "tr":
          const rowChildren = children.map((child, idx) => {
            return child;
          });
          return <tr key={key}>{rowChildren}</tr>;
        case "td":
          return <td key={key}>{children}</td>;
        case "th":
          return <th key={key}>{children}</th>;
        case "p":
          return (
            <p
              key={key}
              style={{
                ...style,
                marginBottom: "0.5rem",
              }}
            >
              {children}
            </p>
          );

        case "u":
          return <u key={key}>{children}</u>;
        case "b":
        case "strong":
          return withSpacing(<strong>{children}</strong>);
        case "i":
        case "em":
          return withSpacing(<em>{children}</em>);
        case "span":
          return withSpacing(
            <span key={key} style={style}>
              {children}
            </span>,
          );
        case "div":
          return (
            <div style={{ ...style }} key={key}>
              {children}
            </div>
          );
        case "ul":
          return lineBreak(
            <ul key={key} className="list-disc pl-5 my-2">
              {children}
            </ul>,
          );
        case "ol":
          return lineBreak(
            <ol key={key} className="list-decimal pl-5 my-2">
              {children}
            </ol>,
          );
        case "li": {
          const parentTag = el.parentElement?.tagName.toLowerCase();

          if (parentTag === "ul") {
            return (
              <li
                key={key}
                className="mb-2 p-1 flex items-start gap-2"
                style={{ ...style }}
              >
                <BulletIcon />
                <span>{children}</span>
              </li>
            );
          }

          if (parentTag === "ol") {
            // Keep normal numbering for ordered lists
            return (
              <li key={key} className="mb-2 p-1 html-parser-list-style-ol">
                {children}
              </li>
            );
          }

          // Fallback (if li is outside ul/ol)
          return (
            <li key={key} className="mb-2 p-1 html-parser-list-style-ul">
              {children}
            </li>
          );
        }

        case "a": {
          const rawHref = el.getAttribute("href") || "#";
          const href = normalizeEwuUrl(rawHref);
          const insideTable = !!el.closest("table");

          // Google Form
          const isGoogleForm = href.includes("docs.google.com/forms");
          if (isGoogleForm) {
            return (
              <div key={key} className="embedded-google-form">
                <iframe
                  src={href}
                  width="100%"
                  height={600}
                  frameBorder={0}
                  marginHeight={0}
                  marginWidth={0}
                  title={children?.toString() || "Google Form"}
                >
                  Loading…
                </iframe>
              </div>
            );
          }

          const isPdf = checkIfPdf(href);

          return (
            <PdfLink
              key={key}
              title={children?.toString() || "PDF File"}
              url={href}
              isPdf={isPdf}
              href={href}
              insideTable={insideTable}
            >
              {children}
            </PdfLink>
          );
        }

        case "h1":
          return (
            <h1 key={key} className="text-3xl font-bold my-2">
              {children}
            </h1>
          );

        case "h2":
          return (
            <h2 key={key} className="text-2xl font-bold my-2">
              {children}
            </h2>
          );

        case "h3":
          return (
            <h3 key={key} className="text-xl font-semibold my-2">
              {children}
            </h3>
          );

        case "h4":
          return (
            <h4 key={key} className="text-lg font-semibold my-2">
              {children}
            </h4>
          );

        case "h5":
          return (
            <h5 key={key} className="text-base font-medium my-2">
              {children}
            </h5>
          );

        case "h6":
          return (
            <h6 key={key} className="text-sm font-medium my-2">
              {children}
            </h6>
          );
        case "blockquote":
          return (
            <blockquote
              key={key}
              className="border-l-4 border-gray-300 pl-4 italic my-2"
            >
              {children}
            </blockquote>
          );
        case "code":
          return (
            <code
              key={key}
              className="bg-gray-100 rounded px-1 text-sm font-mono"
            >
              {children}
            </code>
          );
        case "pre":
          return (
            <pre
              key={key}
              className="bg-gray-100 rounded p-2 overflow-auto text-sm font-mono"
            >
              {children}
            </pre>
          );
        default:
          return <div key={key}>{children}</div>;
      }
    }

    return null;
  };

  const bodyChildren = Array.from(doc.body.childNodes).map((node, idx) =>
    convertNodeToReact(node, idx),
  );

  return <>{bodyChildren}</>;
}

export function stripHTMLAndLimitWords(html: string, wordLimit?: number) {
  let cleanText = DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
  cleanText = decodeHTMLEntities(cleanText); // <- FIXES &amp;

  if (wordLimit !== undefined) {
    const words = cleanText.split(/\s+/).slice(0, wordLimit);
    return words.join(" ") + (words.length === wordLimit ? "..." : "");
  }

  return cleanText;
}

function decodeHTMLEntities(text: string) {
  const txt = document.createElement("textarea");
  txt.innerHTML = text;
  return txt.value;
}
