import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.scss";
import AuthWrapper from "./../AuthWrapper";
import FormInput from "./../forms/FormInput";
import Button from "./../forms/Button";
import { auth } from "./../../firebase/utlis";
import { sendPasswordResetEmail } from "firebase/auth";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmail(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        url: "http://localhost:3002/login",
      };

      await sendPasswordResetEmail(auth, email, config)
        .then(() => {
          navigate("/login");
        })
        .catch((err) => {
          setErrors(err);
        });
    } catch (err) {
      alert(err);
    }
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
            onChange={handleChange}
          />
          <Button type="submit">Send Email</Button>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default ResetPassword;
