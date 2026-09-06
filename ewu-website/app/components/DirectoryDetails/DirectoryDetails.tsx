"use client";

import { useDepartmentData } from "@lib/hooks/useDepartmentData";
import { useOfficeData } from "@lib/hooks/useOfficeData";
import { useSearchParams, useRouter } from "next/navigation";
import { FC, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import "./DirectoryDetails.scss";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import { Icon } from "@iconify/react";
import { YesOrNo } from "@lib/services/slider/slider.service.type";
import Placeholder from "public/male.png";

const ITEMS_PER_PAGE = 10;

type ViewMode = "administration" | "faculty" | "departmental";

const DirectoryDetails: FC = () => {
  const { officeMembers, departmentalOffices, filteredOffices } =
    useOfficeData();
  const { designations, departments, facultyPersons } = useDepartmentData();
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);
  const router = useRouter();
  console.log("facultyPersons",facultyPersons);
  
  const searchParams = useSearchParams();
  const office = searchParams.get("office");
  const department = searchParams.get("department");
  const departmentalOffice = searchParams.get("departmentalOffice");

  // Derive view mode from URL parameters
  const getViewMode = (): ViewMode => {
    if (departmentalOffice) return "departmental";
    if (department) return "faculty";
    return "administration";
  };

  const viewMode = getViewMode();

  // Get current IDs as strings to avoid type issues
  const currentOfficeId = office;
  const currentDepartmentId = department;
  const currentDepartmentalOfficeId = departmentalOffice;

  // Set default selection if no parameters are present
  useEffect(() => {
    if (!office && !department && !departmentalOffice) {
      if (
        viewMode === "administration" &&
        filteredOffices &&
        filteredOffices.length > 0
      ) {
        router.push(`/pages/directory-details?office=${filteredOffices[0].id}`);
      } else if (
        viewMode === "faculty" &&
        departments &&
        departments.length > 0
      ) {
        router.push(`/pages/directory-details?department=${departments[0].id}`);
      } else if (
        viewMode === "departmental" &&
        departmentalOffices &&
        departmentalOffices.length > 0
      ) {
        router.push(
          `/pages/directory-details?departmentalOffice=${departmentalOffices[0].id}`
        );
      }
    }
  }, [
    office,
    department,
    departmentalOffice,
    viewMode,
    filteredOffices,
    departments,
    departmentalOffices,
    router,
  ]);

  // Handle view mode changes via toggle
  const handleViewModeChange = (mode: ViewMode) => {
    if (
      mode === "administration" &&
      filteredOffices &&
      filteredOffices.length > 0
    ) {
      router.push(`/pages/directory-details?office=${filteredOffices[0].id}`);
    } else if (mode === "faculty" && departments && departments.length > 0) {
      router.push(`/pages/directory-details?department=${departments[0].id}`);
    } else if (
      mode === "departmental" &&
      departmentalOffices &&
      departmentalOffices.length > 0
    ) {
      router.push(
        `/pages/directory-details?departmentalOffice=${departmentalOffices[0].id}`
      );
    }
  };

  // Get the currently active item ID for highlighting
  const getActiveItemId = () => {
    if (viewMode === "administration") {
      return currentOfficeId;
    } else if (viewMode === "faculty") {
      return currentDepartmentId;
    } else {
      return currentDepartmentalOfficeId;
    }
  };

  const activeItemId = getActiveItemId();

  // Get members based on current view mode and active item
  const getMembers = () => {
    switch (viewMode) {
      case "administration":
        return (
          officeMembers?.filter((om) =>
            currentOfficeId
              ? om?.officeId?.toString() === currentOfficeId
              : false
          ) || []
        );

      case "faculty":
        return (
          facultyPersons?.filter((fp) =>
            currentDepartmentId
              ? fp?.departmentId?.toString() === currentDepartmentId
              : false
          ) || []
        );

      case "departmental":
        return (
          officeMembers?.filter((om) =>
            currentDepartmentalOfficeId
              ? om?.officeId?.toString() === currentDepartmentalOfficeId
              : false
          ) || []
        );

      default:
        return [];
    }
  };

  // Get all members
  const allMembers = getMembers();

  // Check if member is head based on actual boolean fields
  const isHeadMember = (member: any) => {
    if (viewMode === "faculty") {
      // For faculty, check isChairperson field
      return member.isChairperson === YesOrNo.YES;
    } else {
      // For administration and departmental, check isHeadOfOffice field
      return member.isheadOfOffice === YesOrNo.YES;
    }
  };

  // Check if member is adjunct
  const isAdjunctMember = (member: any) => {
    if (viewMode === "faculty") {
      // For faculty, check isAdjunct field
      return member.isAdjunct === YesOrNo.YES;
    }
  };

  // Get head members (all heads, not just first one)
  const getHeadMembers = () => {
    const heads = allMembers.filter((member) => isHeadMember(member));
    return heads;
  };

  // Get head members
  const headMembers = getHeadMembers();

  // Get regular members (excluding head and adjunct members)
  const getRegularMembers = () => {
    return allMembers.filter(
      (member) => !isHeadMember(member) && !isAdjunctMember(member)
    );
  };

  // Get regular members
  const regularMembers = getRegularMembers();

  // Get adjunct members
  const getAdjunctMembers = () => {
    return allMembers.filter((member) => isAdjunctMember(member));
  };

  // Get adjunct members
  const adjunctMembers = getAdjunctMembers();

  // Sidebar data based on view mode
  const getSidebarItems = () => {
    switch (viewMode) {
      case "administration":
        return filteredOffices;
      case "faculty":
        return departments;
      case "departmental":
        return departmentalOffices;
      default:
        return [];
    }
  };

  // Get sidebar items
  const sidebarItems = getSidebarItems();

  // Sidebar Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil((sidebarItems?.length || 0) / ITEMS_PER_PAGE);
  const paginatedItems = sidebarItems?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset to page 1 when view mode changes
  useEffect(() => {
    setCurrentPage(1);
  }, [viewMode]);

  const handlePageChange = (direction: "prev" | "next") => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Get sidebar title based on view mode
  const getSidebarTitle = () => {
    switch (viewMode) {
      case "administration":
        return "Administration";
      case "faculty":
        return "Faculty Information";
      case "departmental":
        return "Departmental Offices";
      default:
        return "";
    }
  };

  // Generate link based on view mode
  const generateLink = (item: any) => {
    switch (viewMode) {
      case "administration":
        return `/pages/directory-details?office=${item.id}`;
      case "faculty":
        return `/pages/directory-details?department=${item.id}`;
      case "departmental":
        return `/pages/directory-details?departmentalOffice=${item.id}`;
      default:
        return "#";
    }
  };

  // Get item display name based on view mode
  const getItemDisplayName = (item: any) => {
    switch (viewMode) {
      case "administration":
        return item.title;
      case "faculty":
        return item.name;
      case "departmental":
        return item.title;
      default:
        return "";
    }
  };

  // Render member card component
  const renderMemberCard = (
    member: any,
    index: number,
    isHead: boolean = false
  ) => {
    const photo =
      "profilePhotoUrl" in member ? member.profilePhotoUrl : member?.photo;

    return (
      <div
        {...(!isStatic
          ? {
              "data-aos":
                window.innerWidth < 800
                  ? "fade-up"
                  : index % 3 === 0
                  ? "fade-right"
                  : index % 3 === 1
                  ? "zoom-in"
                  : "fade-left",
            }
          : {})}
        key={member?.id}
        className={`col-lg-4 col-md-6 col-sm-12 ${
          isHead ? "head-member-card" : ""
        }`}
      >
        <div className="directory-card">
          <div className="directory-image">
            <Image src={photo || Placeholder} alt={member?.name || ""} fill />
          </div>
          <div className="directory-info">
            <h6>{member?.name}</h6>
            <div className="directory-detail">
              <p>
                {viewMode === "faculty"
                  ? designations.find(
                      (d) => d.id === parseInt(member.designation)
                    )?.designation || "N/A"
                  : member?.designation}
              </p>
              <p>
                {(viewMode === "faculty" && member?.isChairperson === "YES") && "& Chairperson" }
              </p>
            </div>
          </div>
          <div className="directory-information">
            <div className="directory-member-contact">
              <Icon icon="bx:phone" width="18" height="18" />
              <p style={{ margin: 0, fontSize: "12px" }}>
                09666775577 {member?.ext && `(Ext:${" "} ${member?.ext})`}
              </p>
            </div>
            {member?.email && member?.isBoT !== YesOrNo.YES && (
              <div className="directory-member-contact">
                <Icon icon="quill:mail" width="18" height="18" />
                <p style={{ margin: 0, fontSize: "12px" }}>{member?.email}</p>
              </div>
            )}

            {member?.location && (
              <div className="directory-member-contact">
                <div>
                  <Icon icon="basil:location-outline" width="18" height="18" />
                </div>
                <p style={{ margin: 0, fontSize: "12px" }}>
                  {member?.location}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="directory-filter-body">
        <h4 style={{ margin: 0 }}>All Directory Details</h4>
        <div className="view-mode-select">
          <select
            value={viewMode}
            onChange={(e) => handleViewModeChange(e.target.value as ViewMode)}
            style={{
              padding: "6px 12px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              background: "#fff",
              minWidth: "220px",
            }}
          >
            <option value="administration">Administration</option>
            <option value="faculty">Faculty Information</option>
            <option value="departmental">Departmental Offices</option>
          </select>
        </div>
      </div>

      <div className="row">
        {/* Sidebar */}
        <div className="col-12 col-sm-12 col-md-5 col-lg-3">
          <div className="sidebar-menu">
            <div className="sidebar-menu-header">
              <h3>{getSidebarTitle()}</h3>
            </div>
            <div className="sidebar-menu-body scrollable">
              {paginatedItems?.map((item, index) => {
                // Convert both to string for reliable comparison
                const itemIdString = item.id.toString();
                const activeIdString = activeItemId?.toString();
                const isActive = itemIdString === activeIdString;

                return (
                  <div
                    className="sidebar-menu-item"
                    key={`${viewMode}-${item.id}`}
                  >
                    <Link
                      className="sidebar-menu-link"
                      href={generateLink(item)}
                      style={{
                        backgroundColor: isActive ? "#aa4a44" : "transparent",
                        color: isActive ? "#fff" : "inherit",
                      }}
                    >
                      <span>{getItemDisplayName(item)}</span>
                    </Link>
                    {index < paginatedItems.length - 1 && (
                      <hr className="sidebar-divider" />
                    )}
                  </div>
                );
              })}

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="sidebar-pagination">
                  <button
                    onClick={() => handlePageChange("prev")}
                    disabled={currentPage === 1}
                  >
                    Prev
                  </button>
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange("next")}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          className="col-12 col-sm-12 col-md-7 col-lg-9"
          style={{ margin: "48px 0px" }}
        >
          {/* Head of Office / Chairperson Cards */}
          {headMembers.length > 0 && (
            <div className="row mb-2">
              {headMembers.map((member, index) =>
                renderMemberCard(member, index, true)
              )}
            </div>
          )}

          {/* Regular Members */}
          <div className="row">
            {allMembers.length > 0 ? (
              <div className="row g-3">
                {regularMembers.map((member, index) =>
                  renderMemberCard(member, index + headMembers.length, false)
                )}
              </div>
            ) : (
              <div className="col-12">
                <div className="alert alert-info">
                  No members found for this selection.
                </div>
              </div>
            )}
          </div>

          {/* Adjunct Faculty Members */}
          <div className="row">
            {adjunctMembers.length > 0 && (
              <div className="row g-3">
                {adjunctMembers.map((member, index) =>
                  renderMemberCard(member, index, true)
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectoryDetails;
