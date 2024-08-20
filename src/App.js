import React, { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { auth, handleUserProfile } from "./firebase/utlis";
import "./default.scss";
import Homepage from "./pages/Homepage";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";
import { onSnapshot, doc } from "firebase/firestore";

const initialState = {
  currentUser: null,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
  }

  authListener = null;

  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        try {
          const userRef = await handleUserProfile(userAuth);
          if (userRef) {
            onSnapshot(userRef, (snapshot) => {
              this.setState({
                currentUser: {
                  id: snapshot.id,
                  ...snapshot.data(),
                },
              });
            });
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        this.setState({
          ...initialState,
        });
      }
    });
  }

  componentWillUnmount() {
    this.authListener();
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <HomepageLayout currentUser={currentUser}>
                <Homepage />
              </HomepageLayout>
            }
          />
          <Route
            path="/registration"
            element={
              currentUser ? (
                <Navigate to="/" />
              ) : (
                <MainLayout currentUser={currentUser}>
                  <Registration />
                </MainLayout>
              )
            }
          />
          <Route
            path="/login"
            element={
              currentUser ? (
                <Navigate to="/" />
              ) : (
                <MainLayout currentUser={currentUser}>
                  <Login />
                </MainLayout>
              )
            }
          />
        </Routes>
      </div>
    );
  }
}

export default App;
