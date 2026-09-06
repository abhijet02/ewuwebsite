"use client";

import "./ClubMemberForm.scss";
import { Icon } from "@iconify/react";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { FetchStatus } from "@lib/services/fetch.type";
import { clubMemberActions } from "@lib/slices/clubMember/clubMember.slice";
import { semesterActions } from "@lib/slices/semester/semester.slice";
import { skillActions } from "@lib/slices/skill/skill.slice";
import { useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { YesOrNo } from "@lib/services/clubMember/clubMember.service.type";
import { clubMemberSchema } from "@lib/schemas/clubMember.schema";
import { useFormik } from "formik";
import { useClubData } from "@lib/hooks/useClubData";

const ClubMemberForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const { clubs } = useClubData();

  // States
  const semesters = useAppSelector(
    (state) => state.semester.getSemestersResponse?.semesters
  );
  const skills = useAppSelector(
    (state) => state.skill.getSkillsResponse?.skills
  );

  // Statuses
  const createClubMemberStatus = useAppSelector(
    (state) => state.clubMember.createClubMemberStatus
  );

  // File references
  const photoRef = useRef(null);
  const signatureRef = useRef(null);
  const cvRef = useRef(null);

  // Handle success/failure notifications
  useEffect(() => {
    if (createClubMemberStatus === FetchStatus.SUCCESS) {
      toast.success("Successfully Submitted");
    } else if (createClubMemberStatus === FetchStatus.FAILURE) {
      toast.error("Failed to CrSubmiteate");
    }

    // Fetch data
    dispatch(
      clubMemberActions.getClubMembers({
        request: {
          page: 1,
          limit: 500,
        },
      })
    );

    dispatch(clubMemberActions.resetAllState());
  }, [createClubMemberStatus, dispatch]);

  // Fetch pages
  useEffect(() => {
    dispatch(
      semesterActions.getSemesters({
        request: {
          page: 1,
          limit: 500,
        },
      })
    );

    dispatch(
      skillActions.getSkills({
        request: {
          page: 1,
          limit: 500,
        },
      })
    );
  }, [dispatch]);

  // Handle form submission (create or update)
  const handleSave = useFormik({
    initialValues: {
      fullName: "",
      slug: "",
      studentId: "",
      clubId: 0,
      designation: "",
      photoUrl: null,
      signatureUrl: null,
      cvUrl: null,
      youtubeLink: "",
      email: "",
      phoneNumber: "",
      earnedCredit: "",
      semester: "",
      joiningSemeser: "",
      cgpa: "",
      bloodGroup: "",
      skillId: [],
      achievements: "",
      hobby: "",
      classRoutine: "",
      isApproved: YesOrNo.NO,
      isExecutive: YesOrNo.NO,
      isModerators: YesOrNo.NO,
    },

    validationSchema: clubMemberSchema,

    onSubmit: async (values) => {
      try {
        dispatch(
          clubMemberActions.createClubMember({
            request: {
              skillId: values.skillId.map(Number),
              ...values,
            },
          })
        );
      } catch (error) {
        console.error("Error:", error);
      }

      if (photoRef.current) {
        photoRef.current.value = "";
      }
      if (signatureRef.current) {
        signatureRef.current.value = "";
      }
      if (cvRef.current) {
        cvRef.current.value = "";
      }

      handleSave.resetForm();
    },
  });

  const handleSingleFileChange = (
    clubMember: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (clubMember.currentTarget.files && clubMember.currentTarget.files[0]) {
      handleSave.setFieldValue(
        `${clubMember.currentTarget.name}`,
        clubMember.target.files[0]
      );
    }
  };

  return (
    <div className="common-page">
      <div className="register-wrapper">
        <div className="container">
          <div className="row mb-3">
            <div className="col-lg-12">
              <h1 className="reg-head">Register</h1>
              <p className="reg-para">Enter the details to get going...</p>
            </div>
          </div>
          <form action="#" onSubmit={handleSave.handleSubmit}>
            <div className="row g-3">
              <div className="col-lg-6">
                <div className="form-group icon-position">
                  <label htmlFor="club">
                    Club <span className="must-fill">*</span>
                  </label>
                  <select
                    required
                    className="form-control"
                    name="clubId"
                    defaultValue={0}
                    value={handleSave.values.clubId.toString()}
                    onChange={handleSave.handleChange}
                    onBlur={handleSave.handleBlur}
                  >
                    <option className="light-text" value="selection">
                      ----Select Your Preferred Club----
                    </option>
                    {clubs?.map((club) => (
                      <option key={club?.id} value={club?.id}>
                        {club?.title}
                      </option>
                    ))}
                  </select>
                  <i className="fa-solid fa-chevron-down dd-icon"></i>
                  {handleSave.touched.clubId && handleSave.errors.clubId && (
                    <div className="text-sm text-red-500">
                      {handleSave.errors.clubId}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-lg-6">
                <div className="form-group">
                  <label htmlFor="photoUrl">Photo</label>
                  <input
                    type="file"
                    className="form-control"
                    name="photoUrl"
                    onChange={(event) => handleSingleFileChange(event)}
                    onBlur={handleSave.handleBlur}
                    ref={photoRef}
                  />
                  {handleSave.touched.photoUrl &&
                    handleSave.errors.photoUrl && (
                      <div className="mt-1 text-sm text-red-500">
                        {handleSave.errors.photoUrl.toString()}
                      </div>
                    )}
                </div>
              </div>

              <div className="col-lg-6">
                <div className="form-group">
                  <label htmlFor="signatureUrl">Signature</label>
                  <input
                    type="file"
                    className="form-control"
                    name="signatureUrl"
                    onChange={(event) => handleSingleFileChange(event)}
                    onBlur={handleSave.handleBlur}
                    ref={signatureRef}
                  />
                  {handleSave.touched.signatureUrl &&
                    handleSave.errors.signatureUrl && (
                      <div className="mt-1 text-sm text-red-500">
                        {handleSave.errors.signatureUrl.toString()}
                      </div>
                    )}
                </div>
              </div>

              <div className="col-lg-6">
                <div className="form-group">
                  <label htmlFor="cvUrl">CV</label>
                  <input
                    type="file"
                    className="form-control"
                    name="cvUrl"
                    onChange={(event) => handleSingleFileChange(event)}
                    onBlur={handleSave.handleBlur}
                    ref={cvRef}
                  />
                  {handleSave.touched.cvUrl && handleSave.errors.cvUrl && (
                    <div className="mt-1 text-sm text-red-500">
                      {handleSave.errors.cvUrl.toString()}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-lg-6">
                <div className="form-group">
                  <label htmlFor="youtubeLink">YouTube Link</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter YouTube Link..."
                    name="youtubeLink"
                    value={handleSave.values.youtubeLink}
                    onChange={handleSave.handleChange}
                    onBlur={handleSave.handleBlur}
                  />
                  {handleSave.touched.youtubeLink &&
                    handleSave.errors.youtubeLink && (
                      <div className="mt-1 text-sm text-red-500">
                        {handleSave.errors.youtubeLink}
                      </div>
                    )}
                </div>
              </div>

              <div className="col-lg-6">
                <div className="form-group">
                  <label htmlFor="fullname">
                    Full Name <span className="must-fill">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="Enter Your Full Name..."
                    name="fullName"
                    value={handleSave.values.fullName}
                    onChange={(e) => {
                      handleSave.handleChange(e);
                      const slug = e.target.value
                        .toLowerCase()
                        .trim()
                        .replace(/[.,/#!$%^&*;:{}=\-_`~()@+?><[\]|"'’]/g, "")
                        .replace(/\s+/g, "-");
                      handleSave.setFieldValue("slug", slug);
                    }}
                    onBlur={handleSave.handleBlur}
                  />
                  {handleSave.touched.fullName &&
                    handleSave.errors.fullName && (
                      <div className="mt-1 text-sm text-red-500">
                        {handleSave.errors.fullName}
                      </div>
                    )}
                </div>
              </div>

              <div className="col-lg-6">
                <div className="form-group">
                  <label htmlFor="id">
                    Student ID <span className="must-fill">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="Enter Your Student ID..."
                    name="studentId"
                    value={handleSave.values.studentId}
                    onChange={handleSave.handleChange}
                    onBlur={handleSave.handleBlur}
                  />
                  {handleSave.touched.studentId &&
                    handleSave.errors.studentId && (
                      <div className="mt-1 text-sm text-red-500">
                        {handleSave.errors.studentId}
                      </div>
                    )}
                </div>
              </div>

              <div className="col-lg-6">
                <div className="form-group">
                  <label htmlFor="email">
                    Email <span className="must-fill">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    className="form-control"
                    placeholder="Enter Your Email..."
                    name="email"
                    value={handleSave.values.email}
                    onChange={handleSave.handleChange}
                    onBlur={handleSave.handleBlur}
                  />
                  {handleSave.touched.email && handleSave.errors.email && (
                    <div className="mt-1 text-sm text-red-500">
                      {handleSave.errors.email}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-lg-6">
                <div className="form-group ">
                  <label htmlFor="mobile">Mobile No</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Your Mobile Number..."
                    name="phoneNumber"
                    value={handleSave.values.phoneNumber}
                    onChange={handleSave.handleChange}
                    onBlur={handleSave.handleBlur}
                  />
                  {handleSave.touched.phoneNumber &&
                    handleSave.errors.phoneNumber && (
                      <div className="mt-1 text-sm text-red-500">
                        {handleSave.errors.phoneNumber}
                      </div>
                    )}
                </div>
              </div>

              <div className="col-lg-6">
                <div className="form-group icon-position">
                  <label htmlFor="semester">Semester</label>
                  <select
                    className="form-control"
                    name="semester"
                    defaultValue={""}
                    value={handleSave.values.semester}
                    onChange={handleSave.handleChange}
                    onBlur={handleSave.handleBlur}
                  >
                    <option className="light-text" value="selection">
                      ----Select Your Current Semester----
                    </option>
                    {semesters?.map((semester) => (
                      <option key={semester?.id} value={semester?.title}>
                        {semester?.title}
                      </option>
                    ))}
                  </select>
                  <i className="fa-solid fa-chevron-down dd-icon"></i>
                  {handleSave.touched.semester &&
                    handleSave.errors.semester && (
                      <div className="text-sm text-red-500">
                        {handleSave.errors.semester}
                      </div>
                    )}
                </div>
              </div>

              <div className="col-lg-6">
                <div className="form-group">
                  <label htmlFor="email">Earned Credits</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Your Earned Credits..."
                    name="earnedCredit"
                    value={handleSave.values.earnedCredit}
                    onChange={handleSave.handleChange}
                    onBlur={handleSave.handleBlur}
                  />
                  {handleSave.touched.earnedCredit &&
                    handleSave.errors.earnedCredit && (
                      <div className="mt-1 text-sm text-red-500">
                        {handleSave.errors.earnedCredit}
                      </div>
                    )}
                </div>
              </div>

              <div className="col-lg-6">
                <div className="form-group">
                  <label htmlFor="cgpa">CGPA</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Your CGPA..."
                    name="cgpa"
                    value={handleSave.values.cgpa}
                    onChange={handleSave.handleChange}
                    onBlur={handleSave.handleBlur}
                  />
                  {handleSave.touched.cgpa && handleSave.errors.cgpa && (
                    <div className="mt-1 text-sm text-red-500">
                      {handleSave.errors.cgpa}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-lg-6">
                <div className="form-group">
                  <label htmlFor="joining-sem">Joining Semester</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Your Joining Semester..."
                    name="joiningSemeser"
                    value={handleSave.values.joiningSemeser}
                    onChange={handleSave.handleChange}
                    onBlur={handleSave.handleBlur}
                  />
                  {handleSave.touched.joiningSemeser &&
                    handleSave.errors.joiningSemeser && (
                      <div className="mt-1 text-sm text-red-500">
                        {handleSave.errors.joiningSemeser}
                      </div>
                    )}
                </div>
              </div>

              <div className="col-lg-6">
                <div className="form-group icon-position">
                  <label htmlFor="blood-grp">Blood Group</label>
                  <select
                    className="form-control"
                    name="bloodGroup"
                    defaultValue={""}
                    value={handleSave.values.bloodGroup.toString()}
                    onChange={handleSave.handleChange}
                    onBlur={handleSave.handleBlur}
                  >
                    <option value="selection">
                      ----Select Your Blood Group----
                    </option>
                    <option value="A+">A Positive (A+)</option>
                    <option value="O+">A Negative (A-)</option>
                    <option value="B+">B Positive (B+)</option>
                    <option value="B-">B Negative (B-)</option>
                    <option value="AB+">AB Positive (AB+)</option>
                    <option value="AB-">AB Negative (AB-)</option>
                    <option value="O+">O Positive (O+)</option>
                    <option value="O-">O Negative (O-)</option>
                  </select>
                  <i className="fa-solid fa-chevron-down dd-icon"></i>
                  {handleSave.touched.bloodGroup &&
                    handleSave.errors.bloodGroup && (
                      <div className="mt-1 text-sm text-red-500">
                        {handleSave.errors.bloodGroup}
                      </div>
                    )}
                </div>
              </div>

              <div className="col-lg-6 row g-3 my-3">
                <div className="form-group">
                  <label className="mb-2 skills" htmlFor="skill">
                    Skills
                  </label>
                  {skills?.map((skill) => (
                    <div
                      key={skill.id}
                      className="form-check form-check-inline"
                    >
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`skill-${skill.id}`}
                        value={skill.id}
                        checked={
                          handleSave.values.skillId?.includes(skill.id) || false
                        }
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          const currentSkills = handleSave.values.skillId || [];

                          if (isChecked) {
                            // Add skill if checked
                            handleSave.setFieldValue("skillId", [
                              ...currentSkills,
                              skill.id,
                            ]);
                          } else {
                            // Remove skill if unchecked
                            handleSave.setFieldValue(
                              "skillId",
                              currentSkills.filter((id) => id !== skill.id)
                            );
                          }
                        }}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`skill-${skill.id}`}
                      >
                        {skill?.title}
                      </label>
                    </div>
                  ))}

                  {handleSave.touched.skillId && handleSave.errors.skillId && (
                    <div className="mt-1 text-sm text-red-500">
                      {handleSave.errors.skillId.toString()}
                    </div>
                  )}
                </div>
              </div>

              <div className="description-text col-lg-12">
                <div className="form-group">
                  <label htmlFor="achievements" className="mb-2">
                    Achievements
                  </label>
                  <textarea
                    className="form-control"
                    id="feedback"
                    rows={5}
                    placeholder="Please Share Your Achievements..."
                    name="achievements"
                    value={handleSave.values.achievements}
                    onChange={handleSave.handleChange}
                    onBlur={handleSave.handleBlur}
                  ></textarea>
                  {handleSave.touched.achievements &&
                    handleSave.errors.achievements && (
                      <div className="mt-1 text-sm text-red-500">
                        {handleSave.errors.achievements}
                      </div>
                    )}
                </div>
              </div>

              <div className="description-text col-lg-12">
                <div className="form-group">
                  <label htmlFor="hobby" className="mb-2">
                    Hobby
                  </label>
                  <textarea
                    className="form-control"
                    id="feedback"
                    rows={5}
                    placeholder="Please Share Your Hobbies..."
                    name="hobby"
                    value={handleSave.values.hobby}
                    onChange={handleSave.handleChange}
                    onBlur={handleSave.handleBlur}
                  ></textarea>
                  {handleSave.touched.hobby && handleSave.errors.hobby && (
                    <div className="mt-1 text-sm text-red-500">
                      {handleSave.errors.hobby}
                    </div>
                  )}
                </div>
              </div>

              <div className="description-text col-lg-12">
                <div className="form-group">
                  <label htmlFor="class-routine" className="mb-2">
                    Class Routine
                  </label>
                  <textarea
                    className="form-control"
                    id="feedback"
                    rows={5}
                    placeholder="Provide Your Class Routine..."
                    name="classRoutine"
                    value={handleSave.values.classRoutine}
                    onChange={handleSave.handleChange}
                    onBlur={handleSave.handleBlur}
                  ></textarea>
                  {handleSave.touched.classRoutine &&
                    handleSave.errors.classRoutine && (
                      <div className="mt-1 text-sm text-red-500">
                        {handleSave.errors.classRoutine}
                      </div>
                    )}
                </div>
              </div>

              <div className="form-group registrar-btn-wrapper">
                <button className="registrar-btn" type="submit">
                  Registrar{" "}
                  <Icon icon="majesticons:arrow-right" width="24" height="24" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClubMemberForm;
