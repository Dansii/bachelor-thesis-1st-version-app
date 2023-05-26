import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  HANDLE_EXISTING_USER,
  PHONE_VERIFICATION,
  PHONE_VERIFIED,
  REGISTRATION,
  SEND_CODE_VERIFICATION,
  SEND_CODE_VERIFICATION_SUCCESS,
  SIGN_OUT,
  SIGN_OUT_SUCCESS,
  USER_VERIFIED,
} from "./actions";

import { SHOW_TOAST } from "../ui/actions";
import { getUserPhone } from "./selectors";
import { AxiosResponse } from "axios";
import {
  getUserAuthData,
  removeUserToken,
  setUserAuthData,
} from "../../services/authService";
import {
  $api,
  setAuthAdminToken,
  setAuthToken,
  setAuthUserToken,
} from "../../api/api";
import { CHAIN_ID, COMPANY_ID } from "../../constants/constants";
import { Capacitor } from "@capacitor/core";
import initPushNotifications from "../../utils/initPushNotifications";

function* sendCodeVerificationSaga({ payload }: any) {
  const { phone } = payload;

  try {
    setAuthToken();
    yield call($api.post, `/book_code/${COMPANY_ID}`, {
      phone: phone,
    });
    yield put({
      type: SEND_CODE_VERIFICATION_SUCCESS,
      payload: { phone: phone },
    });
  } catch (e: any) {
    yield put({
      type: SHOW_TOAST,
      payload: { text: e.response.data.meta?.message },
    });
  }
}

function* phoneVerificationSaga({ payload }: any): Generator {
  const { otp: code } = payload;

  try {
    const phone = yield select(getUserPhone);

    if (typeof phone !== "string") return;

    setAuthToken();
    const response = (yield call($api.post, `/user/auth`, {
      code: code,
      phone: phone,
      company_id: COMPANY_ID,
    })) as AxiosResponse;

    const { data } = response.data;

    const isExistingUser = data.name !== "";

    setUserAuthData(data.user_token, code, phone);
    if (isExistingUser) {
      setAuthAdminToken();
      const response = (yield call(
        $api.get,
        `/group/${CHAIN_ID}/clients/?phone=${phone}`
      )) as AxiosResponse;

      yield put({
        type: USER_VERIFIED,
        payload: {
          id: data.id,
          clientId: response.data.data.clients[0].id,
          userToken: data.user_token,
          email: data.email,
          name: data.name,
        },
      });
      if (Capacitor.isNativePlatform()) {
        yield call(initPushNotifications);
      }
    } else {
      yield put({
        type: PHONE_VERIFIED,
        payload: {
          user: {
            id: data.id,
            userToken: data.user_token,
          },
        },
      });
    }
  } catch (e: any) {
    yield put({ type: SHOW_TOAST, payload: { text: e?.message } });
  }
}

function* registrationSaga({ payload }: any): Generator {
  const { name, email } = payload;
  const phone = yield select(getUserPhone);
  try {
    yield call(setAuthUserToken);
    const response = (yield call($api.post, `/clients/${COMPANY_ID}`, {
      name: name,
      phone: phone,
      email: email,
    })) as AxiosResponse;

    const { data } = response.data;

    yield put({
      type: USER_VERIFIED,
      payload: {
        clientId: data.id,
        email: data.email,
        name: data.name,
      },
    });
  } catch (e: any) {
    yield put({
      type: SHOW_TOAST,

      payload: { text: e.response.data.meta?.message },
    });
  }
}

function* handleSignOutSaga({ payload }: any): Generator {
  try {
    removeUserToken();
    yield put({ type: SIGN_OUT_SUCCESS });
  } catch (e: any) {
    yield put({
      type: SHOW_TOAST,
      payload: { text: e.response.data.meta?.message },
    });
  }
}

function* handleExistingUserSaga(): Generator {
  // @ts-ignore
  const { token, phone, code } = yield call(getUserAuthData);
  setAuthAdminToken();
  const response = (yield call(
    $api.get,
    `/group/${CHAIN_ID}/clients/?phone=${phone}`
  )) as AxiosResponse;
  const data = response.data.data.clients[0];
  yield put({
    type: USER_VERIFIED,
    payload: {
      clientId: data.id,
      userToken: token,
      email: data.email,
      name: data.name,
      phone: phone,
    },
  });
}

function* saga() {
  yield takeEvery(PHONE_VERIFICATION, phoneVerificationSaga);
  yield takeEvery(SEND_CODE_VERIFICATION, sendCodeVerificationSaga);
  yield takeEvery(REGISTRATION, registrationSaga);
  yield takeEvery(HANDLE_EXISTING_USER, handleExistingUserSaga);
  yield takeEvery(SIGN_OUT, handleSignOutSaga);
}

export default saga;
