import {
  PHONE_VERIFIED,
  SEND_CODE_VERIFICATION_SUCCESS,
  SIGN_OUT_SUCCESS,
  USER_VERIFIED,
} from "./actions";
import { TAction } from "../store";

const initialState = {
  userData: {},
  smsSent: false,
  newUser: false,
  isAuthorized: false,
};

const userReducer = (state = initialState, { type, payload }: TAction) => {
  switch (type) {
    case SEND_CODE_VERIFICATION_SUCCESS:
      const { phone } = payload;
      return {
        ...state,
        userData: {
          ...state.userData,
          phone: phone,
        },
        smsSent: true,
      };
    case USER_VERIFIED:
      const { clientId, id, userToken, email, name } = payload;
      return {
        ...state,
        userData: {
          ...state.userData,
          id: id,
          clientId: clientId,
          userToken: userToken,
          email: email,
          name: name,
          phone: payload.phone,
        },
        isAuthorized: true,
      };
    case PHONE_VERIFIED:
      const { user } = payload;

      return {
        ...state,
        userData: {
          ...state.userData,
          ...user,
        },
        newUser: true,
      };
    case SIGN_OUT_SUCCESS: {
      return {
        ...state,
        isAuthorized: false,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
