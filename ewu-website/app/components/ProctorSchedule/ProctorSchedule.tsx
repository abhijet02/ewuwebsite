"use client";

import React from "react";
import "./ProctorSchedule.scss";
import { useSelector } from "react-redux";
import { RootState } from "@lib/root.reducer";
import { useProctorScheduleData } from "@lib/hooks/useProctorScheduleData";

const ProctorSchedule: React.FC = () => {
  const { sortedProctorMembersByDay, headProctor, supportMembers } =
    useProctorScheduleData();

  const isStatic = useSelector((state: RootState) => state.accessibility.mode);

  return (
    <section className="proctor-schedule-body">
      <div className="container">
        <h2>Proctor Schedule</h2>
        <div className="flex justify-center mt-5">
          {headProctor?.map((item, index) => (
            <div key={item.id} className="body-header-content" style={{}}>
              <p className="name">{item.name}</p>
              <p>{item.designation}</p>
              <p>
                Ext-{item.ext} | {item.location}
              </p>
              <p>
                Email: {""}
                {item.email}
              </p>
            </div>
          ))}
        </div>

        <div
          {...(!isStatic ? { "data-aos": "fade-up" } : {})}
          className="academic-partner-main"
        >
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Day</th>
                  <th scope="col">Name</th>
                  <th scope="col">Designation</th>
                  <th scope="col">Ext.</th>
                  <th scope="col">Location</th>
                  <th scope="col">Email</th>
                </tr>
              </thead>
              <tbody>
                {sortedProctorMembersByDay &&
                sortedProctorMembersByDay.length > 0 ? (
                  sortedProctorMembersByDay?.map((item, index) => (
                    <tr key={index} style={{ fontSize: "14px" }}>
                      <td>{item.day}</td>
                      <td>{item.name}</td>
                      <td>{item.designation}</td>
                      <td>{item.ext}</td>
                      <td>{item.location}</td>
                      <td>{item.email}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6}>No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-5">
            <div className="text-center head-proctor-info">
              <p className="name">Supporting Staff</p>
            </div>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Designation</th>
                    <th scope="col">Ext.</th>
                    <th scope="col">Location</th>
                    <th scope="col">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {supportMembers && supportMembers.length > 0 ? (
                    supportMembers?.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.designation}</td>
                        <td>{item.ext}</td>
                        <td>{item.location}</td>
                        <td>{item.email}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6}>No data available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ProctorSchedule;
