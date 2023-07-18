import { all, fork, put, takeEvery } from "@redux-saga/core/effects";
import { fetchDataError } from "../../actions";
import API from "@/helpers/API";
import { RegisterGuestReducer } from "../../actions/auth";
import { persistStore } from "redux-persist";
import store from "@/store/index";
//################# Start RegisterGuest #################//

function* fetchRegisterGuestSaga(action) {
  const deviceId = action?.payload?.deviceId;
  try {
    const Guest = yield API.post(`api/v10/auth/register-guest`, {
      device_id: deviceId,
    });
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "TOKEN_LOCAL_STORAGE",
        JSON.stringify({ token: Guest?.data?.data?.token, guest: true })
      );
    }
    const customerInfo = yield API.get(`api/v10/customer/info`);
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "CUSTOMER_INFO_STORAGE",
        JSON.stringify({ customerInfo: customerInfo?.data })
      );
    }
    yield put(RegisterGuestReducer({ Guest: Guest?.data }));
  } catch (error) {
    console.log(error);
    yield put(fetchDataError(error));
  }
}

function* RegisterGuestWatch() {
  yield takeEvery("REGISTER_GUEST", fetchRegisterGuestSaga);
}

//################# End RegisterGuest #################//
//################# Start RegisterGuest #################//

function* fetchCustomerInfoSaga(action) {
  // const token = action?.payload?.Token;
  const customerInfoStorage = JSON.parse(
    localStorage.getItem("CUSTOMER_INFO_STORAGE")
  );
  try {
    // if (!customerInfoStorage) {
    // }
  } catch (error) {}
}

function* CustomerInfoWatch() {
  yield takeEvery("CUSTOMER_INFO", fetchCustomerInfoSaga);
}

//################# End RegisterGuest #################//
//################# Start CHECK_NUMBER #################//

function* fetchCheckNumberSaga(action) {
  store.dispatch({ type: "START_LOADING_AUTH" });
  const phoneNumber = action?.payload?.phoneNumber;
  try {
    const data = yield API.get(`api/v10/phone/check-existence/${phoneNumber}`);
    if (data?.data?.isSuccessful) {
      store.dispatch({ type: "STOP_LOADING_AUTH" });
      store.dispatch({ type: "VALIDATE_NUMBER" });
    } else {
      store.dispatch({ type: "STOP_LOADING_AUTH" });
      store.dispatch({ type: "VALIDATE_NUMBER_FOUND" });
    }
    store.dispatch({ type: "STOP_LOADING_AUTH" });
  } catch (error) {
    store.dispatch({ type: "STOP_LOADING_AUTH" });
  }
}

function* CheckNumberWatch() {
  yield takeEvery("CHECK_NUMBER", fetchCheckNumberSaga);
}

//################# End CHECK_NUMBER #################//
//################# Start CHECK_NUMBER #################//

function* fetchCheckEmailSaga(action) {
  store.dispatch({ type: "START_LOADING_AUTH" });
  const email = action?.payload?.email;
  try {
    const data = yield API.get(`api/v10/email/check-existence/${email}`);
    if (data?.data?.isSuccessful) {
      store.dispatch({ type: "VALIDATE_EMAIL" });
      store.dispatch({ type: "STOP_LOADING_AUTH" });
    }
    store.dispatch({ type: "STOP_LOADING_AUTH" });
  } catch (error) {
    store.dispatch({ type: "STOP_LOADING_AUTH" });
  }
}

function* CheckEmailWatch() {
  yield takeEvery("CHECK_EMAIL", fetchCheckEmailSaga);
}

//################# End CHECK_NUMBER #################//
//################# Start CHECK_NUMBER #################//

function* fetchSendOTPSaga(action) {
  store.dispatch({ type: "START_LOADING_AUTH" });
  const phoneNumber = action?.payload?.phoneNumber;
  const whatsapp = action?.payload?.whatsapp ? 1 : 0;
  try {
    const data = yield API.get(
      `api/v10/phone/send_otp?phone=${phoneNumber}&is_via_whatsapp=${whatsapp}`
    );
    console.log(data?.data?.data?.verificationId);
    if (data?.data?.data?.verificationId) {
      store.dispatch({
        type: "SET_VERIFICATION_ID",
        payload: data?.data?.data?.verificationId,
      });
    }
    store.dispatch({ type: "STOP_LOADING_AUTH" });
  } catch (error) {
    store.dispatch({ type: "STOP_LOADING_AUTH" });
  }
}

function* SendOTPWatch() {
  yield takeEvery("SEND_OTP", fetchSendOTPSaga);
}

//################# End CHECK_NUMBER #################//
//################# Start CHECK_NUMBER #################//

function* fetchVerifyOTPSaga(action) {
  store.dispatch({ type: "START_LOADING_AUTH" });
  const otp = action?.payload?.otp;
  const verificationId = store.getState().AuthReducer.verificationId;
  try {
    const data = yield API.get(
      `api/v10/phone/verify_otp?verificationId=${verificationId}&otp=${otp}`
    );
    const idToken = data?.data?.data?.id_token;
    if (idToken) {
      store.dispatch({
        type: "SET_AUTH_ID_TOKEN",
        payload: idToken,
      });
    } else {
    }
    store.dispatch({ type: "STOP_LOADING_AUTH" });
  } catch (error) {
    store.dispatch({ type: "STOP_LOADING_AUTH" });
  }
}

function* VerifyOTPWatch() {
  yield takeEvery("VERIFY_OTP", fetchVerifyOTPSaga);
}
//################# Start CHECK_NUMBER #################//
//################# Start CHECK_NUMBER #################//

function* fetchVerifyGuestSaga(action) {
  store.dispatch({ type: "START_LOADING_AUTH" });
  const idToken = action?.payload?.idToken;
  try {
    const response = yield API.post(
      `api/v10/auth/firebase/verify-guest-phone`,
      {
        id_token: idToken,
      }
    );
    const oldToken = JSON.parse(
      localStorage.getItem("TOKEN_LOCAL_STORAGE")
    )?.token;
    const userData = JSON.parse(
      localStorage.getItem("TOKEN_LOCAL_STORAGE")
    )?.userData;
    const token = response?.data?.token;
    const code = response?.data?.code;
    if (code === "user-exists") {
      store.dispatch({
        type: "SET_AUTH_TOKEN",
        payload: token,
      });
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "TOKEN_LOCAL_STORAGE",
          JSON.stringify({
            token: token,
            guest: false,
            userData: response?.data?.data?.user,
          })
        );
      }
    } else if (code === "user-verified") {
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "TOKEN_LOCAL_STORAGE",
          JSON.stringify({
            token: oldToken,
            guest: false,
            userData: userData,
          })
        );
      }
    }
    store.dispatch({ type: "STOP_LOADING_AUTH" });
  } catch (error) {
    store.dispatch({ type: "STOP_LOADING_AUTH" });
  }
}

function* VerifyGuestWatch() {
  yield takeEvery("VERIFY_GUEST", fetchVerifyGuestSaga);
}
//################# Start CHECK_NUMBER #################//

function* fetchLoginSaga(action) {
  store.dispatch({ type: "START_LOADING_AUTH" });
  const phoneNumber = action?.payload?.phoneNumber;
  const email = action?.payload?.email;
  const password = action?.payload?.password;
  const isEmail = action?.payload?.isEmail;
  try {
    const data = isEmail
      ? yield API.post(`api/v10/auth/email/login`, {
          email: email,
          password: password,
        })
      : yield API.post(`api/v10/auth/phone/login`, {
          phone: phoneNumber,
          password: password,
        });
    const token = data?.data?.data?.token;
    if (token) {
      store.dispatch({
        type: "SET_AUTH_TOKEN",
        payload: token,
      });
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "TOKEN_LOCAL_STORAGE",
          JSON.stringify({
            token: token,
            guest: false,
            userData: data?.data?.data?.user,
          })
        );
      }
    } else {
    }
    // store.dispatch({ type: "STOP_LOADING_AUTH" });
  } catch (error) {
    store.dispatch({ type: "STOP_LOADING_AUTH" });
  }
}

function* LoginWatch() {
  yield takeEvery("LOGIN", fetchLoginSaga);
}
//################# Start CHECK_NUMBER #################//

function* fetchRegisterSaga(action) {
  store.dispatch({ type: "START_LOADING_AUTH" });
  const idToken = action?.payload?.idToken;
  const data = action?.payload?.data;

  const info = JSON.parse(localStorage.getItem("CUSTOMER_INFO_STORAGE"));
  const countryDialingCode =
    info?.customerInfo?.data["starting-setting"]["default_country_dial_code"];
  try {
    const response = yield API.post(`api/v10/auth/register`, {
      f_name: data?.firstName,
      l_name: data?.lastName,
      email: data?.email,
      phone: data?.phoneNumber,
      id_token: idToken,
      password: data?.password,
      country_dial_code: countryDialingCode,
    });
    console.log(response, "response");
    const token = response?.data?.data?.token;
    if (token) {
      store.dispatch({
        type: "SET_AUTH_TOKEN",
        payload: token,
      });
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "TOKEN_LOCAL_STORAGE",
          JSON.stringify({
            token: token,
            guest: false,
            userData: response?.data?.data?.user,
          })
        );
      }
    } else {
    }
    // store.dispatch({ type: "STOP_LOADING_AUTH" });
  } catch (error) {
    store.dispatch({ type: "STOP_LOADING_AUTH" });
  }
}

function* RegisterWatch() {
  yield takeEvery("REGISTER", fetchRegisterSaga);
}
//################# Start CHECK_NUMBER #################//
//################# Start CHECK_NUMBER #################//

function* fetchResetPasswordSaga(action) {
  store.dispatch({ type: "START_LOADING_AUTH" });
  const idToken = action?.payload?.idToken;
  const phoneNumber = action?.payload?.phoneNumber;
  const password = action?.payload?.password;
  const email = action?.payload?.email;
  const isEmail = action?.payload?.isEmail;
  try {
    const response = !isEmail
      ? yield API.post(`api/v10/phone/reset-password`, {
          phone_number: phoneNumber,
          password: password,
          id_token: idToken,
        })
      : yield API.post(`api/v10/phone/reset-password/email`, {
          phone_number: phoneNumber,
          password: password,
          id_token: idToken,
        });
    console.log(response, "response");
    const isSuccessful = response?.data?.isSuccessful;
    if (isSuccessful) {
      store.dispatch({
        type: "SUCCESS_RESET_PASSWORD",
      });
    }
    store.dispatch({ type: "STOP_LOADING_AUTH" });
  } catch (error) {
    store.dispatch({ type: "STOP_LOADING_AUTH" });
  }
}

function* ResetPasswordWatch() {
  yield takeEvery("RESET_PASSWORD", fetchResetPasswordSaga);
}
//################# Start CHECK_NUMBER #################//

function* fetchLogoutSaga() {
  store.dispatch({ type: "START_LOADING_AUTH" });
  store.dispatch({
    type: "SET_AUTH_TOKEN",
    payload: null,
  });
  if (typeof window !== "undefined") {
    localStorage.setItem("TOKEN_LOCAL_STORAGE", JSON.stringify(null));
  }
  store.dispatch({ type: "STOP_LOADING_AUTH" });
}

function* LogoutWatch() {
  yield takeEvery("LOGOUT", fetchLogoutSaga);
}

//################# End CHECK_NUMBER #################//
export function* AuthSaga() {
  yield all([fork(RegisterGuestWatch)]);
  yield all([fork(CustomerInfoWatch)]);
  yield all([fork(CheckNumberWatch)]);
  yield all([fork(CheckEmailWatch)]);
  yield all([fork(SendOTPWatch)]);
  yield all([fork(VerifyOTPWatch)]);
  yield all([fork(LoginWatch)]);
  yield all([fork(RegisterWatch)]);
  yield all([fork(LogoutWatch)]);
  yield all([fork(VerifyGuestWatch)]);
  yield all([fork(ResetPasswordWatch)]);
}
