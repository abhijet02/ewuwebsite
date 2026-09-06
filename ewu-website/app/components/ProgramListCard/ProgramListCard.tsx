"use client";

import "./ProgramListCard.scss";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { programCategoryActions } from "@lib/slices/programCategory/programCategory.slice";
import Link from "next/link";
import { FC, useEffect } from "react";
import { programActions } from "@lib/slices/program/program.slice";
import { useParams } from "next/navigation";
import { useFacultyData } from "@lib/hooks/useFacultyData";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
const ProgramListCard: FC = () => {
  const { faculty } = useFacultyData();

  const dispatch = useAppDispatch();
  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  const params = useParams();

  const degrees = useAppSelector(
    (state) =>
      state.programCategory.getProgramCategoriesResponse?.programCategories
  );

  const programs = useAppSelector(
    (state) => state.program.getProgramsResponse?.programs
  );

  useEffect(() => {
    dispatch(
      programCategoryActions.getProgramCategories({
        request: {
          page: 1,
          limit: 500,
        },
      })
    );

    dispatch(
      programActions.getPrograms({
        request: {
          page: 1,
          limit: 500,
        },
      })
    );
  }, [dispatch]);

  const paramwiseDegree = degrees?.filter(
    (degree) => degree?.title.toLowerCase() === params?.id?.toString()
  );

  const filteredDegree = paramwiseDegree?.length ? paramwiseDegree : degrees;

  const filteredPrograms = programs?.filter((program) => {
    return program.facultyId === faculty?.id;
  });

  const renderedPrograms = filteredPrograms || programs;

  return (
    <>
      <section className="choose-study-level">
        <div
          {...(!isStatic ? { "data-aos": "zoom-in" } : {})}
          className="container"
        >
          <div className="header-with-subtitle">
            <p>Welcome to East West University</p>
            <h2>Choose your level of study</h2>
          </div>
          <div className="choose-study-level-content">
            {filteredDegree &&
              filteredDegree.map((degree) => (
                <div
                  className="choose-study-level-main undergraduate-part"
                  key={degree?.id}
                >
                  <h2 className="choose-study-level-title">{degree?.title}</h2>
                  <ul>
                    {programs &&
                      renderedPrograms
                        .filter((prog) => prog.programCategoryId === degree.id)
                        .map((item) => (
                          <li key={item.id}>
                            <Link href={`/pages/program-details/${item.id}`}>
                              {item.title}
                              <Icon
                                icon="si:arrow-right-duotone"
                                width="26"
                                height="26"
                              />
                            </Link>
                          </li>
                        ))}
                  </ul>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProgramListCard;
