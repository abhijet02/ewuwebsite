import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { contactInfoActions } from "@lib/slices/contactInfo/contactInfo.slice";
import { useEffect } from "react";

export function useContactInfoData() {
  const dispatch = useAppDispatch();

  const contactInfos = useAppSelector(
    (state) => state.contactInfo.getContactInfoResponse?.findAll
  );

  useEffect(() => {
    dispatch(
      contactInfoActions.getContactInfo({
        request: {
          page: 1,
          limit: 100,
        },
      })
    );
  }, [dispatch]);

  const defaultContactInfo = contactInfos?.find((c) => c?.pageId === 0);

  return { contactInfos, defaultContactInfo };
}
