import { createSelector } from "reselect";
import { RootState } from "../store";

export const authState = (state: RootState) => state?.auth.userData;

const rootState = (state: RootState) => state.auth;

export const getUserPhone = createSelector(authState, (user) => user.phone);
export const getUserEmail = createSelector(authState, (user) => user.email);
export const getUserName = createSelector(authState, (user) => user.name);
export const getClientId = createSelector(authState, (user) => user.clientId);
export const getUser = createSelector(
  rootState,
  (rootState) => rootState.userData
);
export const isSmsSent = createSelector(
  rootState,
  (rootState) => rootState.smsSent
);
export const isAuthorized = createSelector(
  rootState,
  (rootState) => rootState.isAuthorized
);
