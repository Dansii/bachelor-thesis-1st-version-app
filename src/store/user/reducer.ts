import { LOAD_USER_DATA_SUCCESS } from "./actions";
import { TAction } from "../store";

const initialState = {
  subscriptions: [],
  lessons: [],
  hasSubscriptions: false,
};

const loginReducer = (state = initialState, { type, payload }: TAction) => {
  switch (type) {
    case LOAD_USER_DATA_SUCCESS:
      const { subscriptions, upcomingLessons } = payload;
      return {
        ...state,
        hasSubscriptions: subscriptions?.length > 0,
        subscriptions,
        lessons: upcomingLessons,
      };
    default:
      return state;
  }
};

export default loginReducer;
