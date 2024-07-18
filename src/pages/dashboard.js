import React from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom"; 
import { CssBaseline } from "@mui/material";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import NavigationMenu from "../components/navigationMenu";


export default function Dashboard() {

    return (
        <>
            <NavigationMenu />
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
        </>
    );
}

