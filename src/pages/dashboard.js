import React from "react";
import { CssBaseline } from "@mui/material";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

export default function Dashboard() {
  return (
    <Box>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome to Dashboard
        </Typography>
      </Box>
    </Box>
  );
}
