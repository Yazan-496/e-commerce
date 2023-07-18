"use client";

import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import store from "../store";

const Register = () => {
  const [user, setUser] = useState(null);
  const [done, setDone] = useState(false);
  const [userInfo, setUserInfo] = useState(false);
  const dispatch = useDispatch();

  function generateDeviceId() {
    const userAgent = window.navigator.userAgent;
    return `${Date.now()}_${userAgent}`;
  }

  function RegisterAsGuest() {
    if (!user && done) {
      const deviceId = generateDeviceId();
      dispatch({
        type: "REGISTER_GUEST",
        payload: { deviceId },
      });
      setUserInfo(true);
    }
  }

  useEffect(() => {
    RegisterAsGuest();
  }, [user, done]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const Token = JSON.parse(
        localStorage.getItem("TOKEN_LOCAL_STORAGE")
      )?.token;
      setUser(Token);
      setDone(true);
    }
  }, []);

  return <></>;
};

export default Register;
