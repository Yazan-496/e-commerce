import React, { useEffect, useState } from "react";
import Header from "@/components/Header/desktop";
import Footer from "@/components/Footer/desktop";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import PaymentMethodBody from "../../../components/PaymentMethod/desktop";
import OTP from "../../../components/Account/desktop/Login/OTP";
import ConfirmPhone from "../../../components/PaymentMethod/components/ConfirmPhone";
import store from "../../../store";

const PaymentMethod = () => {
  const dispatch = useDispatch();
  const [endLoad, setEndLoad] = useState(false);
  const [token, setToken] = useState(null);
  const [guest, setGuest] = useState(null);
  const [userData, setUserData] = useState(null);

  const [customerInfo, setCustomerInfo] = useState(null);
  const loading = useSelector((state) => state?.ProductReducer?.loading);
  const mainPageData = useSelector((state) => state.mainReducer.mainPageData);
  const authToken = useSelector((state) => state.AuthReducer.authToken);
  const mainCategories = useSelector(
    (state) => state.mainReducer.mainPageData?.categories
  );
  useEffect(() => {
    if (typeof window !== "undefined") {
      const info = JSON.parse(localStorage.getItem("CUSTOMER_INFO_STORAGE"));
      console.log(info);
      setCustomerInfo(
        info?.customerInfo?.data["starting-setting"][
          "default_country_dial_code"
        ]
      );
    }
  }, []);
  useEffect(() => {
    if (!mainCategories?.length > 0) {
      dispatch({
        type: "GET_SECTIONS_SAGA",
      });
      dispatch({ type: "GET_ITEMS_CART" });
    }
  }, [mainCategories]);
  useEffect(() => {}, [authToken]);
  const product = useSelector((state) => state?.ProductReducer?.Product);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(JSON.parse(localStorage.getItem("TOKEN_LOCAL_STORAGE"))?.token);
      setGuest(JSON.parse(localStorage.getItem("TOKEN_LOCAL_STORAGE"))?.guest);
      setUserData(
        JSON.parse(localStorage.getItem("TOKEN_LOCAL_STORAGE"))?.userData
      );
    }
  }, []);
  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("TOKEN_LOCAL_STORAGE"));
    const info = JSON.parse(localStorage.getItem("CUSTOMER_INFO_STORAGE"));
    setCustomerInfo(
      info?.customerInfo?.data["starting-setting"]["default_country_dial_code"]
    );
    setToken(local?.token);
    setGuest(local?.guest);
    setUserData(local?.userData);

    const unsubscribe = store.subscribe(() => {
      const updatedLocal = JSON.parse(
        localStorage.getItem("TOKEN_LOCAL_STORAGE")
      );
      const updatedInfo = JSON.parse(
        localStorage.getItem("CUSTOMER_INFO_STORAGE")
      );
      if (updatedLocal) {
        setToken(updatedLocal?.token);
        setGuest(updatedLocal?.guest);
        setUserData(updatedLocal?.userData);
        setEndLoad(true);
      }
      if (updatedInfo) {
        setCustomerInfo(
          updatedInfo?.customerInfo?.data["starting-setting"][
            "default_country_dial_code"
          ]
        );
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(JSON.parse(localStorage.getItem("TOKEN_LOCAL_STORAGE"))?.token);
      setGuest(JSON.parse(localStorage.getItem("TOKEN_LOCAL_STORAGE"))?.guest);
      setUserData(
        JSON.parse(localStorage.getItem("TOKEN_LOCAL_STORAGE"))?.userData
      );
    }
  }, [authToken]);
  return (
    <>
      <Head>
        <title>Payment Methods</title>
      </Head>
      <div className="relative min-w-[1024px] bg-gray-50">
        <Header checkout={true} categories={mainPageData?.categories} />
        {!guest && token && endLoad ? (
          <div className="mt-[140px]">
            <PaymentMethodBody />
          </div>
        ) : endLoad ? (
          <ConfirmPhone customerInfo={customerInfo} />
        ) : (
          <div className="h-screen bg-gray-50" />
        )}
        <Footer />
      </div>
      <div id="modal-root"></div>
    </>
  );
};

export default PaymentMethod;
