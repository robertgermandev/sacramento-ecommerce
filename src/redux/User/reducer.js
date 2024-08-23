import userTypes from "./types";

const initialState = {
  currentUser: null,
  signInSuccess: false,
  signUpSuccess: false,
  signUpError: [],
  resetPassowrdSuccess: false,
  resetPassowrdError: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case userTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        signInSuccess: action.payload,
      };
    case userTypes.RESET_SIGN_IN_STATUS:
      return {
        ...state,
        signInSuccess: false,
        signUpSuccess: false,
        signUpError: [],
        resetPassowrdSuccess: false,
        resetPassowrdError: [],
      };
    case userTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpSuccess: action.payload,
      };
    case userTypes.SIGN_UP_ERROR:
      return {
        ...state,
        signUpError: action.payload,
      };
    case userTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordSuccess: action.payload,
      };
    case userTypes.RESET_PASSWORD_ERROR:
      return {
        ...state,
        resetPasswordError: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
