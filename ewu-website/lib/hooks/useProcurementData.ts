import { useAppDispatch, useAppSelector } from "@lib/hooks";
import {
  Publish,
  YesOrNo,
} from "@lib/services/procurement/procurement.service.type";
import { procurementActions } from "@lib/slices/procurement/procurement.slice";
import { useEffect } from "react";

export function useProcurementData() {
  const dispatch = useAppDispatch();

  const procurements = useAppSelector(
    (state) => state.procurement.getProcurementsResponse?.procurements
  );

  useEffect(() => {
    dispatch(
      procurementActions.getProcurements({
        request: {
          page: 1,
          limit: 10000,
        },
      })
    );
  }, [dispatch]);

  const procurementsByYear = procurements?.reduce((acc, item) => {
    const year = parseInt(
      new Date(item.publishDate?.toString()).getFullYear().toString()
    );
    if (!acc[year]) acc[year] = [];
    acc[year].push(item);
    return acc;
  }, {} as Record<number, typeof procurements>);

  const archivedProcurements = procurements?.filter(
    (item) =>
      item.isPublished === Publish.YES && item.isArchived === YesOrNo.YES
  );

  return {
    procurements,
    procurementsByYear,
    archivedProcurements,
  };
}
