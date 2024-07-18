import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  FormControl,
} from "@mui/material";
import { Visibility, VisibilityOff, PersonOutline, LockOutlined } from "@mui/icons-material";
import { ReactComponent as EyeIcon } from "../assets/eye.svg";
import { isUserLoggedIn } from "../util/helper";

/**
 * Renders the login form for user authentication.
 * If login is sucessful user will be navigated to "/"
 */
function Login() {
  const passwordMinLength = 8;
  const passwordMaxLength = 30;
  const usernameMinLength = 6;
  const usernameMaxLength = 20;

  const loginFormRef = React.useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const isAuthenticated = isUserLoggedIn();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, []);

  const validatePassword = () => {
    let passwordLength = password.length;
    if (passwordLength === 0) {
      return;
    }

    if (passwordLength < passwordMinLength || passwordLength > passwordMaxLength) {
      setPasswordError(
        `Password must be at between ${passwordMinLength} and ${passwordMaxLength} characters long`
      );
      return false;
    } else {
      setPasswordError(false);
      return true;
    }
  };

  const validateUsername = () => {
    let validCharactersRegex = /^[a-zA-Z0-9_-]+$/;
    let usernameLength = username.length;
    if (usernameLength === 0) {
      return;
    }

    if (usernameLength < usernameMinLength || usernameLength > usernameMaxLength) {
      setUsernameError(
        `Username must be between ${usernameMinLength} and ${usernameMaxLength} characters long`
      );
      return false;
    } else if (!validCharactersRegex.test(username)) {
      setUsernameError("Username can only contain letters, digits, underscore (_) and hyphen (-)");
      return false;
    } else {
      setUsernameError(false);
      return true;
    }
  };

  const handleLogin = (e) => {
    let isFormFilled = loginFormRef.current.reportValidity();
    const usernameValid = validateUsername();
    const passwordValid = validatePassword();

    if (username && password && isFormFilled && usernameValid && passwordValid) {
      if (keepLoggedIn) {
        localStorage.setItem("loggedIn", "true");
      } else {
        sessionStorage.setItem("loggedIn", "true");
      }
      navigate("/");
    }
    else {
      e.preventDefault();
    }
  };

  return (
    <Container maxWidth="sm">
      <form ref={loginFormRef}>
        <h2>Login to your account</h2>
        <TextField
          error={usernameError === false ? false : true}
          helperText={usernameError}
          onBlur={validateUsername}
          required
          fullWidth
          margin="normal"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          InputProps={{
            startAdornment: <PersonOutline />,
          }}
        />

        <TextField
          error={passwordError === false ? false : true}
          helperText={passwordError}
          onBlur={validatePassword}
          required
          fullWidth
          margin="normal"
          type={showPassword ? "text" : "password"}
          label="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
            startAdornment: <LockOutlined />,
          }}
        />
        <FormControlLabel
          control={
            <Checkbox checked={keepLoggedIn} onChange={(e) => setKeepLoggedIn(e.target.checked)} />
          }
          label="Keep me logged in"
        />
        <Button variant="contained" color="primary" onClick={(e) => handleLogin(e)}>
          Login
        </Button>
      </form>
    </Container>
  );
}

export default Login;
