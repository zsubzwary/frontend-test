import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import { useSnackbarEmitter } from "../../events/SnackBarEmitter";

/**
 * Renders a global snackbar component.
 *
 * @return {JSX.Element} The rendered snackbar component.
 */
const GlobalSnackbar = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    duration: 5000,
  });

  useSnackbarEmitter(({ message, duration }) => {
    setSnackbar({ open: true, message, duration });
  });

/**
 * Handles the close event of the snackbar.
 *
 * @param {Event} event - The event object.
 * @param {string} reason - The reason for the close event.
 * @return {void}
 */
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

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
