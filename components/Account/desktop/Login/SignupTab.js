import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  SvgArrowLeft,
  SvgCheckbox,
  SvgLoader,
  WhatsappSvg,
} from "../../../svgs";
import { useDispatch, useSelector } from "react-redux";
import { PiEyeClosed, PiEyeThin } from "react-icons/pi";
import { RiMessage2Line } from "react-icons/ri";

const SignupTab = ({ onNextOTP, setData, customerInfo, setIsWhatsapp }) => {
  const { t, i18n } = useTranslation("translation");

  const dispatch = useDispatch();
  const validateNumber = useSelector(
    (state) => state.AuthReducer?.validateNumber
  );
  const validateEmail = useSelector(
    (state) => state.AuthReducer?.validateEmail
  );
  const authLoading = useSelector((state) => state.AuthReducer?.authLoading);
  const verificationId = useSelector(
    (state) => state.AuthReducer?.verificationId
  );
  const [formData, setFormData] = useState({
    email: null,
    phoneNumber: null,
    firstName: null,
    lastName: null,
    password: null,
    confirmPassword: null,
  });
  const [errors, setErrors] = useState({});
  const [countryDialingCode, setCountryDialingCode] = useState(customerInfo);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isCustomerInfoAdded, setCustomerInfoAdded] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phoneNumber") {
      isValidPhoneNumber(value);
      setFormData({
        ...formData,
        [e.target.name]: value,
      });
      setErrors({
        ...errors,
        [name]: null,
      });
    } else {
      if (name === "email") {
        isValidEmail(value);
      }
      setFormData({
        ...formData,
        [e.target.name]: value,
      });
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const handleSubmit = async (e, whatsapp) => {
    e.preventDefault();
    setIsWhatsapp(whatsapp);
    const validationErrors = validateFormData(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      if (validateNumber && validateEmail) {
        dispatch({
          type: "SEND_OTP",
          payload: {
            phoneNumber: `${customerInfo}${formData.phoneNumber}`,
            whatsapp: whatsapp,
          },
        });
      } else if (!validateNumber) {
        dispatch({ type: "INVALIDATE_NUMBER" });
        setErrors({ ...errors, phoneNumber: "Phone Number Is Already Exists" });
      } else if (!validateEmail) {
        dispatch({ type: "INVALIDATE_EMAIL" });
        setErrors({ ...errors, email: "Email Is Already Exists" });
      }
    }
  };

  const validateFormData = (data) => {
    const errors = {};

    if (!data.firstName) {
      errors.firstName = "First Name is required.";
    }
    if (!data.lastName) {
      errors.lastName = "Last Name is required.";
    }
    if (!data.phoneNumber) {
      errors.phoneNumber = "Phone Number is required.";
    }
    // else if (!isValidPhoneNumber(data.phoneNumber)) {
    //   errors.phoneNumber = "Phone Number Is Already Exists";
    // }

    if (!data.email) {
      errors.email = "Email is required.";
    }
    if (!data.password) {
      errors.password = "Password is required.";
    }

    if (!data.password) {
      errors.password = "Password is required.";
    } else if (data.password.length < 8) {
      errors.password = "Password should be at least 8 characters long.";
    } else if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }
    return errors;
  };

  const isValidEmail = async (email) => {
    if (email) {
      dispatch({
        type: "CHECK_EMAIL",
        payload: { email: email },
      });
    }
    return new Promise((resolve) => {
      resolve(validateEmail);
    });
  };
  const isValidPhoneNumber = async (number) => {
    if (number.length > 8) {
      dispatch({
        type: "CHECK_NUMBER",
        payload: { phoneNumber: `${customerInfo}${number}` },
      });
    }
    return new Promise((resolve) => {
      resolve(validateNumber);
    });
  };
  useEffect(() => {
    if (verificationId) {
      setData(formData);
      onNextOTP();
    }
  }, [verificationId]);
  return (
    <li className="w-full flex items-center justify-center">
      <form
        className="indexstyle-sc-1ta56kz-0 fnEqht"
        onSubmit={(e) => handleSubmit(e, false)}
      >
        <div>
          <div className="p-4 register-header flex flex-row items-center justify-between">
            <h1
              // onClick={onSwitchToMain}
              className="cursor-pointer register-title font-[600] text-lg"
            >
              {/*<SvgArrowLeft />*/}
            </h1>
            <h1 className="register-title font-[600] text-lg">
              {/*{t("user.register")}*/}
            </h1>
            <h1 className="login-title font-[600] text-lg"></h1>
          </div>
          <img
            className="px-4 register-advertising"
            src="/image/catalog/activity/FZJksAAw981669557575.jpg"
            alt="3"
          />
        </div>
        <div className=" p-4">
          <label
            id="firstName"
            placeholder={t("user.fname")}
            className="indexstyle-sc-1p4nwz9-0 fSxngv flex flex-col w-full iIBTwB-first"
          >
            <input
              autoComplete="on"
              name="firstName"
              placeholder={t("user.fname")}
              required=""
              value={formData.firstName}
              onChange={handleChange}
              type="text"
            />
            {errors.firstName && (
              <small className="my-1 w-full bg-red-200">
                {errors.firstName}
              </small>
            )}
          </label>
        </div>
        <div className="p-4">
          <label
            id="lastName"
            placeholder={t("user.lname")}
            className="indexstyle-sc-1p4nwz9-0 fSxngv flex flex-col w-full iIBTwB-last"
          >
            <input
              autoComplete="on"
              name="lastName"
              placeholder={t("user.lname")}
              required=""
              type="text"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && (
              <small className="my-1 w-full bg-red-200">
                {errors.lastName}
              </small>
            )}
          </label>
        </div>
        <div className=" p-4">
          <label
            id="number"
            placeholder={t("user.phone_number")}
            className="indexstyle-sc-1p4nwz9-0 fSxngv  flex flex-col w-full iIBTwB-phone"
          >
            <div className="flex w-full h-full">
              <span className="border text-lg text-[rgb(157,156,156)] border-l-1 border-t-1 border-b-1 border-r-0 border-[rgb(217,217,217)] p-[13px] w-20% bg-gray-100 disabled cursor-not-allowed">
                {customerInfo && customerInfo}
              </span>
              <input
                className="w-80% border-l-0"
                autoComplete="on"
                name="phoneNumber"
                placeholder={t("user.phone_number")}
                required=""
                type="number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            {errors.phoneNumber && (
              <small className="my-1 w-full bg-red-200">
                {errors.phoneNumber}
              </small>
            )}
          </label>
        </div>
        <div className=" p-4">
          <label
            id="email"
            placeholder={t("user.email")}
            className="indexstyle-sc-1p4nwz9-0 fSxngv flex flex-col w-full iIBTwB-email"
          >
            <input
              autoComplete="on"
              name="email"
              placeholder={t("user.email")}
              required=""
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <small className="my-1 w-full bg-red-200">{errors.email}</small>
            )}
          </label>
        </div>
        <div className=" p-4">
          <label
            id="password"
            placeholder={t("user.password")}
            className="indexstyle-sc-1p4nwz9-0 kEXvcw flex flex-col w-full iIBTwB-password"
          >
            <input
              autoComplete="on"
              name="password"
              placeholder={t("user.password")}
              required=""
              value={formData.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
            />
            <div
              className="eye-icon absolute w-6 h-6 top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <PiEyeThin size={20} />
              ) : (
                <PiEyeClosed size={20} />
              )}
            </div>
            {errors.password && (
              <small className="my-1 w-full bg-red-200">
                {errors.password}
              </small>
            )}
          </label>
        </div>
        <div className=" p-4">
          <label
            id="confirmPassword"
            placeholder={t("user.reenter_new_password")}
            className="indexstyle-sc-1p4nwz9-0 hJWRSG flex flex-col w-full iIBTwB-confirm"
          >
            <input
              autoComplete="on"
              name="confirmPassword"
              placeholder={t("user.reenter_new_password")}
              required=""
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <div
              className="eye-icon absolute w-6 h-6 top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <PiEyeThin size={20} />
              ) : (
                <PiEyeClosed size={20} />
              )}
            </div>
            {errors.confirmPassword && (
              <small className="my-1 w-full bg-red-200">
                {errors.confirmPassword}
              </small>
            )}
          </label>
        </div>
        {/*<div className="p-4">*/}
        {/*  <label className="flex items-center justify-start gap-x-2">*/}
        {/*    <SvgCheckbox />*/}
        {/*    {t("user.register_with")}*/}
        {/*  </label>*/}
        {/*</div>*/}
        <div className="p-2">
          <button
            className={`
      ${
        authLoading ? "cursor-not-allowed " : " cursor-pointer"
      } gap-2 flex items-center justify-center w-full min-h-[48px] hover:opacity-[0.8] transition-opacity tracking-wide uppercase transition-duration-1000 leading-4 pr-[9px] font-[600] flex items-center justify-center text-lg p-4 bg-green-500 text-[var(--c-gray-rgb255255)]
    `}
            type="submit"
            disabled={authLoading}
            onClick={(e) => handleSubmit(e, true)}
          >
            <WhatsappSvg />
            {authLoading ? (
              <p className=" flex-grow-0 flex-shrink-0 text-lg font-bold">
                <SvgLoader />
              </p>
            ) : (
              t("user.send_otp_via_whatsapp")
            )}
            <p className="w-6 flex-grow-0 flex-shrink-0 text-lg font-bold"></p>
          </button>
        </div>
        <div className="p-2">
          <button
            onClick={(e) => handleSubmit(e, false)}
            className={`
              ${
                authLoading ? "cursor-not-allowed " : " cursor-pointer"
              } w-full min-h-[48px] gap-x-2 hover:opacity-[0.8] transition-opacity tracking-wide uppercase transition-duration-1000 leading-4 pr-[40px] font-[600] flex items-center justify-center text-lg p-4 bg-[rgb(49,53,60)] text-[var(--c-gray-rgb255255)]
            `}
            type="submit"
            disabled={authLoading}
          >
            <p className="">
              <RiMessage2Line size={30} />
            </p>
            {authLoading ? (
              <p className=" flex-grow-0 flex-shrink-0 text-lg font-bold">
                <SvgLoader />
              </p>
            ) : (
              t("user.send_otp_via_phone_number")
            )}
          </button>
        </div>
        <div className="p-4">
          <div className="indexstyle-sc-1i2ocq9-0 irrRka">
            <div className="coupon">
              <div className="content">
                <p className="ellipsis flex items-center justify-center">
                  {t("user.register_to_get_5")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </li>
  );
};
export default SignupTab;
