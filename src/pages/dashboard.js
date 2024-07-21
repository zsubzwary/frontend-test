import React, { useEffect } from "react";
import { CssBaseline } from "@mui/material";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { isUserLoggedIn } from "../util/Helper";
import { useNavigate } from "react-router-dom";

/**
 * Renders the Dashboard component with a welcome message.
 *
 * @return {JSX.Element} The rendered Dashboard component.
 */
export default function Dashboard() {

  const navigate = useNavigate()
  useEffect(() => {
    if(!isUserLoggedIn()){
      navigate("/login");
    }
  }, [])

  return (
    <Box>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
        }}
      >
        <Typography variant="h2" gutterBottom>
          Welcome to Dashboard
        </Typography>
      </Box>
    </Box>
  );
}
