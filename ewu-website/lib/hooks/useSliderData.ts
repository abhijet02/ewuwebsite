import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { Publish, Slider } from "@lib/services/slider/slider.service.type";
import { pageActions } from "@lib/slices/page/page.slice";
import { sliderActions } from "@lib/slices/slider/slider.slice";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function useSliderData() {
  const dispatch = useAppDispatch();
  const pathName = usePathname();

  const pages = useAppSelector((state) => state.page.getPageByLinkResponse?.pageByLink);

  const sliders = useAppSelector(
    (state) => state.slider.getSlidersResponse?.sliders
  )?.filter((s) => s?.isPublished === Publish.YES);

  useEffect(() => {
    dispatch(
      sliderActions.getSliders({
        request: { page: 1, limit: 1000 },
      })
    );
    if(pathName){
        dispatch(
          pageActions.getPageByLink({
            request: { link: pathName}
          })
        )
      }
  }, [dispatch]);

  const pageId =
    pages?.find((page) => page.link === pathName)?.id ||
    pages?.find((page) => page.link.split("?")[0] === pathName)?.id;

  const page = pages?.find((page) => page.id === pageId);

  const pageSliders = sliders
    ?.filter((slider: Slider) => slider.pageId === pageId)
    .sort((a, b) => a.id - b.id);

  return { pageSliders, page };
}
