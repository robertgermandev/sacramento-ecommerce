import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { auth, handleUserProfile } from "./firebase/utlis";
import "./default.scss";
import Homepage from "./pages/Homepage";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import PasswordReset from "./pages/PasswordReset";
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";
import Dashboard from "./pages/Dashboard";
import { onSnapshot, doc } from "firebase/firestore";
import { setCurrentUser } from "./redux/User/actions";
import { connect } from "react-redux";
import WithAuth from "./hoc/withAuth";

const App = (props) => {
  const { setCurrentUser, currentUser } = props;
  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        try {
          const userRef = await handleUserProfile(userAuth);
          if (userRef) {
            onSnapshot(userRef, (snapshot) => {
              setCurrentUser({
                id: snapshot.id,
                ...snapshot.data(),
              });
            });
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        setCurrentUser(userAuth);
      }
    });

    return () => {
      authListener();
    };
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <HomepageLayout>
              <Homepage />
            </HomepageLayout>
          }
        />
        <Route
          path="/registration"
          element={
            <MainLayout>
              <Registration />
            </MainLayout>
          }
        />
        <Route
          path="/login"
          element={
            <MainLayout>
              <Login />
            </MainLayout>
          }
        />
        <Route
          path="/password-reset"
          element={
            <MainLayout>
              <PasswordReset />
            </MainLayout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <WithAuth>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </WithAuth>
          }
        />
      </Routes>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
