"use client";

import "./RequestForm.scss";
import React, { FC, useState, useRef, useEffect } from "react";
import { useFacultyData } from "@lib/hooks/useFacultyData";
import { useOfficeData } from "@lib/hooks/useOfficeData";
import { useClubData } from "@lib/hooks/useClubData";
import { YesOrNo } from "@lib/services/facultyPerson/facultyPerson.service.type";
import { officeMemberActions } from "@lib/slices/officeMember/officeMember.slice";
import { facultyPersonActions } from "@lib/slices/facultyPerson/facultyPerson.slice";
import { userActions } from "@lib/slices/user/user.slice";
import { UserType } from "@lib/services/user/user.service.type";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import { toast, ToastContainer } from "react-toastify";
import { FetchStatus } from "@lib/services/fetch.type";

const RequestForm: FC = () => {
  const { facultys } = useFacultyData();
  const { departments } = useFacultyData();
  const { offices } = useOfficeData();
  const { clubs } = useClubData();

  const dispatch = useDispatch();

  const createUserStatus = useSelector(
    (state: RootState) => state.user.createUserStatus,
  );
  const createUserError = useSelector(
    (state: RootState) => state.user.createUserError,
  );
  const createFacultyPersonStatus = useSelector(
    (state: RootState) => state.facultyPerson.createFacultyPersonStatus,
  );
  const createfacultyPersonError = useSelector(
    (state: RootState) => state.facultyPerson.createFacultyPersonError,
  );
  const createOfficeMemberStatus = useSelector(
    (state: RootState) => state.officeMember.createOfficeMemberStatus,
  );
  const createOfficeMemberError = useSelector(
    (state: RootState) => state.officeMember.createOfficeMemberError,
  );

  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [signaturePreview, setSignaturePreview] = useState<string | null>(null);
  const [joiningFilePreview, setJoiningFilePreview] = useState<string | null>(
    null,
  );
  const [step, setStep] = useState<number>(1);

  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement | null>(null);
  const isFaculty = formData.type === "teacher-academic";
  const isAdmin = formData.type === "admin-staff";
  const isAdhoc = formData.type === "ad-hoc-parttime";
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // clear that field error (if any) when user types/selects
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setPreview: React.Dispatch<React.SetStateAction<string | null>>,
    fieldName?: string,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (fieldName) {
        setFormData((prev) => ({ ...prev, [fieldName]: file }));
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Validate only fields relevant to the current step
  const validateStep = (s: number = step) => {
    const newErrors: Record<string, string> = {};
    const {
      type,
      firstName,
      lastName,
      designation,
      personalMobile,
      personalEmail,
      facultyId,
      departmentId,
      officeId,
    } = formData;

    if (s === 1) {
      if (!type) newErrors.type = "Type is required";
      if (!firstName) newErrors.firstName = "First name is required";
      if (!lastName) newErrors.lastName = "Last name is required";
      if (!designation) newErrors.designation = "Designation is required";
      if (!personalMobile) newErrors.personalMobile = "Mobile is required";
      if (!personalEmail) newErrors.personalEmail = "Email is required";
    }

    if (s === 2) {
      // conditional requirements depending on selected type
      if (type === "teacher-academic") {
        if (!facultyId) newErrors.facultyId = "Faculty is required";
        if (!departmentId) newErrors.departmentId = "Department is required";
      }
      if (!formData.joiningDate)
        newErrors.joiningDate = "Joining date is required";

      if (type === "admin-staff") {
        if (!officeId) newErrors.officeId = "Office is required";
      }
    }

    if (s === 3) {
      if (!formData.bachelorDegree)
        newErrors.bachelorDegree = "Bachelor degree is required";
      if (!formData.bachelorInstitute)
        newErrors.bachelorInstitute = "Bachelor institute is required";
      if (!formData.bachelorYear)
        newErrors.bachelorYear = "Bachelor year is required";
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  // Validate all mandatory fields (used on final submit)
  const validateAll = () => {
    const newErrors: Record<string, string> = {};
    const {
      type,
      firstName,
      lastName,
      designation,
      personalMobile,
      personalEmail,
      facultyId,
      departmentId,
      officeId,
      bachelorDegree,
      bachelorInstitute,
      bachelorYear,
    } = formData;

    if (!type) newErrors.type = "Type is required";
    if (!firstName) newErrors.firstName = "First name is required";
    if (!lastName) newErrors.lastName = "Last name is required";
    if (!designation) newErrors.designation = "Designation is required";
    if (!personalMobile) newErrors.personalMobile = "Mobile is required";
    if (!personalEmail) newErrors.personalEmail = "Email is required";

    if (type === "teacher-academic") {
      if (!facultyId) newErrors.facultyId = "Faculty is required";
      if (!departmentId) newErrors.departmentId = "Department is required";
    }
    if (type === "admin-staff") {
      if (!officeId) newErrors.officeId = "Office is required";
    }

    if (!bachelorDegree)
      newErrors.bachelorDegree = "Bachelor degree is required";
    if (!bachelorInstitute)
      newErrors.bachelorInstitute = "Bachelor institute is required";
    if (!bachelorYear) newErrors.bachelorYear = "Bachelor year is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all mandatory fields before final submit
    if (!validateAll()) {
      // if validation fails, send user back to first step that has an error
      if (
        errors.type ||
        errors.firstName ||
        errors.lastName ||
        errors.designation ||
        errors.personalMobile ||
        errors.personalEmail
      ) {
        setStep(1);
      } else if (errors.facultyId || errors.departmentId || errors.officeId) {
        setStep(2);
      }
      return;
    }

    const { type } = formData;

    // ----------- Map User Values -----------
    const userPayload = {
      request: {
        firstName: formData.firstName || "",
        lastName: formData.lastName || "",
        bloodGroup: formData.bloodGroup || "",
        mobileNo: formData.mobileNo || null,
        email: formData.personalEmail || "",
        password: "Temp23456okr",
        userType: UserType.OTHER,
        roleId: 10,
        activateStatus: false,
        facultyId: formData.facultyId ? [Number(formData.facultyId)] : [],
        departmentId: formData.departmentId
          ? [Number(formData.departmentId)]
          : [],
        officeId: formData.officeId ? [Number(formData.officeId)] : [],
        clubId: formData.clubId ? [Number(formData.clubId)] : [],
        profilePhotoUrl: formData.profileImage || null,
        signatureUrl: formData.signatureUpload || null,
      },
    };

    dispatch(userActions.createUser(userPayload));

    // Generate slug from name
    const nameForSlug = `${formData.firstName || ""} ${
      formData.lastName || ""
    }`.trim();
    const slug = nameForSlug
      .toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()@+?><[\]|"'’]/g, "")
      .replace(/\s+/g, "-");

    // Combine education details
    const eduParts = [];

    if (formData.phdDegree) {
      eduParts.push(
        `PhD: ${formData.phdDegree}, ${formData.phdInstitute || ""}, ${
          formData.phdYear || ""
        }`,
      );
    }

    if (formData.mastersDegree) {
      eduParts.push(
        `Masters: ${formData.mastersDegree}, ${
          formData.mastersInstitute || ""
        }, ${formData.mastersYear || ""}`,
      );
    }

    if (formData.bachelorDegree) {
      eduParts.push(
        `Bachelor: ${formData.bachelorDegree}, ${
          formData.bachelorInstitute || ""
        }, ${formData.bachelorYear || ""}`,
      );
    }

    const eduDetails = eduParts.join("\n");

    // ----------- If Teacher/Academic -----------
    if (type === "teacher-academic") {
      const facultyPayload = {
        request: {
          slug: slug,
          facultyId: formData.facultyId || 0,
          departmentId: formData.departmentId || 0,
          courseId: 0,
          jobType: formData.jobType || "",
          designation: formData.designation || "",
          dateOfJoining: formData.joiningDate || new Date(),
          isDean: YesOrNo.NO,
          isChairperson: YesOrNo.NO,
          isAdjunct: YesOrNo.NO,
          isProctor: YesOrNo.NO,
          isAssProctor: YesOrNo.NO,
          isBoT: YesOrNo.NO,
          isAdvisor: YesOrNo.NO,
          isCoordinator: YesOrNo.NO,
          onLeaveText: "",
          onLeave: YesOrNo.NO,
          name: `${formData.firstName || ""} ${formData.lastName || ""}`,
          roomNo: formData.roomNo || "",
          photo: formData.profileImage || null,
          signatureUrl: formData.signatureUpload || null,
          cvUrl: formData.joiningFile || null,
          message: "",
          biography: "",
          eduDetails: eduDetails.trim(),
          publications: "",
          onGoingResearch: "",
          researchInterest: "",
          teachingMaterials: "",
          affiliation: "",
          achievements: "",
          participations: "",
          profDev: "",
          others: "",
          telephone: formData.personalMobile || "",
          email: formData.personalEmail || "",
          ext: formData.officeExt || "",
          gsLink: formData.googleScholar || "",
          orcidLink: formData.orcid || "",
          researchGateLink: formData.researchGate || "",
          scopusLink: formData.scopus || "",
          liLink: "",
          fbLink: "",
          instaLink: "",
          xLink: "",
          order: 0,
          isPublished: YesOrNo.NO,
        },
      };

      dispatch(facultyPersonActions.createfacultyPerson(facultyPayload));
    }

    // ----------- If Admin/Staff -----------
    if (type === "admin-staff") {
      const officePayload = {
        request: {
          officeId: formData.officeId || 0,
          officeIds: [],
          name: `${formData.firstName || ""} ${formData.lastName || ""}`,
          slug: slug,
          jobType: formData.jobType || "",
          designation: formData.designation || "",
          designationText: "",
          order: 0,
          profilePhotoUrl: formData.profileImage || null,
          signatureUrl: formData.signatureUpload || null,
          cvUrl: formData.joiningFile || null,
          telephone: formData.personalMobile || "",
          ext: formData.officeExt || "",
          location: "",
          email: formData.personalEmail || "",
          fbLink: "",
          xLink: "",
          youtubeLink: "",
          linkedInLink: "",
          githubLink: "",
          portfolioLink: "",
          pinterestLink: "",
          instagramLink: "",
          message: "",
          previousWorkExperience: "",
          educationDescription: eduDetails.trim() || "",
          careerDescription: "",
          onLeaveText: "",
          onLeave: YesOrNo.NO,
          isPublished: YesOrNo.NO,
          isMember: YesOrNo.NO,
          isBoT: YesOrNo.NO,
          isheadOfOffice: YesOrNo.NO,
          isProctor: YesOrNo.NO,
          isAssProctor: YesOrNo.NO,
          isSupportMember: YesOrNo.NO,
          isOfficeMember: YesOrNo.NO,
          isMemberSecretary: YesOrNo.NO,
          dateOfJoining: formData.joiningDate || new Date(),
        },
      };

      dispatch(officeMemberActions.createOfficeMember(officePayload));
    }

    // ----------- Reset Form -----------
    formRef.current?.reset();
    setFormData({});
    setProfilePreview(null);
    setSignaturePreview(null);
    setJoiningFilePreview(null);
    setStep(1);
  };

  useEffect(() => {
    if (
      createUserStatus === FetchStatus.SUCCESS ||
      createFacultyPersonStatus === FetchStatus.SUCCESS ||
      createOfficeMemberStatus === FetchStatus.SUCCESS
    ) {
      toast.success("Request sent successfully");
    } else if (createUserStatus === FetchStatus.FAILURE) {
      toast.error(createUserError + ". Failed to send user request.");
    } else if (createFacultyPersonStatus === FetchStatus.FAILURE) {
      toast.error(
        createfacultyPersonError + ". Failed to send faculty request.",
      );
    } else if (createOfficeMemberStatus === FetchStatus.FAILURE) {
      toast.error(createOfficeMemberError + ". Failed to send office request.");
    }

    dispatch(userActions.resetAllState());
    dispatch(facultyPersonActions.resetAllState());
    dispatch(officeMemberActions.resetAllState());
  });

  const nextStep = () => {
    if (validateStep(step)) setStep((prev) => Math.min(prev + 1, 4));
  };
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // state for filtered departments
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  // when faculty changes - filter departments
  const handleDepartmentChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "facultyId" && { departmentId: "" }),
    }));

    if (name === "facultyId") {
      const filtered = departments.filter(
        (dept) => String(dept.facultyId) === String(value),
      );
      setFilteredDepartments(filtered);
    }
  };

  return (
    <section className="request-form-card">
      <h3 className="form-title">Request an Account</h3>

      {/* Progress Bar */}
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${(step / 4) * 100}%` }}
        ></div>
      </div>

      <form className="request-form" onSubmit={handleSubmit} ref={formRef}>
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <>
            <div className="image-upload">
              <label htmlFor="profileImage" className="upload-box">
                <input
                  type="file"
                  id="profileImage"
                  name="profileImage"
                  accept="image/*"
                  hidden
                  onChange={(e) =>
                    handleImageChange(e, setProfilePreview, "profileImage")
                  }
                />
                {profilePreview ? (
                  <img src={profilePreview} alt="Preview" />
                ) : (
                  <>
                    <span className="camera-icon">📷</span>
                    <p>Upload Image</p>
                  </>
                )}
              </label>
              <p className="helper-text">
                Scanned copy with a clear, single-color background
              </p>
            </div>

            <div className="form-group radio-group">
              <label>
                Type <span className="required">*</span>
              </label>
              <div className="radio-options column">
                <label>
                  <input
                    type="radio"
                    name="type"
                    value="teacher-academic"
                    checked={formData.type === "teacher-academic"}
                    onChange={handleChange}
                  />{" "}
                  Faculty Member
                </label>
                <label>
                  <input
                    type="radio"
                    name="type"
                    value="admin-staff"
                    checked={formData.type === "admin-staff"}
                    onChange={handleChange}
                  />{" "}
                  Admin Staff
                </label>
                {/* <label>
                  <input
                    type="radio"
                    name="type"
                    value="full-time"
                    checked={formData.type === "full-time"}
                    onChange={handleChange}
                  />{" "}
                  Full Time
                </label> */}
                <label>
                  <input
                    type="radio"
                    name="type"
                    value="ad-hoc-parttime"
                    checked={formData.type === "ad-hoc-parttime"}
                    onChange={handleChange}
                  />{" "}
                  Ad-Hoc/Part-time/Contractual
                </label>
              </div>
              {errors.type && <p className="error-text">{errors.type}</p>}
            </div>

            <div className="form-row">
              <div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name*"
                  value={formData.firstName || ""}
                  onChange={handleChange}
                />
                {errors.firstName && (
                  <p className="error-text">{errors.firstName}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name*"
                  value={formData.lastName || ""}
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <p className="error-text">{errors.lastName}</p>
                )}
              </div>
            </div>
            <p className="helper-text">As per appointment/joining letter</p>

            <div className="form-row">
              <input
                type="text"
                name="designation"
                placeholder="Designation*"
                value={formData.designation || ""}
                onChange={handleChange}
              />
              {errors.designation && (
                <p className="error-text">{errors.designation}</p>
              )}
            </div>
            <p className="helper-text">As per appointment/joining letter</p>

            <input
              type="text"
              name="personalMobile"
              placeholder="Personal mobile*"
              value={formData.personalMobile || ""}
              onChange={handleChange}
            />
            {errors.personalMobile && (
              <p className="error-text">{errors.personalMobile}</p>
            )}

            <input
              type="text"
              name="personalEmail"
              placeholder="Personal email*"
              value={formData.personalEmail || ""}
              onChange={handleChange}
            />
            {errors.personalEmail && (
              <p className="error-text">{errors.personalEmail}</p>
            )}

            <input
              type="text"
              name="bloodGroup"
              placeholder="Blood group"
              value={formData.bloodGroup || ""}
              onChange={handleChange}
            />

            <div className="form-navigation">
              <button type="button" className="next-btn" onClick={nextStep}>
                Next
              </button>
            </div>
          </>
        )}

        {/* Step 2: Joining Info */}
        {step === 2 && (
          <>
            {(isFaculty || isAdhoc) && (
              <>
                <select
                  name="facultyId"
                  value={formData.facultyId || ""}
                  onChange={handleDepartmentChange}
                >
                  <option value="">Select Faculty</option>
                  {facultys?.map((faculty) => (
                    <option key={faculty.id} value={faculty.id}>
                      {faculty.name}
                    </option>
                  ))}
                </select>
                {errors.facultyId && (
                  <p className="error-text">{errors.facultyId}</p>
                )}
              </>
            )}
            {(isFaculty || isAdhoc) && (
              <>
                <select
                  name="departmentId"
                  value={formData.departmentId || ""}
                  onChange={handleDepartmentChange}
                >
                  <option value="">Select Department</option>
                  {filteredDepartments?.map((department) => (
                    <option key={department.id} value={department.id}>
                      {department.name}
                    </option>
                  ))}
                </select>
                {errors.departmentId && (
                  <p className="error-text">{errors.departmentId}</p>
                )}
              </>
            )}

            {(isAdmin || isAdhoc) && (
              <>
                <select
                  name="officeId"
                  value={formData.officeId || ""}
                  onChange={handleChange}
                >
                  <option value="">Select Division/Section</option>
                  {offices?.map((office) => (
                    <option key={office.id} value={office.id}>
                      {office.title}
                    </option>
                  ))}
                </select>
                {errors.officeId && (
                  <p className="error-text">{errors.officeId}</p>
                )}
              </>
            )}

            <select
              name="clubId"
              value={formData.clubId || ""}
              onChange={handleChange}
            >
              <option value="">Select Club</option>
              {clubs?.map((club) => (
                <option key={club.id} value={club.id}>
                  {club.title}
                </option>
              ))}
            </select>

            <label>Date of Joining</label>
            <input
              type="date"
              name="joiningDate"
              value={formData.joiningDate || ""}
              onChange={handleChange}
            />
            {errors.joiningDate && (
              <p className="error-text">{errors.joiningDate}</p>
            )}

            <input
              type="text"
              name="officeExt"
              placeholder="Office Ext"
              value={formData.officeExt || ""}
              onChange={handleChange}
            />

            <input
              type="text"
              name="roomNo"
              placeholder="Room No"
              value={formData.roomNo || ""}
              onChange={handleChange}
            />

            <div className="file-upload">
              <label htmlFor="joiningFile" className="upload-box">
                <input
                  type="file"
                  id="joiningFile"
                  name="joiningFile"
                  accept="application/pdf"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setFormData((prev) => ({
                        ...prev,
                        joiningFile: file,
                      }));
                      setJoiningFilePreview(file.name);
                    }
                  }}
                />
                {joiningFilePreview ? (
                  <span>📄 {joiningFilePreview}</span>
                ) : (
                  <span>Upload Joining Document (PDF)</span>
                )}
              </label>
            </div>

            <div className="form-navigation">
              <button type="button" className="back-btn" onClick={prevStep}>
                Back
              </button>
              <button type="button" className="next-btn" onClick={nextStep}>
                Next
              </button>
            </div>
          </>
        )}

        {/* Step 3: Education */}
        {step === 3 && (
          <>
            <label>Education</label>

            <div className="form-row">
              <input
                type="text"
                name="phdDegree"
                placeholder="M.Phil / Ph.D"
                value={formData.phdDegree || ""}
                onChange={handleChange}
              />
              <input
                type="text"
                name="phdInstitute"
                placeholder="Institute"
                value={formData.phdInstitute || ""}
                onChange={handleChange}
              />
              <input
                type="text"
                name="phdYear"
                placeholder="Year"
                value={formData.phdYear || ""}
                onChange={handleChange}
              />
            </div>
            <hr style={{ margin: "4px 0px", background: "#e2e2e2ff" }} />

            <div className="form-row">
              <div>
                <input
                  type="text"
                  name="mastersDegree"
                  placeholder="Masters"
                  value={formData.mastersDegree || ""}
                  onChange={handleChange}
                />
                {errors.mastersDegree && (
                  <p className="error-text">{errors.mastersDegree}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="mastersInstitute"
                  placeholder="Institute"
                  value={formData.mastersInstitute || ""}
                  onChange={handleChange}
                />
              </div>
              <input
                type="text"
                name="mastersYear"
                placeholder="Year"
                value={formData.mastersYear || ""}
                onChange={handleChange}
              />
            </div>
            <hr style={{ margin: "4px 0px", background: "#e2e2e2ff" }} />

            <div className="form-row">
              <div>
                <input
                  type="text"
                  name="bachelorDegree"
                  placeholder="Bachelor*"
                  value={formData.bachelorDegree || ""}
                  onChange={handleChange}
                />
                {errors.bachelorDegree && (
                  <p className="error-text">{errors.bachelorDegree}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="bachelorInstitute"
                  placeholder="Institute*"
                  value={formData.bachelorInstitute || ""}
                  onChange={handleChange}
                />
                {errors.bachelorInstitute && (
                  <p className="error-text">{errors.bachelorInstitute}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="bachelorYear"
                  placeholder="Year*"
                  value={formData.bachelorYear || ""}
                  onChange={handleChange}
                />
                {errors.bachelorYear && (
                  <p className="error-text">{errors.bachelorYear}</p>
                )}
              </div>
            </div>

            <label>Research Profile</label>
            <input
              type="text"
              name="scopus"
              placeholder="Scopus"
              value={formData.scopus || ""}
              onChange={handleChange}
            />
            <input
              type="text"
              name="researchGate"
              placeholder="Research Gate"
              value={formData.researchGate || ""}
              onChange={handleChange}
            />
            <input
              type="text"
              name="googleScholar"
              placeholder="Google Scholar"
              value={formData.googleScholar || ""}
              onChange={handleChange}
            />
            <input
              type="text"
              name="orcid"
              placeholder="ORCID"
              value={formData.orcid || ""}
              onChange={handleChange}
            />
            <input
              type="text"
              name="webMd"
              placeholder="WebMd"
              value={formData.webMd || ""}
              onChange={handleChange}
            />
            <input
              type="text"
              name="pubMed"
              placeholder="PubMed"
              value={formData.pubMed || ""}
              onChange={handleChange}
            />
            <input
              type="text"
              name="others"
              placeholder="Others"
              value={formData.others || ""}
              onChange={handleChange}
            />

            <div className="form-navigation">
              <button type="button" className="back-btn" onClick={prevStep}>
                Back
              </button>
              <button type="button" className="next-btn" onClick={nextStep}>
                Next
              </button>
            </div>
          </>
        )}

        {/* Step 4: Others */}
        {step === 4 && (
          <>
            <div className="image-upload">
              <label htmlFor="signatureUpload" className="upload-box">
                <input
                  type="file"
                  id="signatureUpload"
                  name="signatureUpload"
                  accept="image/*"
                  hidden
                  onChange={(e) =>
                    handleImageChange(e, setSignaturePreview, "signatureUpload")
                  }
                />
                {signaturePreview ? (
                  <img src={signaturePreview} alt="Signature Preview" />
                ) : (
                  <>
                    <span className="camera-icon">✍️</span>
                    <p>Upload Signature</p>
                  </>
                )}
              </label>
            </div>

            <div className="form-navigation">
              <button type="button" className="back-btn" onClick={prevStep}>
                Back
              </button>
              <button type="submit" className="request-submit-btn">
                Submit
              </button>
            </div>
          </>
        )}
      </form>
    </section>
  );
};

export default RequestForm;
