import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  SvgArrow,
  SvgArrowLeft,
  SvgCheckbox,
  SvgLoader,
  WhatsappSvg,
} from "../../../svgs";
import { RiMessage2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

const PhoneInput = ({
  onNextOTP,
  onSwitchToMain,
  setData,
  customerInfo,
  setIsWhatsapp,
}) => {
  const { t, i18n } = useTranslation("translation");

  const [countryDialingCode, setCountryDialingCode] = useState(customerInfo);
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
    emailOrPhone: null,
    phoneNumber: null,
    email: null,
    isEmail: false,
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "emailOrPhone") {
      validateInput(value);
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: null,
    }));
  };
  const validateInput = (value) => {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        email: value,
        isEmail: true,
      }));
      isValidEmail(value);
    } else if (/^\d+$/.test(value)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        phoneNumber: value,
        isEmail: false,
      }));
      isValidPhoneNumber(value);
    } else {
    }
  };

  const handleSubmit = async (e, whatsapp, email) => {
    setIsWhatsapp(whatsapp);
    e.preventDefault();
    console.log(e, whatsapp, email, validateNumber);
    const validationErrors = validateFormData(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // if (validateNumber || validateEmail) {
      dispatch({
        type: "SEND_OTP",
        payload: {
          phoneNumber: `+${formData.phoneNumber}`,
          whatsapp: whatsapp,
          isEmail: email,
          email: formData.email,
        },
      });
      // } else if (!validateNumber) {
      //   dispatch({ type: "INVALIDATE_NUMBER" });
      // setErrors({ ...errors, phoneNumber: "Phone Number Is Already Exists" });
      // } else if (!validateEmail) {
      //   dispatch({ type: "INVALIDATE_EMAIL" });
      // setErrors({ ...errors, email: "Email Is Already Exists" });
      // }
    }
  };

  const validateFormData = (data) => {
    const errors = {};

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
    if (number.length > 11) {
      dispatch({
        type: "CHECK_NUMBER",
        payload: { phoneNumber: `+${number}` },
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
    <li className="w-[90%] flex items-center justify-center">
      <form
        className="indexstyle-sc-1dc6l7e-0 hIdWHO"
        onSubmit={(e) => handleSubmit(e, false, false)}
      >
        <div className="p-4 register-header flex flex-row items-center justify-between">
          <h1 className="cursor-pointer register-title font-[600] text-lg"></h1>
          <h1 className="register-title font-[600] text-lg">
            {t("user.confirm_phone")}
          </h1>
          <h1 className="register-title font-[600] text-lg"></h1>
        </div>
        <div className="  p-4">
          <label
            id="email"
            // placeholder={t("user.email_or_phone")}
            placeholder={"963 .... OR email"}
            className="indexstyle-sc-1p4nwz9-0 erPdbt  iIBTwB-email-phone"
          >
            <input
              type="text"
              autoComplete="on"
              name="emailOrPhone"
              onChange={handleChange}
              placeholder={`${customerInfo?.replace("+", "")} xxx xxx xxx`}
              required=""
              defaultValue=""
            />
            {errors.emailOrPhone && (
              <small className="my-1 w-full bg-red-200">
                {errors.emailOrPhone}
              </small>
            )}
          </label>
        </div>
        {formData?.isEmail ? (
          <div className="p-2">
            <button
              onClick={(e) => handleSubmit(e, false, true)}
              className={`
              ${
                authLoading ? "cursor-not-allowed " : " cursor-pointer"
              } w-full min-h-[48px] hover:opacity-[0.8] transition-opacity tracking-wide uppercase transition-duration-1000 leading-4 pr-[9px] font-[600] flex items-center justify-center text-lg p-4 bg-[rgb(49,53,60)] text-[var(--c-gray-rgb255255)]
            `}
              type="submit"
              disabled={authLoading}
            >
              {authLoading ? (
                <p className=" flex-grow-0 flex-shrink-0 text-lg font-bold">
                  <SvgLoader />
                </p>
              ) : (
                t("user.send_otp_via_email")
              )}
            </button>
          </div>
        ) : (
          <>
            <div className="p-2">
              <button
                className={`
      ${
        authLoading ? "cursor-not-allowed " : " cursor-pointer"
      } gap-2 flex items-center justify-center w-full min-h-[48px] hover:opacity-[0.8] transition-opacity tracking-wide uppercase transition-duration-1000 leading-4 pr-[9px] font-[600] flex items-center justify-center text-lg p-4 bg-green-500 text-[var(--c-gray-rgb255255)]
    `}
                type="submit"
                disabled={authLoading}
                onClick={(e) => handleSubmit(e, true, false)}
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
                onClick={(e) => handleSubmit(e, false, false)}
                className={`
              ${
                authLoading ? "cursor-not-allowed " : " cursor-pointer"
              } w-full min-h-[48px] hover:opacity-[0.8] gap-x-2 transition-opacity tracking-wide uppercase transition-duration-1000 leading-4 pr-[40px] font-[600] flex items-center justify-center text-lg p-4 bg-[rgb(49,53,60)] text-[var(--c-gray-rgb255255)]
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
          </>
        )}
      </form>
    </li>
  );
};
export default PhoneInput;
