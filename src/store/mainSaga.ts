import { spawn } from "redux-saga/effects";
import authSaga from "./auth/saga";
import userSaga from "./user/saga";
import bookingSaga from "./booking/saga";

export default function* saga() {
  yield spawn(authSaga);
  yield spawn(userSaga);
  yield spawn(bookingSaga);
}
