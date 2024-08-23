import React, { useState, useEffect } from "react";
import "./styles.scss";
import FormInput from "../forms/FormInput";
import Button from "../forms/Button";
import { auth } from "../../firebase/utlis";
import AuthWrapper from "../AuthWrapper";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser, resetSignInStatus } from "../../redux/User/actions";
import { createSelector } from "reselect";

const selectUser = (state) => state.user;

const selectSignUpSuccess = createSelector(
  [selectUser],
  (user) => user.signUpSuccess
);
const selectSignUpError = createSelector(
  [selectUser],
  (user) => user.signUpError
);

const SignUp = (props) => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signUpSuccess = useSelector(selectSignUpSuccess);
  const signUpError = useSelector(selectSignUpError);

  useEffect(() => {
    if (signUpSuccess) {
      resetFormState();
      dispatch(resetSignInStatus());
      navigate("/");
    }
  }, [signUpSuccess]);

  useEffect(() => {
    if (Array.isArray(signUpError) && signUpError.length > 0) {
      setErrors(signUpError);
    }
  }, [signUpError]);

  const resetFormState = () => {
    setDisplayName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrors([]);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    dispatch(
      signUpUser({ auth, displayName, email, password, confirmPassword })
    );
  };

  const configWrapper = {
    headline: "sign up",
  };

  return (
    <AuthWrapper {...configWrapper}>
      <div className="formWrap">
        {errors.length > 0 && (
          <ul>
            {errors.map((err, idx) => {
              return <li key={idx}>{err}</li>;
            })}
          </ul>
        )}
        <form onSubmit={handleFormSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            label={"Full Name"}
            handleChange={(e) => setDisplayName(e.target.value)}
          />
          <FormInput
            type="text"
            name="email"
            value={email}
            label={"Email"}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            label={"Password"}
            handleChange={(e) => setPassword(e.target.value)}
          />
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            label={"Confirm Password"}
            handleChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button type="submit">Register</Button>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default SignUp;
