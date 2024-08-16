import React from "react";
import { Route, Routes } from "react-router-dom";
import "./default.scss";
import Homepage from "./pages/Homepage";
import Registration from "./pages/Registration";
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";

function App() {
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
      </Routes>
    </div>
  );
}

export default App;
