import { all, fork, put, takeEvery } from "@redux-saga/core/effects";
import {
  fetchDataSuccess,
  fetchDataError,
  startLoading,
  stopLoading,
  fetchSittingSuccess,
} from "../../actions";
import API from "@/helpers/API";
import store from "../../index";

//################# Start SETTING #################//

function* fetchSittingSaga() {
  const APISitting = "https://json-styles.vercel.app/sitting";
  try {
    yield put(startLoading());
    const sitting = yield API.get(APISitting);
    const { font, color, logo, backgroundColor, root, title } = sitting.data;
    if (typeof window !== "undefined") {
      yield localStorage.setItem(
        "SITTING",
        JSON.stringify({ sitting: sitting.data })
      );
      yield put(fetchSittingSuccess({ sitting: sitting.data }));
    }
    store.dispatch(stopLoading());
  } catch (error) {
    console.log(error);
    yield put(fetchDataError(error));
  }
}

function* MainSittingWatch() {
  yield takeEvery("SETTING", fetchSittingSaga);
}

//################# End SETTING #################//

//################# Start Main page #################//
function* fetchMainPageSaga() {
  try {
    yield put(startLoading());
    const mainPage = yield API.get("api/v10/web/home");
    yield put(fetchDataSuccess({ mainPage: mainPage }));
    // setTimeout(() => {
    yield put(stopLoading());
    // }, 3000);
  } catch (error) {
    console.log(error);
    yield put(fetchDataError(error));
  }
}

function* MainPageWatch() {
  yield takeEvery("GET_SECTIONS_SAGA", fetchMainPageSaga);
}

//################# Start FLASH_SALE #################//

function* fetchFlashSaleSaga() {
  try {
    const flashSale = yield API.get("api/v10/web/home/flash-deals");
    yield put(fetchDataSuccess({ flashSale: flashSale }));
  } catch (error) {
    console.log(error);
    yield put(fetchDataError(error));
  }
}

function* MainFlashSaleWatch() {
  yield takeEvery("GET_FLASH_SALE_SAGA", fetchFlashSaleSaga);
}

//################# End FLASH_SALE #################//

//################# Start CATEGORIES #################//

function* fetchCategoriesSaga() {
  try {
    const mainCategories = yield API.get("api/v10/web/home/main-categories");
    yield put(fetchDataSuccess({ mainCategories: mainCategories }));
  } catch (error) {
    console.log(error);
    yield put(fetchDataError(error));
  }
}

function* MainCategoriesWatch() {
  yield takeEvery("GET_CATEGORIES_SAGA", fetchCategoriesSaga);
}

//################# End CATEGORIES #################//

export function* MainPageSaga() {
  yield all([fork(MainPageWatch)]);
  yield all([fork(MainSittingWatch)]);
  yield all([fork(MainFlashSaleWatch)]);
  yield all([fork(MainCategoriesWatch)]);
}
