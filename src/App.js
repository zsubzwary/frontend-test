import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ProtectedRoutes } from "./util/ProtectedRoutes";
import Issues from "./pages/Issues";
import { LightTheme } from "./themes/Light";
import { DarkTheme } from "./themes/Dark";
import { createTheme } from "@mui/material";
import MainLayout from "./components/layout/MainLayout";
import BlankPage from "./pages/Blank";

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
              <Route element={<MainLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/issues" element={<Issues />} />
                <Route path="/projects" element={<BlankPage />} />
                <Route path="/map" element={<BlankPage />} />
                <Route path="/planning" element={<BlankPage />} />
                <Route path="/gantt-chart" element={<BlankPage />} />
                <Route path="/calendar" element={<BlankPage />} />
                <Route path="/checklists" element={<BlankPage />} />
                <Route path="/checklists-child" element={<BlankPage />} />
                <Route path="/create-checklists" element={<BlankPage />} />
                <Route path="/resources" element={<BlankPage />} />
                <Route path="/teams" element={<BlankPage />} />
                <Route path="/employees" element={<BlankPage />} />
                <Route path="/settings" element={<BlankPage />} />
                <Route path="/partner-settings" element={<BlankPage />} />
                <Route path="/email-settings" element={<BlankPage />} />
                <Route path="/users" element={<BlankPage />} />
                <Route path="/product-settings" element={<BlankPage />} />
                <Route path="/offer" element={<BlankPage />} />
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
