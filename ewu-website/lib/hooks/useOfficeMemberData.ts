import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { officeMemberDocumentActions } from "@lib/slices/officeMemberDocument/officeMemberDocument.slice";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useOfficeData } from "./useOfficeData";

export function useOfficeMemberData() {
  const dispatch = useAppDispatch();

  const { offices, officeMembers } = useOfficeData();

  const officeMemberDocuments = useAppSelector(
    (state) =>
      state.officeMemberDocument.getOfficeMemberDocumentsResponse
        ?.officeMemberDocuments
  );

  useEffect(() => {
    dispatch(
      officeMemberDocumentActions.getOfficeMemberDocuments({
        request: {
          page: 1,
          limit: 10000,
        },
      })
    );
  }, [dispatch]);

  const { id } = useParams();

  const officeMember = officeMembers?.find((member) => member.slug === id);

  const document =
    officeMemberDocuments?.filter((d) => d.officeId === officeMember?.id) || [];

  return { offices, officeMembers, officeMember, document };
}
