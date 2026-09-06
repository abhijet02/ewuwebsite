"use client";

import "./ClubFooter.scss";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePageData } from "@lib/hooks/usePageData";
import Link from "next/link";
import { useClubData } from "@lib/hooks/useClubData";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { useEffect } from "react";
import { hotlineActions } from "@lib/slices/hotline/Hotline.slice";
import {
  useParams,
  usePathname,
  useSearchParams,
} from "next/dist/client/components/navigation";

const ClubsFooter: React.FC = () => {
  const { pages, footers, pageId, pageNews, paramNews } = usePageData();

  const { dynamicStyles } = useClubData();

  const { id } = useParams();
  const { slug } = useParams();

  const pathName = usePathname();
  const searchParams = useSearchParams();
  const pageParams = searchParams.get("pageId");

  const page = pages?.find((page) => page?.link?.toString() === pathName);

  const pageFooter = footers?.find(
    (header) =>
      header?.pageId === page?.id ||
      header?.pageId === page?.contentOf ||
      header?.pageId.toString() === pageParams
  );

  const footer = pageFooter;

  const allNews = [...(pageNews ?? []), ...(paramNews ?? [])];

  const news = Array.from(
    new Map(allNews.map((item) => [item.id, item])).values()
  );

  const date = new Date().getFullYear();

  const dispatch = useAppDispatch();

  const hotlineData = useAppSelector(
    (state) => state.hotline.getHotlineResponse?.hotlines
  );

  useEffect(() => {
    dispatch(
      hotlineActions.getHotline({
        request: {
          page: 1,
          limit: 10000,
        },
      })
    );
  }, [dispatch]);

  return (
    <>
      <footer>
        <div className="club-footer-part" style={dynamicStyles}>
          <div className="container">
            <div className="row">
              <div className="col-lg-5 py-2">
                <div>
                  <div className="footer-logo-img">
                    <Image
                      src={footer?.footerLogoUrl}
                      fill
                      alt="footer-logo-img"
                    />
                  </div>
                  <div className="mt-4">
                    <div className="contact-box">
                      <div>
                        <Icon
                          icon="system-uicons:location"
                          width="26"
                          height="26"
                        />
                      </div>
                      <div>
                        <p>{footer?.footerAddress}</p>
                      </div>
                    </div>
                    <div className="contact-box">
                      <div>
                        <Icon
                          icon="fluent:phone-32-light"
                          width="26"
                          height="26"
                        />
                      </div>
                      <div>
                        <p>{footer?.footerContactUsMobile}</p>
                        <p>{footer?.footerContactUsHotline}</p>
                      </div>
                    </div>
                    <div className="contact-box">
                      <div>
                        <Icon
                          icon="system-uicons:mail"
                          width="26"
                          height="26"
                        />
                      </div>
                      <div>
                        <p>{footer?.footerContactUsEmail}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 py-2">
                {/* <div className="footer-menu">
                  <ul>
                    <li>
                      <a href="#">
                        Grooming Session <span>5</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Competitions <span>5</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Seminars <span>5</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        Workshop <span>5</span>
                      </a>
                    </li>
                  </ul>
                </div> */}
              </div>
              <div className="col-lg-4 py-2">
                <div className="footer-recent-news">
                  <h2>Recent News</h2>
                  <ul>
                    {news &&
                      news?.slice(0, 5).map((news) => (
                        <li key={news.id}>
                          <Link
                            href={`/pages/club-news-details/${news.id}?pageId=${pageId}`}
                          >
                            {news?.label}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-copy-right" style={dynamicStyles}>
          <div className="container">
            <div className="footer-copy-right-part">
              <div>
                <p>
                  &copy; {date} {footer?.footerCopyRightTitle}
                </p>
              </div>
              <div className="copy-right-link">
                <h3>Emergency Hotline</h3>
                {hotlineData?.length > 0 &&
                  hotlineData.map((hotline, index) => (
                    <Link href={hotline?.link} key={index}>
                      <Image
                        src={hotline?.logoLink}
                        width={40}
                        height={40}
                        alt="footer logo"
                      />
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default ClubsFooter;
