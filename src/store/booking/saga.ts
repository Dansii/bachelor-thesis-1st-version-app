import { call, put, select, takeEvery } from "redux-saga/effects";
import { $api, setAuthToken, setAuthUserToken } from "../../api/api";
import { SHOW_TOAST } from "../ui/actions";
import { COMPANY_ID } from "../../constants/constants";
import {
  BOOK_GROUP_EVENT,
  BOOK_GROUP_EVENT_FAILURE,
  BOOK_GROUP_EVENT_SUCCESS,
  BOOK_INDIVIDUAL_LESSON,
  CANCEL_GROUP_EVENT,
  CANCEL_GROUP_EVENT_SUCCESS,
  LOAD_AVAILABLE_DATES_FOR_INDIVIDUAL_SERVICE,
  LOAD_AVAILABLE_DATES_FOR_INDIVIDUAL_SERVICE_SUCCESS,
  LOAD_COACHES_FOR_INDIVIDUAL_SERVICE,
  LOAD_COACHES_FOR_INDIVIDUAL_SERVICE_SUCCESS,
  LOAD_GROUP_EVENTS,
  LOAD_GROUP_EVENTS_SUCCESS,
  LOAD_SELECTED_BOOKING,
  LOAD_SELECTED_BOOKING_SUCCESS,
  LOAD_SERVICES,
  LOAD_SERVICES_SUCCESS,
} from "./actions";
import { AxiosResponse } from "axios";

import {
  ApiGroupServicesResponse,
  ApiIndividualServicesResponse,
  TimeResponse,
} from "../../types/ApiResponseTypes/services/types";
import {
  Coach,
  GroupEvent,
  ServiceCategory,
  TimeSlot,
} from "../../types/types";
import { getUserEmail, getUserName, getUserPhone } from "../auth/selectors";
import { adjustDate, computeEndTime } from "../../utils/utils";
import {
  extractEventFromResponse,
  extractGroupEventsDataFromResponse,
  extractGroupServicesDataFromResponse,
  extractIndividualServicesDataFromResponse,
} from "../../services/bookingService";

function* loadServicesSaga({ payload }: any): Generator {
  try {
    setAuthToken();
    const individualServicesResponse = (yield call(
      $api.get,
      `/book_services/${COMPANY_ID}`
    )) as AxiosResponse<ApiIndividualServicesResponse>;

    const groupServicesResponse = (yield call(
      $api.get,
      `/activity/${COMPANY_ID}/services`
    )) as AxiosResponse<ApiGroupServicesResponse>;

    const individualCategory = extractIndividualServicesDataFromResponse(
      individualServicesResponse
    );
    const groupCategory = extractGroupServicesDataFromResponse(
      groupServicesResponse
    );
    const serviceCategories: ServiceCategory[] = [
      individualCategory.serviceCategory,
      groupCategory.serviceCategory,
    ];
    yield put({
      type: LOAD_SERVICES_SUCCESS,
      payload: { serviceCategories: serviceCategories },
    });
  } catch (e: any) {
    yield put({
      type: SHOW_TOAST,
      payload: { text: e.response.data.meta?.message },
    });
  }
}

function* loadGroupEventsSaga({ payload }: any): Generator {
  try {
    const { serviceId, selectedDate } = payload;
    const formattedDate = selectedDate.split("T")[0];
    setAuthToken();
    const response = (yield call(
      $api.get,
      `/activity/${COMPANY_ID}/search/?service_id=${serviceId}&from=${formattedDate}&till=${formattedDate}`
    )) as AxiosResponse<ApiIndividualServicesResponse>;
    const groupEvents: GroupEvent[] =
      extractGroupEventsDataFromResponse(response);
    yield put({
      type: LOAD_GROUP_EVENTS_SUCCESS,
      payload: { groupEvents: groupEvents },
    });
  } catch (e: any) {
    yield put({
      type: SHOW_TOAST,
      payload: { text: e.response.data.meta?.message },
    });
  }
}

function* bookGroupEventSaga({ payload }: any): Generator {
  try {
    const { eventId } = payload;
    const name = yield select(getUserName);
    const phone = yield select(getUserPhone);
    const email = yield select(getUserEmail);

    setAuthToken();
    yield call($api.post, `/activity/${COMPANY_ID}/${eventId}/book`, {
      fullname: name,
      phone,
      email,
    });
    yield put({
      type: BOOK_GROUP_EVENT_SUCCESS,
    });
  } catch (e: any) {
    yield put({
      type: BOOK_GROUP_EVENT_FAILURE,
    });
    yield put({
      type: SHOW_TOAST,
      payload: { text: e.response.data.meta?.message },
    });
  }
}

function* loadSelectedBookingSaga({ payload }: any): Generator {
  try {
    const { eventId } = payload;
    console.log(eventId);
    setAuthUserToken();
    const response = (yield call(
      $api.get,
      `/activity/${COMPANY_ID}/${eventId}`
    )) as AxiosResponse;
    const groupEvent = extractEventFromResponse(response);
    console.log(groupEvent);
    yield put({
      type: LOAD_SELECTED_BOOKING_SUCCESS,
      payload: { selectedBooking: groupEvent },
    });
  } catch (e: any) {
    yield put({
      type: SHOW_TOAST,
      payload: { text: e.response.data.meta?.message },
    });
  }
}

function* bookIndividualLessonSaga({ payload }: any): Generator {
  try {
    const { serviceId, coachId, selectedDate, from, to } = payload;
    const name = yield select(getUserName);
    const phone = yield select(getUserPhone);
    const email = yield select(getUserEmail);
    const time = from + ":" + to;
    const datetime = adjustDate(selectedDate, time);

    const services: any = [];
    const appointments: any = [];
    services.push(parseInt(serviceId));
    appointments.push({
      id: 0,
      staff_id: parseInt(coachId),
      services,
      datetime,
    });
    setAuthToken();
    yield call($api.post, `/book_record/${COMPANY_ID}`, {
      appointments,
      fullname: name,
      phone,
      email,
    });
    yield put({
      type: BOOK_GROUP_EVENT_SUCCESS,
    });
  } catch (e: any) {
    yield put({
      type: BOOK_GROUP_EVENT_FAILURE,
    });
    yield put({
      type: SHOW_TOAST,
      payload: { text: e.response.data.meta?.message },
    });
  }
}

function* cancelGroupEventSaga({ payload }: any): Generator {
  try {
    const { recordId } = payload;

    setAuthUserToken();
    yield call($api.delete, `/user/records/${recordId}`);
    yield put({
      type: CANCEL_GROUP_EVENT_SUCCESS,
    });
  } catch (e: any) {
    yield put({
      type: SHOW_TOAST,
      payload: { text: e.response.data.meta?.message },
    });
  }
}

function* loadCoachesForIndividualSaga({ payload }: any): Generator {
  try {
    const { serviceId } = payload;

    yield call(setAuthUserToken);
    const response = (yield call(
      $api.get,
      `book_staff/${COMPANY_ID}?service_ids%5B%5D=${serviceId}&without_seances=1`
    )) as AxiosResponse;
    const { data } = response.data;
    const coaches: Coach[] = [];
    data.map((responseCoach: any) => {
      const { id, name, specialization, avatar } = responseCoach;
      coaches.push({
        name: name,
        coachId: id,
        bio: specialization,
        avatar: avatar,
      });
    });
    yield put({
      type: LOAD_COACHES_FOR_INDIVIDUAL_SERVICE_SUCCESS,
      payload: { coaches: coaches },
    });
  } catch (e: any) {
    yield put({
      type: SHOW_TOAST,
      payload: { text: e.response.data.meta?.message },
    });
  }
}

function* loadAvailableDatesForIndividualSaga({ payload }: any): Generator {
  try {
    const { serviceId, coachId, selectedDate } = payload;
    yield call(setAuthUserToken);
    const response = (yield call(
      $api.get,
      `book_times/${COMPANY_ID}/${coachId}/${selectedDate}?&service_ids%5B%5D=${serviceId}`
    )) as AxiosResponse;
    const { data } = response.data;
    const timeSlots: TimeSlot[] = [];
    data.map((responseSlots: TimeResponse) => {
      const { time, seance_length, datetime } = responseSlots;
      const to = computeEndTime(time, seance_length);
      timeSlots.push({
        from: time,
        date: datetime,
        to,
      });
    });
    yield put({
      type: LOAD_AVAILABLE_DATES_FOR_INDIVIDUAL_SERVICE_SUCCESS,
      payload: { slots: timeSlots },
    });
  } catch (e: any) {
    yield put({
      type: SHOW_TOAST,
      payload: { text: e.response.data.meta?.message },
    });
  }
}

function* saga() {
  yield takeEvery(LOAD_SERVICES, loadServicesSaga);
  yield takeEvery(LOAD_GROUP_EVENTS, loadGroupEventsSaga);
  yield takeEvery(BOOK_GROUP_EVENT, bookGroupEventSaga);
  yield takeEvery(BOOK_INDIVIDUAL_LESSON, bookIndividualLessonSaga);
  yield takeEvery(CANCEL_GROUP_EVENT, cancelGroupEventSaga);
  yield takeEvery(
    LOAD_COACHES_FOR_INDIVIDUAL_SERVICE,
    loadCoachesForIndividualSaga
  );
  yield takeEvery(
    LOAD_AVAILABLE_DATES_FOR_INDIVIDUAL_SERVICE,
    loadAvailableDatesForIndividualSaga
  );
  yield takeEvery(LOAD_SELECTED_BOOKING, loadSelectedBookingSaga);
}

export default saga;
