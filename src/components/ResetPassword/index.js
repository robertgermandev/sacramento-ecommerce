import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.scss";
import AuthWrapper from "./../AuthWrapper";
import FormInput from "./../forms/FormInput";
import Button from "./../forms/Button";
import { useDispatch, useSelector } from "react-redux";
import { resetPassowrdStart, resetUserState } from "../../redux/User/actions";
import {
  selectResetPasswordSuccess,
  selectUserError,
} from "../../redux/User/selectors";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const resetPasswordSuccess = useSelector(selectResetPasswordSuccess);
  const userErr = useSelector(selectUserError);

  useEffect(() => {
    if (resetPasswordSuccess) {
      dispatch(resetUserState());
      navigate("/login");
    }
  }, [resetPasswordSuccess]);

  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      setErrors(userErr);
    }
  }, [userErr]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassowrdStart({ email }));
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
