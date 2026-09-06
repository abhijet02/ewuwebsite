import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { YesOrNo } from "@lib/services/slider/slider.service.type";
import { officeMemberActions } from "@lib/slices/officeMember/officeMember.slice";
import { scheduleActions } from "@lib/slices/schedule/schedule.slice";
import { useEffect } from "react";

export function useProctorScheduleData() {
  const dispatch = useAppDispatch();

  const schedules = useAppSelector(
    (state) => state.schedule.getScheduleResponse?.schedules
  );

  const officeMembers = useAppSelector(
    (state) => state.officeMember.getOfficeMembersResponse?.officeMembers
  );

  useEffect(() => {
    dispatch(
      scheduleActions.getSchedules({
        request: {
          page: 1,
          limit: 500,
        },
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      officeMemberActions.getOfficeMembers({
        request: {
          page: 1,
          limit: 500,
        },
      })
    );
  }, [dispatch]);

  // filtering the proctor members
  const proctorMembers = officeMembers?.filter(
    (member) =>
      (member.isProctor === YesOrNo.YES &&
        member.isheadOfOffice === YesOrNo.NO) ||
      member.isAssProctor === YesOrNo.YES
  );

  // sort the proctor members by day
  const sortedProctorMembersByDay = proctorMembers
    ?.map((item) => ({
      ...item,
      day: schedules?.find((schedule) => schedule.officeMemberId === item.id)
        ?.day,
    }))
    .sort((a, b) => {
      const dayOrder = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      return dayOrder.indexOf(a.day || "") - dayOrder.indexOf(b.day || "");
    });

  // filtering the head proctor
  const headProctor = officeMembers?.filter(
    (member) =>
      member.isProctor === YesOrNo.YES && member.isheadOfOffice === YesOrNo.YES
  );

  // filtering the support members
  const supportMembers = officeMembers?.filter(
    (member) => member.isSupportMember === YesOrNo.YES
  );

  return { schedules, sortedProctorMembersByDay, headProctor, supportMembers };
}
