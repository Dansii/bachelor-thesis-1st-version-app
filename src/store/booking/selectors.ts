import { createSelector } from "reselect";
import { RootState } from "../store";

const rootState = (state: RootState) => state.user;
