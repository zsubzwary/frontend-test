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
    }
    finally {
        return isLogoutSuccessful;
    }
}


/**
 * Checks if the user is logged in by checking the "loggedIn" item in both localStorage and sessionStorage.
 *
 * @return {boolean} Returns true if the user is logged in, false otherwise.
 */
export const isUserLoggedIn = () => {
    let auth = false;
    try {
        auth = (localStorage.getItem("loggedIn") === "true" || sessionStorage.getItem("loggedIn") === "true");
    } catch (error) {
        console.error(error);
    }
    finally {
        return auth;
    }
}
