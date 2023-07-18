import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { throttle } from "lodash";
import Link from "@/helpers/Link";
import { LoaderLogo } from "@/helpers/Loader/Loading";
import { useDispatch, useSelector } from "react-redux";
import { Transition } from "@headlessui/react";
import ModalFilters from "../../CollectionBody/mobile/ModalFilters";
import ModalSearch from "./ModalSearch";
import { SvgArrowLeft } from "../../svgs";
import { useTranslation } from "react-i18next";
const HeaderCheckout = () => {
  const router = useRouter();
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsSticky(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const [icon, setIcon] = useState(
    "https://www.clearance.ae/storage/company/2023-02-06-63e08deba2852.png"
  );

  const [isMain, setIsMain] = useState(true);
  useEffect(() => {
    // console.log(router);
    return () => {
      router.asPath !== "/" && setIsMain(false);
    };
  }, [router]);
  const [hideHeader, setHideHeader] = useState(false);
  const [itemsInCart, setItemsInCart] = useState([]);
  const shippingCart = useSelector((store) => store.CartReducer.shippingCart);
  const [token, setToken] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(JSON.parse(localStorage.getItem("TOKEN_LOCAL_STORAGE"))?.token);
    }
  }, []);
  const sync = useSelector((store) => store.CartReducer.sync);
  useEffect(() => {
    if (token) {
      // console.log("5");
      dispatch({ type: "GET_ITEMS_CART" });
    }
  }, [token, sync]);
  useEffect(() => {
    if (shippingCart) {
      setItemsInCart(shippingCart?.cart);
    }
  }, [shippingCart, dispatch]);
  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const isScrolledDown = scrollTop > 0;
      setHideHeader(isScrolledDown);
    }, 200);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { t, i18n } = useTranslation("translation");
  return (
    <>
      <header>
        <div
          style={{
            zIndex: 101,
            position: "relative",
            backgroundColor: "white!important",
          }}
        >
          <div className="border border-b-[1px] border-gray-200 p-5 flex items-center justify-between home-nav-bar">
            <Link href="/">
              <a>
                <SvgArrowLeft />
              </a>
            </Link>
            <h1 className="text-xl font-[700]">
              {t("user.order_confirmation")}
            </h1>
            <p />
          </div>
        </div>
      </header>
    </>
  );
};
export default HeaderCheckout;
