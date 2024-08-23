import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emailSignInStart, googleSignInStart } from "../../redux/User/actions";
import { Link, useNavigate } from "react-router-dom";
import "./styles.scss";
import Button from "../forms/Button";
import FormInput from "../forms/FormInput";
import { auth } from "./../../firebase/utlis";
import AuthWrapper from "../AuthWrapper";
import GoogleIcon from "./../../assets/google.png";
import { createSelector } from "reselect";

const selectUser = (state) => state.user;

const selectSignInSuccess = createSelector(
  [selectUser],
  (user) => user.currentUser
);

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectSignInSuccess);

  useEffect(() => {
    if (currentUser) {
      resetFormState();
      navigate("/");
    }
  }, [currentUser]);

  const resetFormState = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(emailSignInStart({ auth, email, password }));
  };

  const handleGoogleSignIn = () => {
    dispatch(googleSignInStart({ auth }));
  };

  const configAuthWrapper = {
    headline: "log in",
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            label="Email"
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            label="Password"
            handleChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Log in</Button>
          <div className="socialSignin">
            <div className="row">
              <Button onClick={handleGoogleSignIn}>
                <img src={GoogleIcon} alt="google-icon" className="icon" />
              </Button>
            </div>
          </div>

          <div className="links">
            <Link to="/password-reset">Reset password</Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default SignIn;
