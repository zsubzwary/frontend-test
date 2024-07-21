import eventEmitter from "./EventEmitter";

/**
 * Displays an alert dialog with the given title, message, and callback functions for agree and disagree.
 *
 * @param {string} title - The title of the alert dialog.
 * @param {string} message - The message to be displayed in the alert dialog.
 * @param {function} onAgree - The callback function to be executed when the agree button is clicked.
 * @param {function} onDisagree - The callback function to be executed when the disagree button is clicked.
 * @param {string} [agreeText="Agree"] - The text to be displayed on the agree button.
 * @param {string} [disagreeText="Disagree"] - The text to be displayed on the disagree button.
 * @return {void} This function does not return anything.
 */
export const showAlert = (title, message, onAgree, onDisagree, agreeText = "Agree", disagreeText = "Disagree") => {
  eventEmitter.emit("showAlert", title, message, onAgree, onDisagree, agreeText, disagreeText);
};
