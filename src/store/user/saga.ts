import { call, put, select, takeEvery } from "redux-saga/effects";
import { $api, setAuthAdminToken, setAuthUserToken } from "../../api/api";
import { SHOW_TOAST } from "../ui/actions";
import { COMPANY_ID } from "../../constants/constants";
import { LOAD_USER_DATA, LOAD_USER_DATA_SUCCESS } from "./actions";
import { AxiosResponse } from "axios";

import { getClientId } from "../auth/selectors";

import initPushNotifications from "../../utils/initPushNotifications";

import {
  extractSubscriptionDataFromResponse,
  extractUpcomingLessonsDataFromResponse,
} from "../../services/userService";
import { Capacitor } from "@capacitor/core";

async function loadUserSubscriptions() {
  await setAuthUserToken();
  const response = (await $api.get(
    `user/loyalty/abonements/?company_id=${COMPANY_ID}`
  )) as AxiosResponse;

  if (!response.data?.meta.count) return null;

  return extractSubscriptionDataFromResponse(response);
}

async function loadUpcomingLessons(clientId: string) {
  await setAuthAdminToken();
  const response = (await $api.get(
    `/records/${COMPANY_ID}?client_id=${clientId}&with_deleted=1`
  )) as AxiosResponse;

  if (!response.data?.meta.total_count) return null;

  return extractUpcomingLessonsDataFromResponse(response);
}

function* loadUserDataSaga(): Generator {
  try {
    const clientId = yield select(getClientId);

    const subscriptions = yield call(loadUserSubscriptions);
    // @ts-ignore
    const upcomingLessons = yield call(loadUpcomingLessons, clientId);

    yield put({
      type: LOAD_USER_DATA_SUCCESS,
      payload: {
        subscriptions,
        upcomingLessons,
      },
    });
  } catch (e: any) {
    yield put({
      type: SHOW_TOAST,
      payload: { text: e.response.data.meta?.message },
    });
  }
}

function* saga() {
  yield takeEvery(LOAD_USER_DATA, loadUserDataSaga);
}

export default saga;
