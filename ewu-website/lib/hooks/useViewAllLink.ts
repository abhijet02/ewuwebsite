import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { Publish, Slider } from "@lib/services/slider/slider.service.type";
import { componentActions } from "@lib/slices/component_/component.slice";
import { pageActions } from "@lib/slices/page/page.slice";
import { sliderActions } from "@lib/slices/slider/slider.slice";
import { viewAllActions } from "@lib/slices/viewAll/viewAll.slice";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function useViewAllLink({ componentName }) {
  const dispatch = useAppDispatch();
  const pathName = usePathname();

  const pages = useAppSelector((state) => state.page.getPagesResponse?.pages);

  const components = useAppSelector(
    (state) => state.component.getComponentResponse?.components
  );

  const viewAlls = useAppSelector(
    (state) => state.viewAll.getViewAllsResponse?.viewAlls
  );

  useEffect(() => {
    dispatch(
      pageActions.getPages({
        request: {
          page: 0,
          limit: 1000,
        },
      })
    );

    dispatch(
      componentActions.getComponent({
        request: {
          page: 1,
          limit: 10000,
        },
      })
    );

    dispatch(
      viewAllActions.getViewAlls({
        request: {
          page: 1,
          limit: 10000,
        },
      })
    );
  }, [dispatch]);

  const page =
    pages?.find((page) => page.link === pathName) ||
    pages?.find((page) => page.link.split("?")[0] === pathName);

  const component = components?.find(
    (component) => component.label === componentName
  );

  const link = viewAlls?.find(
    (viewAll) =>
      viewAll.pageId === page?.id && viewAll.componentId === component?.id
  )?.viewAllLink;

  return link;
}
