import React, { useState } from "react";
import { Box } from "@mui/material";
import NavigationMenu from "../NavigationMenu";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <Box>
      <NavigationMenu />
      <Outlet />
    </Box>
  );
};

export default MainLayout;
