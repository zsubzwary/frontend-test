import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
// import Issues from './Issues';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ProtectedRoutes } from "./util/ProtectedRoutes";
import Issues from "./pages/issues";
import { LightTheme } from "./themes/Light";
import { DarkTheme } from "./themes/Dark";
import { createTheme } from "@mui/material";
import MainLayout from "./components/layout/MainLayout";
import BlankPage from "./pages/blank";

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function App() {
  const [mode, setMode] = useState("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(() => createTheme(mode === "light" ? LightTheme : DarkTheme), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Router>
          <CssBaseline />
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route element={<MainLayout />} > 
                <Route path="/" element={<Dashboard />} />
                <Route path="/issues" element={<Issues />} />
                <Route path="/blank" element={<BlankPage />} />
              </Route>
            </Route>

            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
