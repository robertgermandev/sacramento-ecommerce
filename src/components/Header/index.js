import React from "react";
import "./styles.scss";
import Logo from "./../../assets/logo.png";
import { Link } from "react-router-dom";
import { auth } from "./../../firebase/utlis";
import { connect } from "react-redux";

const Header = ({ currentUser = null }) => {
  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="Sacramento Logo" />
          </Link>
        </div>

        <div className="headerButtons">
          {currentUser && (
            <ul>
              <li>
                <span onClick={() => auth.signOut()}>Log out</span>
              </li>
            </ul>
          )}
          {!currentUser && (
            <ul>
              <li>
                <Link to="/registration">Register</Link>
              </li>
              <li>
                <Link to="/login">Log in</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

export default connect(mapStateToProps, null)(Header);
