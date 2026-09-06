import { useState } from "react";
import { usePageData } from "@lib/hooks/usePageData";
import PdfViewer from "../PdfViewer/PdfViewer";

const PolicyList = () => {
  const { menus } = usePageData();

  const [selectedPolicy, setSelectedPolicy] = useState<{
    title: string;
    url: string;
  } | null>(null);

  const [open, setOpen] = useState(false);

  const policies = menus?.filter((menu) =>
    menu?.label.toLowerCase().includes("policy")
  );

  const handleOpen = (policy: { title: string; url: string }) => {
    // Detect mobile screen
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      // Open in new tab for mobile
      window.open(policy.url, "_blank");
    } else {
      // Open modal for desktop
      setSelectedPolicy(policy);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPolicy(null);
  };

  return (
    <section style={{ margin: "48px 0px" }}>
      <div className="container">
        <h2>See All Policies</h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  textAlign: "left",
                  padding: "12px",
                  borderBottom: "1px solid #ddd",
                }}
              >
                Name
              </th>
              <th
                style={{
                  textAlign: "center",
                  padding: "12px",
                  borderBottom: "1px solid #ddd",
                }}
              >
                Preview
              </th>
            </tr>
          </thead>
          <tbody>
            {policies?.map((policy, index) => (
              <tr key={index}>
                <td
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  {policy?.label}
                </td>
                <td
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #eee",
                    textAlign: "center",
                  }}
                >
                  <button
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#aa4a44",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      handleOpen({
                        title: policy.label,
                        url: policy.link, // make sure this exists
                      })
                    }
                  >
                    Preview
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PDFViewer only on desktop */}
        {selectedPolicy && window.innerWidth > 768 && (
          <PdfViewer
            title={selectedPolicy.title}
            url={selectedPolicy.url}
            open={open}
            onClose={handleClose}
          />
        )}
      </div>
    </section>
  );
};

export default PolicyList;
