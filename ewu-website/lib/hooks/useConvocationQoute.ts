import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { Publish, StudentsSay } from "@lib/services/studentsSay/studentsSay.service.type";
import { pageActions } from "@lib/slices/page/page.slice";
import { studentsSayActions } from "@lib/slices/studentsSay/studentsSay.slice";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function useConvocationQoute() {
  const dispatch = useAppDispatch();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const pages = useAppSelector((state) => state.page.getPagesResponse?.pages);

    const studentsSays = useAppSelector(
      (state) => state.studentsSay.getStudentsSaysResponse?.allfeedbackOfStudent
    )
      ?.filter((d) => d?.isPublished === Publish.YES)
      .sort((a, b) => a?.order - b?.order);

   const pageId =
    pages?.find((page) => page.link === pathName)?.id ||
    pages?.find((page) => page.link.split("?")[0] === pathName)?.id;

  const page = pages?.find((page) => page.id === pageId);

  useEffect(()=> {
        dispatch(
              studentsSayActions.getStudentsSays({
                request: { page: 1, limit: 500 },
              })
            );
     dispatch(
            pageActions.getPages({
              request: { page: 0, limit: 1000 },
            })
          );

  },[dispatch])

    const pageStudentsSays= studentsSays?.filter(
            (studentsSay: StudentsSay) => studentsSay.pageId === pageId
          ) || [];

    return { pageStudentsSays}

}