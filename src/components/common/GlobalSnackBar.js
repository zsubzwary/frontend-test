// GlobalSnackbar.js
import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import { useSnackbarEmitter } from "../../events/snackBarEmitter";

const GlobalSnackbar = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    duration: 5000,
  });

  useSnackbarEmitter(({ message, duration }) => {
    setSnackbar({ open: true, message, duration });
  });

  const handleClose = () => {
    setSnackbar({ open: false, message: "", duration: 5000 });
  };

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={snackbar.duration}
      onClose={handleClose}
      message={snackbar.message}
    />
  );
};

export default GlobalSnackbar;
