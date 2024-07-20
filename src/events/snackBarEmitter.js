import React from "react";
import { EventEmitter } from "events";

const snackbarEmitter = new EventEmitter();

/**
 * Emits a 'showSnackbar' event with the provided message and duration.
 *
 * @param {string} message - The message to display in the snackbar.
 * @param {number} [duration=5000] - The duration in milliseconds for which the snackbar should be displayed.
 */
export const showSnackbar = (message, duration = 5000) => {
  snackbarEmitter.emit("showSnackbar", { message, duration });
};

/**
 * Registers a callback function to be called when the 'showSnackbar' event is emitted.
 *
 * @param {function} callback - The callback function to be called.
 * @return {function} A cleanup function to remove the event listener.
 */
export const useSnackbarEmitter = (callback) => {
  React.useEffect(() => {
    snackbarEmitter.on("showSnackbar", callback);
    return () => {
      snackbarEmitter.off("showSnackbar", callback);
    };
  }, [callback]);
};
