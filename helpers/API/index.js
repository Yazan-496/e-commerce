"use client";

import axios from "axios";
import { CSSTransition } from "react-transition-group";
import { getAuthToken, getLangCode } from "./utils";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const API = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL_1}`, // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// const showNotification = (type, message, description) => {
//   console.log("not");
//   return <Toast message={description} timeout={4000} />;
// };
API.interceptors.request.use(async (config) => {
  const token = await getAuthToken();
  const langCode = await getLangCode();
  config.headers.lang = langCode;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // console.log(token);
  return config;
});

API.interceptors.response.use(
  (response) => {
    // Handle successful responses
    const url = response.config.url;
    if (url.includes("cart") || response?.data?.message?.includes("otp")) {
      const description = response?.data?.message;
      if (description !== "Data Got!") {
        showNotification("success", "Request Successful", description);
        return response;
      }
    }
    return response;
  },
  (error) => {
    console.log(error, "error");
    if (error.code !== "ERR_BAD_REQUEST") {
      if (error?.message === "Network Error") {
        showNotification(
          "success",
          "Request Successful",
          "CHECK INTERNET CONNECTION"
        );
      } else {
        showNotification(
          "error",
          "Request Failed",
          error?.response?.data?.message ||
            "An error occurred during the request."
        );
      }
      return Promise.reject(error);
    }
  }
);

const ToastTransition = ({ closeToast, children, ...props }) => {
  const [Opacity, setOpacity] = useState(true);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacity(false);
      toast.dismiss();
    }, 3000);

    return () => clearTimeout(timer);
  }, [closeToast, children]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setHidden(true);
      toast.dismiss();
    }, 4000);

    return () => clearTimeout(timer);
  }, [Opacity]);
  return (
    <div className="custom-toast">
      {children}
      <style jsx>{`
        .custom-toast {
          position: relative;
          display: ${hidden ? "none" : "flex"};
          align-items: center;
          justify-content: flex-start;
          text-align: left;
          color: #fff;
          padding: 10px;
          border-radius: 4px;
          opacity: ${Opacity ? 1 : 0};
          transition: opacity 300ms;
          width: max-content;
        }
      `}</style>
    </div>
  );
};

const showNotification = (type, message, description) => {
  const Style = {
    position: "fixed",
    zIndex: "111111111111",
    top: "30%",
    left: "50%",
    backgroundColor: "#000",
    color: "#fff",
    padding: "10px",
    borderRadius: "4px",
    opacity: "0.8",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    transform: "translate(-50%, -50%)",
    textAlign: "left",
    width: "max-content",
  };
  const toastProps = {
    type,
    className: "toast",
    toastStyle: Style,
    autoClose: 4000,
    hideProgressBar: true,
    closeOnClick: false,
    newestOnTop: false,
    rtl: false,
    transition: ToastTransition,
    pauseOnHover: false,
    draggable: false,
    progress: false,
  };

  toast(description, { ...toastProps, style: Style });
};
export default API;
