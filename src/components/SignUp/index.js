import React, { Component } from "react";
import "./styles.scss";
import FormInput from "../forms/FormInput";
import Button from "../forms/Button";
import { auth, handleUserProfile } from "../../firebase/utlis";
import { createUserWithEmailAndPassword } from "firebase/auth";

const initialState = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
  errors: [],
};

class SignUp extends Component {
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

  handleFormSubmit = async (event) => {
    event.preventDefault();
    const { displayName, email, password, confirmPassword, errors } =
      this.state;

    if (password !== confirmPassword) {
      const err = [`Passwords don't match!`];
      this.setState({
        errors: err,
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

      this.setState({
        ...initialState,
      });
    } catch (err) {
      alert(err)
      console.log(err);
    }
  };

  render() {
    const { displayName, email, password, confirmPassword, errors } =
      this.state;

    return (
      <div className="signUp">
        <div className="wrap">
          <h2>Sign up</h2>
          {errors.length > 0 && (
            <ul>
              {errors.map((err, idx) => {
                return <li key={idx}>{err}</li>;
              })}
            </ul>
          )}
          <div className="formWrap">
            <form onSubmit={this.handleFormSubmit}>
              <FormInput
                type="text"
                name="displayName"
                value={displayName}
                placeholder="Full Name"
                label={"Full Name"}
                onChange={this.handleChange}
              />
              <FormInput
                type="text"
                name="email"
                value={email}
                placeholder="Email"
                label={"Email"}
                onChange={this.handleChange}
              />
              <FormInput
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                label={"Password"}
                onChange={this.handleChange}
              />
              <FormInput
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm Password"
                label={"Confirm Password"}
                onChange={this.handleChange}
              />

              <Button type="submit">Register</Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
