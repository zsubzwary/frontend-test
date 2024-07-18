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
