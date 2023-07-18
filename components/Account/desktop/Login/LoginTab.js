import React, { useEffect, useState } from "react";
import Image from "@/helpers/image";
import { FacebookSvg, GoogleSvg, HotSearchSVG } from "@/components/svgs";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { SvgArrowLeft, SvgLoader } from "../../../svgs";
import { PiEyeThin, PiEyeClosed } from "react-icons/pi";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core/styles";
const LoginTab = ({ onForgotPassword, customerInfo }) => {
  const { t, i18n } = useTranslation("translation");
  const authLoading = useSelector((state) => state.AuthReducer?.authLoading);
  const verificationId = useSelector(
    (state) => state.AuthReducer?.verificationId
  );
  const useStyles = makeStyles((theme) => ({
    focused: {
      borderColor: "gray",
    },
  }));

  const classes = useStyles();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: null,
    phoneNumber: null,
    password: null,
    emailOrPhone: null,
  });
  const dispatch = useDispatch();
  const [isEmail, setIsEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const authToken = useSelector((state) => state.AuthReducer?.authToken);

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
      }));
      setIsEmail(true);
    } else if (/^\d+$/.test(value)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        phoneNumber: value,
      }));
      setIsEmail(false);
    } else {
    }
  };

  const validateFormData = (data) => {
    const errors = {};

    if (!data.emailOrPhone) {
      errors.emailOrPhone = "This Field is required.";
    } else {
      validateInput(data.emailOrPhone);
    }
    if (!data.password) {
      errors.password = "Password is required.";
    } else if (data.password.length < 8) {
      errors.password = "Password should be at least 8 characters long.";
    }
    return errors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateFormData(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      dispatch({
        type: "LOGIN",
        payload: {
          phoneNumber: `+${formData.phoneNumber}`,
          email: formData.email,
          password: formData.password,
          isEmail: isEmail,
        },
      });
    }
  };

  useEffect(() => {
    if (authToken) {
      router.push("/");
    }
  }, [authToken]);
  return (
    <li className="w-full flex items-center justify-center">
      <form className="indexstyle-sc-1ta56kz-0 fnEqht" onSubmit={handleSubmit}>
        <div>
          <div className="p-4 register-header flex flex-row items-center justify-between">
            <h1
              // onClick={onSwitchToMain}
              className="cursor-pointer register-title font-[600] text-lg"
            >
              {/*<SvgArrowLeft />*/}
            </h1>
            <h1 className="login-title font-[600] text-lg">
              {/*{t("user.login")}*/}
            </h1>
            <h1 className="login-title font-[600] text-lg"></h1>
          </div>
        </div>
        <div className="p-4">
          <label
            id="email"
            placeholder={t("user.email_or_phone")}
            className="indexstyle-sc-1p4nwz9-0 fSxngv flex flex-col w-full iIBTwB-first"
          >
            <input
              type="text"
              autoComplete="on"
              name="emailOrPhone"
              onChange={handleChange}
              placeholder={t("user.email_or_phone")}
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
        <div className="p-4">
          <label
            id="password"
            placeholder={t("user.password")}
            className="indexstyle-sc-1p4nwz9-0 erPdbt  iIBTwB-password"
          >
            <input
              type={showPassword ? "text" : "password"}
              autoComplete="on"
              name="password"
              onChange={handleChange}
              placeholder={t("user.password")}
              required=""
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
        <p
          onClick={onForgotPassword}
          className="cursor-pointer underline hover:font-[700] p-4 forgot-password"
        >
          {t("user.forgot_password")}
        </p>
        <div className="p-4">
          <button
            disabled={authLoading}
            className={`
              ${
                authLoading ? "cursor-not-allowed " : " cursor-pointer"
              } w-full min-h-[48px] hover:opacity-[0.8] transition-opacity tracking-wide uppercase transition-duration-1000 leading-4 pr-[9px] font-[600] flex items-center justify-center text-lg p-4 bg-[rgb(49,53,60)] text-[var(--c-gray-rgb255255)]
            `}
            type="submit"
          >
            {authLoading ? (
              <p className=" flex-grow-0 flex-shrink-0 text-lg font-bold">
                <SvgLoader />
              </p>
            ) : (
              t("user.login")
            )}
          </button>
        </div>
      </form>
    </li>
  );
};
export default LoginTab;
