import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from './pages/dashboard';
// import Issues from './Issues';
import { CssBaseline } from "@mui/material";
import { ProtectedRoutes } from "./util/ProtectedRoutes";

function App() {
  return (
    <Router>
      <CssBaseline />
      <Routes>
          <Route element={<ProtectedRoutes/>}>
            <Route path="/" element={<Dashboard/>} />
          </Route>

          <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
