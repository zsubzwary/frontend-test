import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/login";
// import Dashboard from './Dashboard';
// import Issues from './Issues';
import { CssBaseline } from "@mui/material";

const ProtectedRoute = ({ element }) => {
  const isLoggedIn =
    localStorage.getItem("loggedIn") === "true" || sessionStorage.getItem("loggedIn") === "true";
  return isLoggedIn ? element : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
                <Route path="/issues" element={<ProtectedRoute element={<Issues />} />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
