import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.scss";
import Button from "../forms/Button";
import FormInput from "../forms/FormInput";
import { signInWithGoogle, auth } from "./../../firebase/utlis";
import { signInWithEmailAndPassword } from "firebase/auth";
import AuthWrapper from "../AuthWrapper";
import GoogleIcon from "./../../assets/google.png";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const resetFormState = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      resetFormState();
      navigate("/");
    } catch (err) {
      alert(err);
    }
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
              <Button onClick={signInWithGoogle}>
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
