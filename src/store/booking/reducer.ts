import {
  BOOK_GROUP_EVENT_FAILURE,
  BOOK_GROUP_EVENT_SUCCESS,
  LOAD_AVAILABLE_DATES_FOR_INDIVIDUAL_SERVICE_SUCCESS,
  LOAD_COACHES_FOR_INDIVIDUAL_SERVICE_SUCCESS,
  LOAD_GROUP_EVENTS_SUCCESS,
  LOAD_SELECTED_BOOKING_SUCCESS,
  LOAD_SERVICES_SUCCESS,
} from "./actions";
import { TAction } from "../store";

const initialState = {
  serviceCategories: [],
  groupEvents: [],
  hasBookingSucceeded: false,
  availableCoaches: [],
  availableSlots: [],
  selectedBooking: {},
};

const loginReducer = (state = initialState, { type, payload }: TAction) => {
  switch (type) {
    case LOAD_SERVICES_SUCCESS:
      const { serviceCategories } = payload;
      return {
        ...state,
        serviceCategories: {
          ...state.serviceCategories,
          ...serviceCategories,
        },
      };
    case LOAD_GROUP_EVENTS_SUCCESS:
      const { groupEvents } = payload;
      return {
        ...state,
        groupEvents: {
          ...groupEvents,
        },
      };
    case BOOK_GROUP_EVENT_SUCCESS:
      return {
        ...state,
        hasBookingSucceeded: true,
      };
    case BOOK_GROUP_EVENT_FAILURE:
      return {
        ...state,
        hasBookingSucceeded: false,
      };
    case LOAD_COACHES_FOR_INDIVIDUAL_SERVICE_SUCCESS:
      const { coaches } = payload;
      return {
        ...state,
        availableCoaches: {
          ...coaches,
        },
      };
    case LOAD_AVAILABLE_DATES_FOR_INDIVIDUAL_SERVICE_SUCCESS:
      const { slots } = payload;
      return {
        ...state,
        availableSlots: {
          ...slots,
        },
      };
    case LOAD_SELECTED_BOOKING_SUCCESS:
      const { selectedBooking } = payload;
      return {
        ...state,
        selectedBooking: selectedBooking,
      };
    default:
      return state;
  }
};

export default loginReducer;
