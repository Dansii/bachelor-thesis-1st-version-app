import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import userReducer from "./user/reducer";
import uiReducer from "./ui/reducer";
import bookingReducer from "./booking/reducer";

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  ui: uiReducer,
  booking: bookingReducer,
});
