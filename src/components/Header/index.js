import React, { useState } from "react";
import "./styles.scss";
import Logo from "./../../assets/logo.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOutUserStart } from "../../redux/User/actions";
import { selectCartItemsCount } from "../../redux/Cart/selectors";
import { selectCurrentUser } from "../../redux/User/selectors";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentUser = useSelector(selectCurrentUser);
  const totalNumCartItems = useSelector(selectCartItemsCount);
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(signOutUserStart());
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="Sacramento Logo" />
          </Link>
        </div>

        <div className="menuToggle" onClick={toggleMenu}>
          <div className={`bar ${isMenuOpen ? "open" : ""}`}></div>
          <div className={`bar ${isMenuOpen ? "open" : ""}`}></div>
          <div className={`bar ${isMenuOpen ? "open" : ""}`}></div>
        </div>

        <nav className={`nav ${isMenuOpen ? "open" : ""}`}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
            {currentUser && (
              <>
                <li>
                  <Link to="/cart">your cart ({totalNumCartItems})</Link>
                </li>
                <li>
                  <Link to="/dashboard">my account</Link>
                </li>
                <li>
                  <span onClick={signOut}>log out</span>
                </li>
              </>
            )}
            {!currentUser && (
              <>
                <li>
                  <Link to="/registration">register</Link>
                </li>
                <li>
                  <Link to="/login">log in</Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        <div className={`headerButtons ${isMenuOpen ? "hide" : ""}`}>
          <ul>
            <li>
              <Link to="/">home</Link>
            </li>
            <li>
              <Link to="/search">search</Link>
            </li>
            {currentUser && (
              <>
                <li>
                  <Link to="/cart">your cart ({totalNumCartItems})</Link>
                </li>
                <li>
                  <Link to="/dashboard">my account</Link>
                </li>
                <li>
                  <span onClick={signOut}>log out</span>
                </li>
              </>
            )}
            {!currentUser && (
              <>
                <li>
                  <Link to="/registration">register</Link>
                </li>
                <li>
                  <Link to="/login">log in</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
