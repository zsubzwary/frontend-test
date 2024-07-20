import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from './pages/dashboard';
// import Issues from './Issues';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ProtectedRoutes } from "./util/ProtectedRoutes";
import Issues from "./pages/issues";
import { DefaultTheme } from "./themes/default";
import {createTheme} from "@mui/material";

const theme = createTheme(DefaultTheme);

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <CssBaseline />
      <Routes>
          <Route element={<ProtectedRoutes/>}>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/issues" element={<Issues />} />
          </Route>

          <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;
