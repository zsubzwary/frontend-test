import eventEmitter from "./EventEmitter";

export const showAlert = (title, message, onAgree, onDisagree, agreeText = "Agree", disagreeText = "Disagree") => {
  eventEmitter.emit("showAlert", title, message, onAgree, onDisagree, agreeText, disagreeText);
};
