import Image from "next/image";
import "./CurriculumVitae.scss";
import { useFacultyMemberData } from "@lib/hooks/useFacultyMemberData";
import { renderSafeHTML } from "@lib/utils/html2text";
import { Icon } from "@iconify/react";
import GoogleSch from "public/gs.png";
import { YesOrNo } from "@lib/services/facultyPerson/facultyPerson.service.type";
import { useRouter } from "next/navigation";
import { forwardRef, useImperativeHandle } from "react";

const CurriculumVitaeComponent = forwardRef((props, ref) => {
  const { facultyPerson, faculty, department, designation, publication } =
    useFacultyMemberData();
  const router = useRouter();

  // Expose print function to parent
  useImperativeHandle(ref, () => ({
    printCV: () => {
      window.print();
    },
  }));

  // Helper: check if content exists
  const hasContent = (value?: string | null) => {
    if (!value) return false;
    const clean = value.replace(/<[^>]+>/g, "").trim();
    return clean.length > 0;
  };

  const sections = [
    { title: "Academic Background", value: facultyPerson?.eduDetails },
    { title: "Short Biography", value: facultyPerson?.biography },
    { title: "Research Interest", value: facultyPerson?.researchInterest },
    { title: "Area of Specialization", value: facultyPerson?.onGoingResearch },
    { title: "Teaching Materials", value: facultyPerson?.teachingMaterials },
    { title: "Experience", value: facultyPerson?.profDev },
    { title: "Awards & Achievements", value: facultyPerson?.achievements },
    {
      title: "Collaborations",
      value: facultyPerson?.participations,
    },
    { title: "Membership", value: facultyPerson?.affiliation },
    { title: "Personal Impact", value: facultyPerson?.others },
  ];

  const uniqueTitles = publication
    ? [...new Set(publication.map((p) => p.title).filter(Boolean))]
    : [];

  const getPublicationsByTitle = (title: string) =>
    publication?.filter((pub) => pub.title === title);

  if (!facultyPerson) return <p>Loading Faculty Member Data...</p>;

  return (
    <section className="cv-container-background">
      <div className="container">
        <div className="cv-page-header-container mt-3 mb-3">
          <div className="back-button" onClick={() => router.back()}>
            Back
          </div>
          <div className="cv-print-button" onClick={() => window.print()}>
            Print
          </div>
        </div>
      </div>

      <div className="container">
        <div className="cv-body">
          {/* ===== Header ===== */}
          <div className="cv-header">
            <div className="row g-3 align-items-center justify-content-between">
              <div className="col-6 col-md-6">
                <div className="cv-header-media">
                  <img
                    src="https://new1.ewubd.edu/backend/uploads/others/files/1759425522723_logo-print.png"
                    alt="EWU Logo"
                  />
                </div>
              </div>
              <div className="col-6 col-md-6 text-end">
                <h4>Curriculum Vitae</h4>
              </div>
            </div>
          </div>

          {/* ===== Profile Section ===== */}
          <div className="cv-profile-info">
            <div className="row g-3">
              <div className="col-2 col-md-2">
                <div className="cv-profile-person-image">
                  <Image
                    src={facultyPerson?.photo}
                    fill
                    sizes="100vw"
                    alt={facultyPerson?.name || "Faculty photo"}
                  />
                </div>
              </div>

              <div className="col-10 col-md-10">
                <div className="cv-person--info">
                  <h4>{facultyPerson?.name}</h4>
                  <h5>{designation?.designation}</h5>
                  <p>{department?.name}</p>
                  <p>{faculty?.name}</p>
                </div>

                <div className="cv-porfiles-other-links">
                  {facultyPerson?.ext && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <Icon
                        icon="solar:phone-outline"
                        width="14"
                        height="14"
                        style={{ color: "#aa4a44" }}
                      />
                      <p style={{ margin: 0, fontSize: "13px" }}>
                        09666775577 (Ext: {facultyPerson.ext})
                      </p>
                    </div>
                  )}

                  {facultyPerson?.email &&
                    facultyPerson?.isBoT !== YesOrNo.YES && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <Icon
                          icon="material-symbols:mail-outline-rounded"
                          width="14"
                          height="14"
                          style={{ color: "#aa4a44" }}
                        />
                        <p style={{ margin: 0, fontSize: "13px" }}>
                          {facultyPerson.email}
                        </p>
                      </div>
                    )}
                </div>
                <div className="cv-porfiles-other-links">
                  {facultyPerson?.liLink && (
                    <a
                      className="cv-item-body"
                      href={facultyPerson.liLink}
                      title="Google Scholar"
                    >
                      <div className="cv-item-body-title">
                        <div className="cv-item-body-icon">
                          <Icon
                            icon="flowbite:linkedin-solid"
                            width="14"
                            height="14"
                          />
                        </div>
                        <h6>Linked in</h6>
                      </div>
                    </a>
                  )}
                  {facultyPerson?.instaLink && (
                    <a
                      className="cv-item-body"
                      href={facultyPerson.instaLink}
                      title="Instagram"
                    >
                      <div className="cv-item-body-title">
                        <div className="cv-item-body-icon">
                          <Icon icon="uil:instagram" width="14" height="14" />
                        </div>
                        <h6>Instagram</h6>
                      </div>
                    </a>
                  )}
                  {facultyPerson?.xLink && (
                    <a
                      className="cv-item-body"
                      href={facultyPerson.xLink}
                      title="X"
                    >
                      <div className="cv-item-body-title">
                        <div className="cv-item-body-icon">
                          <Icon icon="prime:twitter" width="14" height="14" />
                        </div>
                        <h6>X</h6>
                      </div>
                    </a>
                  )}
                  {facultyPerson?.fbLink && (
                    <a
                      className="cv-item-body"
                      href={facultyPerson.fbLink}
                      title="Facebook"
                    >
                      <div className="cv-item-body-title">
                        <div className="cv-item-body-icon">
                          <Icon
                            icon="ri:facebook-fill"
                            width="14"
                            height="14"
                          />
                        </div>
                        <h6>Facebook</h6>
                      </div>
                    </a>
                  )}
                </div>
                <div className="cv-porfiles-other-links">
                  {facultyPerson?.gsLink && (
                    <a
                      className="cv-item-body"
                      href={facultyPerson.gsLink}
                      title="Google Scholar"
                    >
                      <div className="cv-item-body-title">
                        <div className="cv-item-body-icon">
                          <Image
                            src={GoogleSch}
                            alt="Google Scholar"
                            width={14}
                            height={14}
                          />
                        </div>
                        <h6>Google Scholar</h6>
                      </div>
                    </a>
                  )}
                  {facultyPerson?.orcidLink && (
                    <a
                      className="cv-item-body"
                      href={facultyPerson.orcidLink}
                      title="Orcid"
                    >
                      <div className="cv-item-body-title">
                        <div className="cv-item-body-icon">
                          <Icon icon="academicons:orcid" />
                        </div>
                        <h6>Orcid</h6>
                      </div>
                    </a>
                  )}
                  {facultyPerson?.researchGateLink && (
                    <a
                      className="cv-item-body"
                      href={facultyPerson.researchGateLink}
                      title="ResearchGate"
                    >
                      <div className="cv-item-body-title">
                        <div className="cv-item-body-icon">
                          <Icon icon="academicons:researchgate" />
                        </div>
                        <h6>ResearchGate</h6>
                      </div>
                    </a>
                  )}
                  {facultyPerson?.scopusLink && (
                    <a
                      className="cv-item-body"
                      href={facultyPerson.scopusLink}
                      title="Scopus"
                    >
                      <div className="cv-item-body-title">
                        <div className="cv-item-body-icon">
                          <Icon icon="simple-icons:scopus" />
                        </div>
                        <h6>Scopus</h6>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ===== Main Content Sections ===== */}
          <div className="cv-content-sections">
            {sections.map(
              (section, idx) =>
                hasContent(section.value) && (
                  <div key={idx} className="cv-section">
                    <h5 className="cv-section-title">{section.title}</h5>
                    <div className="cv-section-divider" />
                    <div className="cv-section-content">
                      {renderSafeHTML(section.value || "")}
                    </div>
                  </div>
                )
            )}

            {/* ===== Publications Section ===== */}
            {uniqueTitles.length > 0 && (
              <div className="cv-section">
                <h5 className="cv-section-title">Publications</h5>
                <div className="cv-section-divider" />
                <div className="cv-section-content">
                  {uniqueTitles.map((title, idx) => (
                    <div key={idx} className="cv-publication-item">
                      <h6 className="cv-publication-title">{title}</h6>
                      {getPublicationsByTitle(title)?.map((pub, pIdx) => (
                        <div key={pIdx} className="cv-publication-detail">
                          {renderSafeHTML(pub.details)}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});

CurriculumVitaeComponent.displayName = "CurriculumVitaeComponent";

export default CurriculumVitaeComponent;
