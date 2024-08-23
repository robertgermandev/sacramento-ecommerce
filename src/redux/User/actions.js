import userTypes from "./types";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";
import { handleUserProfile, GoogleProvider } from "../../firebase/utlis";

export const setCurrentUser = (user) => ({
  type: userTypes.SET_CURRENT_USER,
  payload: user,
});

export const signInUser =
  ({ auth, email, password }) =>
  async (dispatch) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      dispatch({
        type: userTypes.SIGN_IN_SUCCESS,
        payload: true,
      });
    } catch (err) {
      alert(err);
    }
  };

export const signUpUser =
  ({ auth, displayName, email, password, confirmPassword }) =>
  async (dispatch) => {
    if (password !== confirmPassword) {
      const err = [`Passwords don't match!`];
      dispatch({
        type: userTypes.SIGN_UP_ERROR,
        payload: err,
      });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      await handleUserProfile(user, { displayName });
      dispatch({
        type: userTypes.SIGN_UP_SUCCESS,
        payload: true,
      });
    } catch (err) {
      alert(err);
    }
  };

export const resetPassowrd =
  ({ auth, email }) =>
  async (dispatch) => {
    const config = {
      url: "http://localhost:3002/login",
    };
    try {
      await sendPasswordResetEmail(auth, email, config)
        .then(() => {
          dispatch({
            type: userTypes.RESET_PASSWORD_SUCCESS,
            payload: true,
          });
        })
        .catch((err) => {
          dispatch({
            type: userTypes.RESET_PASSWORD_ERROR,
            payload: err,
          });
        });
    } catch (err) {
      alert(err);
    }
  };

export const resetSignInStatus = () => ({
  type: userTypes.RESET_SIGN_IN_STATUS,
});

export const signInWithGoogle =
  ({ auth }) =>
  async (dispatch) => {
    try {
      await signInWithPopup(auth, GoogleProvider).then(() => {
        dispatch({
          type: userTypes.SIGN_IN_SUCCESS,
          payload: true,
        });
      });
    } catch (err) {
      alert(err);
    }
  };
