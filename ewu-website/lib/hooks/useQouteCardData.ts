import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { pageActions } from "@lib/slices/page/page.slice";
import { quoteActions } from "@lib/slices/quote/quote.slice";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function useQouteCardData() {
    const dispatch = useAppDispatch();
    const pathName = usePathname();
    const searchParams = useSearchParams();

    const pages = useAppSelector((state) => state.page.getPagesResponse?.pages);
    const quotes = useAppSelector(
        (state) => state.quote.getQuotesResponse?.Quotes
    );
    const pageParams = searchParams.get("pageId");
    const pageId =
    pages?.find((page) => page.link === pathName)?.id ||
    pages?.find((page) => page.link.split("?")[0] === pathName)?.id;


    useEffect(()=>{
       dispatch(
            pageActions.getPages({
              request: { page: 0, limit: 100000 },
            })
          );
        dispatch(
                quoteActions.getQuotes({
                request: { page: 1, limit: 100 },
            })
        );
    },[dispatch])

    const pageQuotes = quotes?.filter((quote) => quote.pageId === pageId) || [];

    
    return { pageQuotes }

}