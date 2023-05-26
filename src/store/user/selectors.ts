import { createSelector } from "reselect";
import { RootState } from "../store";

const rootState = (state: RootState) => state.user;

export const getSubscriptions = createSelector(
  rootState,
  (rootState) => rootState.subscriptions
);

export const getUpcomingLessons = createSelector(
  rootState,
  (rootState) => rootState.lessons
);
