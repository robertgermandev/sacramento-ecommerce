import React, { useState } from "react";
import "./styles.scss";
import FormInput from "../forms/FormInput";
import Button from "../forms/Button";
import { auth, handleUserProfile } from "../../firebase/utlis";
import { createUserWithEmailAndPassword } from "firebase/auth";
import AuthWrapper from "../AuthWrapper";
import { useNavigate } from "react-router-dom";

const SignUp = (props) => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const resetFormState = () => {
    setDisplayName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrors([]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      const err = [`Passwords don't match!`];
      setErrors(err);
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
      resetFormState();
      navigate("/");
    } catch (err) {
      alert(err);
    }
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
