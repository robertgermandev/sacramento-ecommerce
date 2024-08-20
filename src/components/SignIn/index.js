import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./styles.scss";
import Button from "../forms/Button";
import FormInput from "../forms/FormInput";
import { signInWithGoogle, auth } from "./../../firebase/utlis";
import { signInWithEmailAndPassword } from "firebase/auth";
import AuthWrapper from "../AuthWrapper";
import GoogleIcon from "./../../assets/google.png";

const initialState = {
  email: "",
  password: "",
};

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      this.setState({
        ...initialState,
      });
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };

  render() {
    const { email, password } = this.state;
    const configAuthWrapper = {
      headline: "log in",
    };

    return (
      <AuthWrapper {...configAuthWrapper}>
        <div className="formWrap">
          <form onSubmit={this.handleSubmit}>
            <FormInput
              type="email"
              name="email"
              value={email}
              label="Email"
              handleChange={this.handleChange}
            />
            <FormInput
              type="password"
              name="password"
              value={password}
              label="Password"
              handleChange={this.handleChange}
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
  }
}

export default SignIn;
