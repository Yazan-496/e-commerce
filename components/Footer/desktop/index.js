import styles from "@/styles/Home.module.css";
import Link from "@/helpers/Link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { store } from "@/store";
import { useTranslation } from "react-i18next";
const Footer = (props) => {
  const { t, i18n } = useTranslation("translation");
  const company = [
    {
      id: 1,
      name: t("footer.about_us"),
      selected: 0,
      href: "/information/about-us/",
    },
    {
      id: 2,
      selected: 1,
      name: t("footer.intellectual_property_rights"),
      href: "/information/about-us/intellectual-property-rights",
    },
    {
      id: 3,
      name: t("footer.return_policy"),
      selected: 3,
      href: "/information/return-policy/",
    },
    {
      id: 4,
      name: t("footer.terms"),
      selected: 0,
      href: "/information/terms/",
    },

    {
      id: 5,
      name: t("footer.sitemap"),
      selected: 4,
      href: "/information/site-map/",
    },
  ];
  const support = [
    {
      id: 6,
      name: t("footer.shipping_delivery"),
      selected: 0,
      href: "/information/shipping-delivery/",
    },
    {
      id: 7,
      name: t("footer.return_policy"),
      selected: 0,
      href: "/information/return-policy/",
    },
    {
      id: 8,
      name: t("footer.tracking_order"),
      selected: 3,
      href: "/information/traking-order/",
    },
    {
      id: 9,
      name: t("footer.payment_methods"),
      selected: 0,
      href: "/information/payment-methods/",
    },
    {
      id: 10,
      name: t("footer.pre_order_guidance"),
      selected: 0,
      href: "/information/pre-order-guidance/",
    },
    {
      id: 11,
      name: t("footer.about_wallet"),
      selected: 0,
      href: "/information/about-credit-wallet/",
    },
    {
      id: 12,
      name: t("footer.influencer_program"),
      selected: 0,
      href: "/information/influencer-program/",
    },
    {
      id: 13,
      name: t("footer.affiliate_program"),
      selected: 0,
      href: "/information/affiliate-program/",
    },
  ];
  const service = [
    {
      id: 14,
      name: t("footer.sms_terms"),
      selected: 0,
      href: "/information/sms-terms/",
    },
    {
      id: 15,
      name: t("footer.customer_reviews"),
      selected: 0,
      href: "/information/customer-reviews/",
    },
    {
      id: 16,
      name: t("footer.contact_us"),
      selected: 0,
      href: "/information/contact-us/",
    },
    {
      id: 17,
      name: t("footer.how_to_choose_your_size"),
      selected: 0,
      href: "/information/how-to-choose-your-size/",
    },
    {
      id: 18,
      name: t("footer.how_to_track_my_order"),
      selected: 0,
      href: "/information/how-to-track-my-order/",
    },
    { id: 16, name: t("footer.faqs"), selected: 0, href: "/information/faqs/" },
  ];
  const [currentWidth, setCurrent] = useState(0);
  let loading = useSelector((store) => store.LanguageReducer.loading);
  const lang_code = store.getState().LanguageReducer.langCode;
  let [translations, setTranslations] = useState(
    store.getState().LanguageReducer.data[lang_code]
  );
  useEffect(() => {
    setTranslations(store.getState().LanguageReducer.data[lang_code]);
  }, [loading]);
  return (
    <>
      <div className="w-full flex justify-center cm-footer py-10">
        <div className="cm-layout-max flex  w-full">
          <div className="flex flex-row justify-between w-full gap-6">
            <div className="flex flex-1 justify-center  overflow-hidden ">
              <div className="w-full overflow-hidden flex flex-col relative gap-y-5">
                {" "}
                <h2
                  className="text-[#222] cm-footer-text-1 truncate"
                  title="COMPANY INFO"
                >
                  {t("footer.company_info")}
                </h2>
                <ul>
                  {company.map((item, i) => {
                    return (
                      <li key={item.id} style={{ cursor: "pointer" }}>
                        <Link href={item.href}>
                          <div className="layout-footer__info-tree-top-content-item">
                            {item.name}
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="flex flex-1 justify-center overflow-hidden ">
              <div className="w-full overflow-hidden flex flex-col relative gap-y-5">
                <h2
                  className="text-[#222] cm-footer-text-1 truncate"
                  title="COMPANY INFO"
                >
                  {t("footer.help_support")}
                </h2>
                <ul>
                  {support.map((item, i) => {
                    return (
                      <li key={item.id} style={{ cursor: "pointer" }}>
                        <Link href={item.href}>
                          <div className="layout-footer__info-tree-top-content-item">
                            {item.name}
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="flex flex-1 justify-center  overflow-hidden ">
              <div className="w-full overflow-hidden flex flex-col relative gap-y-5">
                <h2
                  className="text-[#222] cm-footer-text-1 truncate"
                  title="COMPANY INFO"
                >
                  {t("footer.customer_service")}
                </h2>
                <ul>
                  {service.map((item, i) => {
                    return (
                      <li key={item.id} style={{ cursor: "pointer" }}>
                        <Link href={item.href}>
                          <div className="layout-footer__info-tree-top-content-item">
                            {item.name}
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
