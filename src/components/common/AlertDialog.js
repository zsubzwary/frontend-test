// AlertDialog.js
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import eventEmitter from "../../events/EventEmitter";

/**
 * Renders an alert dialog component.
 *
 * @return {JSX.Element} The alert dialog component.
 */
const AlertDialog = () => {
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState({
    title: "",
    message: "",
    onAgree: () => {},
    onDisagree: () => {},
    agreeText: "Agree",
    disagreeText: "Disagree",
  });

  useEffect(() => {
    const handleShowAlert = (title, message, onAgree, onDisagree, agreeText, disagreeText) => {
      setConfig({ title, message, onAgree, onDisagree, agreeText, disagreeText });
      setOpen(true);
    };

    eventEmitter.on("showAlert", handleShowAlert);

    return () => {
      eventEmitter.off("showAlert", handleShowAlert);
    };
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    config.onAgree();
    handleClose();
  };

  const handleDisagree = () => {
    config.onDisagree();
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{config.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{config.message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDisagree}>{config.disagreeText}</Button>
        <Button onClick={handleAgree} autoFocus>
          {config.agreeText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
