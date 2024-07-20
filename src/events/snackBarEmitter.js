import React from "react";
import { EventEmitter } from "events";

const snackbarEmitter = new EventEmitter();

export const showSnackbar = (message, duration = 5000) => {
  snackbarEmitter.emit("showSnackbar", { message, duration });
};

export const useSnackbarEmitter = (callback) => {
  React.useEffect(() => {
    snackbarEmitter.on("showSnackbar", callback);
    return () => {
      snackbarEmitter.off("showSnackbar", callback);
    };
  }, [callback]);
};
