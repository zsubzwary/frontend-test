/**
 * Logs out the user by removing the "loggedIn" item from both localStorage and sessionStorage.
 *
 * @return {boolean} Returns true if the logout was successful, false otherwise.
 */
export const logout = () => {
  let isLogoutSuccessful = false;
  try {
    localStorage.removeItem("loggedIn");
    sessionStorage.removeItem("loggedIn");
    isLogoutSuccessful = true;
  } catch (error) {
    console.error(error);
  } finally {
    return isLogoutSuccessful;
  }
};

/**
 * Checks if the user is logged in by checking the "loggedIn" item in both localStorage and sessionStorage.
 *
 * @return {boolean} Returns true if the user is logged in, false otherwise.
 */
export const isUserLoggedIn = () => {
  let auth = false;
  try {
    auth =
      localStorage.getItem("loggedIn") === "true" ||
      sessionStorage.getItem("loggedIn") === "true";
  } catch (error) {
    console.error(error);
  } finally {
    return auth;
  }
};

/**
 * Retrieves the login method used by the user.
 *
 * @return {string} The login method used by the user. Possible values are "localStorage", "sessionStorage", "" or "error".
 */
export const getUserLoginMethod = () => {
  try {
    if (localStorage.getItem("loggedIn") === "true") {
      return "localStorage";
    } else if (sessionStorage.getItem("loggedIn") === "true") {
      return "sessionStorage";
    } else {
      return "";
    }
  } catch (error) {
    console.error(error);
    return "error";
  }
};

/**
 * Transforms input data into a new format with 'value' and 'label' properties.
 * Primary use-case is for react-select
 *
 * @param {Array} data - The input data array to be transformed.
 * @return {Array} The transformed data array with 'value' and 'label' properties.
 */
export const dataTransformer = (data) => {
  return data.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });
};
