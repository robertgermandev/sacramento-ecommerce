import { createSelector } from "reselect";

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const selectResetPasswordSuccess = createSelector(
  [selectUser],
  (user) => user.resetPasswordSuccess
);

export const selectUserError = createSelector(
  [selectUser],
  (user) => user.userErr
);
