import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { officeDocumentActions } from "@lib/slices/OfficeDocument/officeDocument.slice";
import { useEffect } from "react";

export function useOfficeDocumentData() {
  const dispatch = useAppDispatch();

  const officeDocuments = useAppSelector(
    (state) => state.officeDocuments.getOfficeDocumentsResponse?.officeDocuments
  );

  useEffect(() => {
    dispatch(
      officeDocumentActions.getOfficeDocuments({
        request: { page: 1, limit: 10000 },
      })
    );
  }, [dispatch]);

  return { officeDocuments };
}
