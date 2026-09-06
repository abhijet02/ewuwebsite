"use client";

import jsPDF from "jspdf";

// Helper to parse HTML text (lists or plain text)
export const parseHTMLForPDF = (html: string) => {
  const div = document.createElement("div");
  div.innerHTML = html;

  const lines: { text: string; type: "ul" | "ol" | "text"; index?: number }[] =
    [];

  div.childNodes.forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement;

      if (el.tagName === "UL") {
        el.querySelectorAll("li").forEach((li) => {
          lines.push({ text: li.textContent || "", type: "ul" });
        });
      } else if (el.tagName === "OL") {
        let idx = 1;
        el.querySelectorAll("li").forEach((li) => {
          lines.push({ text: li.textContent || "", type: "ol", index: idx });
          idx++;
        });
      } else {
        if (el.textContent?.trim()) {
          lines.push({ text: el.textContent.trim(), type: "text" });
        }
      }
    } else if (node.nodeType === Node.TEXT_NODE) {
      if (node.textContent?.trim()) {
        lines.push({ text: node.textContent.trim(), type: "text" });
      }
    }
  });

  return lines;
};

export const generatePublicationPDF = (
  data: any[],
  getDepartmentName: (id: any) => string,
  getDesignationName: (id: any) => string,
) => {
  const doc = new jsPDF("p", "mm", "a4");
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const padding = 16;
  const contentWidth = pageWidth - padding * 2;

  let y = padding;

  const checkPageOverflow = (extraSpace = 0) => {
    if (y + extraSpace > pageHeight - padding) {
      doc.addPage();
      y = padding;
    }
  };

  data.forEach((member, memberIndex) => {
    checkPageOverflow(40);

    const memberName = member.name;
    const memberDesignation = getDesignationName(member.designation) || "";
    const departmentName = getDepartmentName(member.departmentId);

    // ===== NAME =====
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor("#212529");
    doc.text(memberName, padding, y);
    y += 7;

    // ===== DESIGNATION =====
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor("#444444");
    doc.text(memberDesignation, padding, y);
    y += 5;

    // ===== DEPARTMENT =====
    doc.text(departmentName, padding, y);
    y += 8;

    // ===== SECTIONS =====
    (member.sections || []).forEach((section: any) => {
      checkPageOverflow(20);

      // Section title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor("#212529");
      doc.text(section.title, padding, y);
      y += 6;

      // Section content
      const lines = parseHTMLForPDF(section.details || "");
      lines.forEach((lineObj) => {
        checkPageOverflow(6);

        let textToPrint = lineObj.text;
        let indent = 0;

        if (lineObj.type === "ul") {
          textToPrint = `• ${textToPrint}`;
          indent = 3;
        } else if (lineObj.type === "ol") {
          textToPrint = `${lineObj.index}. ${textToPrint}`;
          indent = 3;
        }

        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor("#444444");

        const splitLines = doc.splitTextToSize(
          textToPrint,
          contentWidth - indent,
        );
        splitLines.forEach((l) => {
          doc.text(l, padding + indent, y);
          y += 5;
        });

        y += 2;
      });

      y += 4; // gap after section
    });

    // ===== LINE SEPARATOR =====
    checkPageOverflow(10);
    doc.setDrawColor(200);
    doc.setLineWidth(0.3);
    doc.line(padding, y, pageWidth - padding, y);
    y += 8;

    y += 7; // gap between members
  });

  doc.save("Publications.pdf");
};
