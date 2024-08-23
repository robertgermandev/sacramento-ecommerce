import { resetPassowrdSuccess } from "./actions";
import userTypes from "./types";

const initialState = {
  currentUser: null,
  resetPasswordSuccess: false,
  userErr: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        userErr: [],
      };
    case userTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordSuccess: action.payload,
      };
    case userTypes.USER_ERROR:
      return {
        ...state,
        userErr: action.payload,
      };
    case userTypes.RESET_USER_STATE:
    case userTypes.SIGN_OUT_USER_SUCCESS:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
};

export default userReducer;
