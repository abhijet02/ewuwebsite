"use client";

import "./FacultyMemberSearch.scss";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper/types";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import { FacultyPerson } from "@lib/services/facultyPerson/facultyPerson.service.type";
import { useDepartmentData } from "@lib/hooks/useDepartmentData";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import Placeholder_Person from "@/app/assets/Placeholder_Person.jpg";
import { useViewAllLink } from "@lib/hooks/useViewAllLink";

const FacultyMemberSearch: React.FC = () => {
  const { facultys, departments, designations, facultyPersons } =
    useDepartmentData();
  const viewAllLink = useViewAllLink({ componentName: "FacultyMemberSearch" });
  console.log("viewAllLink", viewAllLink);

  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  const swiperRef = useRef<SwiperClass | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFacultyId, setSelectedFacultyId] = useState(0);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(0);
  const [filteredfacultyPersons, setFilteredfacultyPersons] = useState<
    FacultyPerson[]
  >([]);
  const [hasFiltered, setHasFiltered] = useState(false);

  // Get departments filtered by selected faculty
  const filteredDepartments = departments?.filter(
    (dept) => selectedFacultyId === 0 || dept.facultyId === selectedFacultyId,
  );

  // Handle filter button click
  const handleFilter = () => {
    setHasFiltered(true);

    let filtered = facultyPersons || [];

    // If no faculty and no department selected, show no facultyPersons
    if (selectedFacultyId === 0 && selectedDepartmentId === 0 && !searchTerm) {
      setFilteredfacultyPersons([]);
      return;
    }

    // Filter by search term if provided
    if (searchTerm) {
      filtered = filtered.filter((facultyPerson) =>
        facultyPerson.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Filter by only faculty if selected
    if (selectedFacultyId > 0) {
      filtered = filtered.filter(
        (facultyPerson) => facultyPerson.facultyId === selectedFacultyId,
      );
    }

    // Filter by only department if selected
    if (selectedDepartmentId > 0) {
      filtered = filtered.filter(
        (facultyPerson) => facultyPerson.departmentId === selectedDepartmentId,
      );
    }
    setFilteredfacultyPersons(filtered);
  };

  const handleClear = () => {
    setSelectedFacultyId(0);
    setSelectedDepartmentId(0);
    setSearchTerm("");
    setHasFiltered(false);
    setFilteredfacultyPersons(facultyPersons || []);
  };

  // Initialize the list of all facultyPersons
  useEffect(() => {
    if (
      facultyPersons &&
      facultyPersons?.length > 0 &&
      filteredfacultyPersons?.length === 0
    ) {
      setFilteredfacultyPersons(facultyPersons);
    }
  }, [facultyPersons, facultyPersons?.length, filteredfacultyPersons?.length]);

  // Reset department selection when faculty changes
  useEffect(() => {
    setSelectedDepartmentId(0);
  }, [selectedFacultyId]);

  return (
    <>
      <section className="faculty-member-part">
        <div className="container">
          <div
            {...(!isStatic ? { "data-aos": "fade-down" } : {})}
            className="faculty-member-title"
          >
            <h2>Search Faculty Member</h2>
            <Link href={viewAllLink || ""}>
              View All
              <Icon icon="si:arrow-right-duotone" width="20" height="20" />
            </Link>
          </div>
          <div
            {...(!isStatic ? { "data-aos": "fade-down" } : {})}
            className="faculty-member-search"
          >
            <div className="faculty-member-search-input">
              <input
                type="text"
                placeholder="Search By Name"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
              <select
                className="form-select"
                aria-label="Default select example"
                value={selectedFacultyId}
                onChange={(e) =>
                  setSelectedFacultyId(
                    parseInt((e.target as HTMLSelectElement).value),
                  )
                }
              >
                <option value={0} disabled>
                  Select a Faculty
                </option>
                {facultys &&
                  facultys.length &&
                  facultys?.map((faculty) => (
                    <option key={faculty.id} value={faculty.id}>
                      {faculty.name}
                    </option>
                  ))}
              </select>

              <select
                className="form-select"
                aria-label="Default select example"
                value={selectedDepartmentId}
                onChange={(e) =>
                  setSelectedDepartmentId(
                    parseInt((e.target as HTMLSelectElement).value),
                  )
                }
              >
                <option value={0} disabled>
                  Select a Department
                </option>
                {filteredDepartments?.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                ))}
              </select>

              <button onClick={handleFilter}>
                <Icon icon="mdi:filter-outline" width="22" height="22" />
                Filter
              </button>
              <button onClick={handleClear}>
                <Icon icon="mdi:close-circle-outline" width="22" height="22" />
                Clear
              </button>
            </div>
          </div>

          {filteredfacultyPersons.length > 0 ? (
            <div {...(!isStatic ? { "data-aos": "fade-up" } : {})}>
              <div className="custom-arrow">
                <button
                  className="custom-arrow left-arrow"
                  onClick={() => swiperRef.current?.slidePrev()}
                >
                  <Icon icon="mynaui:arrow-left" width="22" height="22" />
                </button>
                <button
                  className="custom-arrow right-arrow"
                  onClick={() => swiperRef.current?.slideNext()}
                >
                  <Icon icon="mynaui:arrow-right" width="22" height="22" />
                </button>
              </div>
              <Swiper
                pagination={false}
                navigation={false}
                slidesPerView={1}
                spaceBetween={20}
                modules={[Pagination, Navigation]}
                loop={filteredfacultyPersons.length > 1}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                breakpoints={{
                  567: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                  },
                  1440: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                  },
                }}
                className="mySwiper banner-swiper"
              >
                {filteredfacultyPersons &&
                  filteredfacultyPersons.length &&
                  filteredfacultyPersons.map((item) => (
                    <SwiperSlide key={item?.id}>
                      <div className="faculty-teachers-box">
                        <div className="faculty-teachers-img">
                          <div style={{ height: "420px" }}>
                            <Image
                              src={item?.photo || Placeholder_Person}
                              fill
                              alt={`${item?.name}'s Photo`}
                              style={{
                                objectFit: "cover",
                                objectPosition: "top",
                              }}
                            />
                          </div>
                          <div className="social-links">
                            <div className="social-icon">
                              {item?.liLink && (
                                <a href={item?.liLink}>
                                  <Icon
                                    icon="ri:linkedin-fill"
                                    width="18"
                                    height="18"
                                  />
                                </a>
                              )}
                              {item?.gsLink && (
                                <a href={item?.gsLink}>
                                  <Icon
                                    icon="academicons:google-scholar"
                                    width="20"
                                    height="20"
                                  />
                                </a>
                              )}
                            </div>
                            <Link
                              href={`/pages/faculty-member/${item.slug}`}
                              style={{ border: "none" }}
                            >
                              <button
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  color: "#fff",
                                }}
                              >
                                Details
                                <Icon
                                  icon="si:arrow-right-duotone"
                                  width="24"
                                  height="24"
                                  style={{ color: "#fff" }}
                                />
                              </button>
                            </Link>
                          </div>
                        </div>
                        <div className="faculty-teachers-info">
                          <div>
                            <p>
                              {
                                facultys?.find(
                                  (faculty) => faculty.id === item.facultyId,
                                )?.name
                              }
                            </p>
                            <h2>{item.name}</h2>
                            <p>
                              {
                                designations?.find(
                                  (designation) =>
                                    designation.id.toString() ===
                                    item.designation,
                                )?.designation
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          ) : (
            hasFiltered && (
              <div
                {...(!isStatic ? { "data-aos": "fade-up" } : {})}
                className="no-results-found"
              >
                <></>
              </div>
            )
          )}
        </div>
      </section>
    </>
  );
};

export default FacultyMemberSearch;
