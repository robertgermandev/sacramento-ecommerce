import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.scss";
import AuthWrapper from "./../AuthWrapper";
import FormInput from "./../forms/FormInput";
import Button from "./../forms/Button";
import { auth } from "./../../firebase/utlis";
import { useDispatch, useSelector } from "react-redux";
import { resetPassowrd, resetSignInStatus } from "../../redux/User/actions";
import { createSelector } from "reselect";

const selectUser = (state) => state.user;

const selectResetPasswordSuccess = createSelector(
  [selectUser],
  (user) => user.resetPasswordSuccess
);

const selectResetPasswordError = createSelector(
  [selectUser],
  (user) => user.resetPasswordError
);

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const resetPasswordSuccess = useSelector(selectResetPasswordSuccess);
  const resetPasswordError = useSelector(selectResetPasswordError);

  useEffect(() => {
    if (resetPasswordSuccess) {
      dispatch(resetSignInStatus());
      navigate("/login");
    }
  }, [resetPasswordSuccess]);

  useEffect(() => {
    if (Array.isArray(resetPasswordError) && resetPasswordError.length > 0) {
      setErrors(resetPasswordError);
    }
  }, [resetPasswordError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassowrd({ auth, email }));
  };

  const configWrapper = {
    headline: "reset password",
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
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit">Send email</Button>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default ResetPassword;
