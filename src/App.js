import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./default.scss";
import Homepage from "./pages/Homepage";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import PasswordReset from "./pages/PasswordReset";
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";
import Dashboard from "./pages/Dashboard";
import { checkUserSession } from "./redux/User/actions";
import { useDispatch } from "react-redux";
import WithAuth from "./hoc/withAuth";
import Admin from "./pages/Admin";
import WithAdminAuth from "./hoc/withAdminAuth";
import AdminToolbar from "./components/AdminToolbar";
import AdminLayout from "./layouts/AdminLayout";
import DashBoardLayout from "./layouts/DashboardLayout";
import Search from "./pages/Search";

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <div className="App">
      <AdminToolbar />
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
          path="/search"
          element={
            <MainLayout>
              <Search />
            </MainLayout>
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
              <DashBoardLayout>
                <Dashboard />
              </DashBoardLayout>
            </WithAuth>
          }
        />
        <Route
          path="/admin"
          element={
            <WithAdminAuth>
              <AdminLayout>
                <Admin />
              </AdminLayout>
            </WithAdminAuth>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
