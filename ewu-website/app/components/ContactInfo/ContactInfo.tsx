"use client";

import "./ContactInfo.scss";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { usePageData } from "@lib/hooks/usePageData";
import { contactInfoActions } from "@lib/slices/contactInfo/contactInfo.slice";
import { useEffect } from "react";

export function ContactInfo() {
  const { page } = usePageData();

  const dispatch = useAppDispatch();

  // const searchParams = useSearchParams();
  // const pageParams = searchParams.get("pageId");

  const contactInfo = useAppSelector(
    (state) => state.contactInfo.getContactInfoResponse?.findAll,
  );

  useEffect(() => {
    dispatch(
      contactInfoActions.getContactInfo({
        request: {
          page: 1,
          limit: 500,
        },
      }),
    );
  }, [dispatch]);

  let contactData = contactInfo?.find(
    (contact) => contact?.pageId.toString() === page?.id.toString(),
  );

  return (
    <>
      {contactData && (
        <div className="contact-info ">
          <div className="info">
            <h3>
              <Icon
                className="info-icon"
                icon="gis:location-poi"
                width="35"
                height="35"
              />{" "}
              Postal Address:
            </h3>
            <p>{contactData?.address}</p>
            <hr />
          </div>

          <div className="info">
            <h3>
              <Icon
                className="info-icon"
                icon="bi:phone"
                width="35"
                height="35"
              />
              Phone
            </h3>
            <p>{contactData?.primaryPhone}</p>
            <hr />
          </div>

          <div className="info">
            <h3>
              <Icon
                className="info-icon"
                icon="streamline:customer-support-1-solid"
                width="35"
                height="35"
              />
              Hot Line
            </h3>
            <p>{contactData?.primaryHotline}</p>
            <hr />
          </div>

          <div className="info">
            <h3>
              <Icon
                className="info-icon"
                icon="ix:e-mail-filled"
                width="35"
                height="35"
              />
              Email
            </h3>
            <p>{contactData?.primaryEmail}</p>
            <hr />
          </div>

          <div className="info">
            <h3>
              <Icon
                icon="streamline:web"
                className="info-icon"
                width="35"
                height="35"
              />
              Web
            </h3>
            <a href={contactData?.link} target="_blank">
              {contactData?.link}
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default ContactInfo;
