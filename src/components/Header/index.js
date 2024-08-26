import React from "react";
import "./styles.scss";
import Logo from "./../../assets/logo.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { signOutUserStart } from "../../redux/User/actions";

const selectUser = (state) => state.user;

const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

const Header = (props) => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(signOutUserStart());
  };

  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="Sacramento Logo" />
          </Link>
        </div>

        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
          </ul>
        </nav>

        <div className="headerButtons">
          {currentUser && (
            <ul>
              <li>
                <Link to="/dashboard">my account</Link>
              </li>
              <li>
                <span onClick={() => signOut()}>log out</span>
              </li>
            </ul>
          )}
          {!currentUser && (
            <ul>
              <li>
                <Link to="/registration">register</Link>
              </li>
              <li>
                <Link to="/login">log in</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
