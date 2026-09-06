import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { YesOrNo } from "@lib/services/slider/slider.service.type";
import { officeActions } from "@lib/slices/office/office.slice";
import { officeMemberActions } from "@lib/slices/officeMember/officeMember.slice";
import { useParams, usePathname } from "next/navigation";
import { useEffect } from "react";

export function useOfficeData() {
  const dispatch = useAppDispatch();

  const offices = useAppSelector(
    (state) => state.office.getOfficesResponse?.offices
  );

  const officeMembers = useAppSelector(
    (state) => state.officeMember.getOfficeMembersResponse?.officeMembers
  )
    ?.filter((m) => m.isPublished === YesOrNo.YES)
    .sort((a, b) => {
      if (a.order > 0 && b.order > 0) {
        return a.order - b.order; // both have order > 0, sort normally
      } else if (a.order > 0 && b.order === 0) {
        return -1; // a goes first
      } else if (a.order === 0 && b.order > 0) {
        return 1; // b goes first
      } else {
        return 0; // both order === 0, keep original relative order
      }
    });

  useEffect(() => {
    dispatch(
      officeActions.getOffices({
        request: {
          page: 1,
          limit: 500,
        },
      })
    );

    dispatch(
      officeMemberActions.getOfficeMembers({
        request: {
          page: 1,
          limit: 500,
        },
      })
    );
  }, [dispatch]);

  const { slug } = useParams();

  const path = usePathname();
  const parts = path.split("/");
  const iqac = parts.pop();

  const office = offices?.find(
    (office) => office.slug == slug || office.slug == iqac
  );

  const filteredOfficeMembers = officeMembers?.filter(
    (officeMember) => officeMember.officeId === office?.id
  );

  const heads = filteredOfficeMembers?.filter(
    (member) => member.isheadOfOffice === YesOrNo.YES
  );

  const members = filteredOfficeMembers?.filter(
    (member) => member.isheadOfOffice === YesOrNo.NO
  );
const memberSecretery = filteredOfficeMembers?.filter(
    (member) => member.isMemberSecretary === YesOrNo.YES
  );
  const departmentalOffices = offices?.filter(
    (office) => office.isDepartmental === YesOrNo.YES
  );

  const filteredOffices = offices?.filter(
    (office) => office.isDepartmental === YesOrNo.NO
  );

  return {
    offices,
    officeMembers,
    office,
    filteredOfficeMembers,
    heads,
    members,
    departmentalOffices,
    filteredOffices,
    memberSecretery
  };
}
