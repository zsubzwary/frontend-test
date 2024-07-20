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
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff, PersonOutline, LockOutlined } from "@mui/icons-material";
import { ReactComponent as EyeIcon } from "../assets/eye.svg";
import { ReactComponent as LoginSVG } from "../assets/login.svg";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { isUserLoggedIn } from "../util/helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useMemo } from "react";

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
    } else {
      e.preventDefault();
    }
  };

  // Responsive UI Wrappers Start
  const LoginLeftSideWrapper = useMemo(
    () =>
      styled(Box)(({ theme }) => ({
        [theme.breakpoints.down("xl")]: {
          paddingInlineStart: "2rem",
          alignItems: "center",
          justifyContent: "center",
        },
        [theme.breakpoints.down("lg")]: {
          paddingInlineStart: "2rem",
          alignItems: "center",
          justifyContent: "center",
        },
        [theme.breakpoints.down("md")]: {
          alignItems: "center",
          justifyContent: "center",
        },
      })),
    []
  );
  const LoginRightSideWrapper = styled(Box)(({ theme }) => ({
    flex: 1,
    [theme.breakpoints.up("md")]: {
      height: "100%",
      marginBottom: "10rem",
      flex: 1,
      height: "100%",
      marginBottom: "10rem",
    },
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));
  const LoginSVGWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "end",
    justifyContent: "end",
    [theme.breakpoints.down("xl")]: {
      bgcolor: "red",
      width: "800px",
      alignItems: "end",
      justifyContent: "end",
    },
    [theme.breakpoints.down("lg")]: {
      bgcolor: "red",
      width: "600px",
      alignItems: "end",
      justifyContent: "end",
    },
  }));
  // Responsive UI Wrappers End

  return (
    <Box fullWidth>
      <Container style={{ height: "100vh" }} maxWidth="xl">
        <Box display="flex" justifyItems={"center"} justifyContent={"center"} height="100%" gap={4}>
          {/* Left Side of The Page Start */}
          <LoginLeftSideWrapper sx={{ width: "300px" }}>
            <Box display="flex" margin="auto" mt="10rem" mb="5rem" width="fit-content">
              <Logo />
            </Box>

            <form ref={loginFormRef}>
              <h2
                style={{
                  fontSize: "18px !important",
                  fontWeight: 400,
                  fontFamily: "Helvetica",
                  textAlign: "center",
                }}
              >
                Login to your account
              </h2>
              <TextField
                hiddenLabel
                placeholder=" Username"
                error={usernameError === false ? false : true}
                helperText={usernameError}
                onBlur={validateUsername}
                required
                fullWidth
                margin="normal"
                size="small"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <Box sx={{ paddingInlineStart: "0.3rem", paddingInlineEnd: "0.3rem" }}>
                      {" "}
                      <FontAwesomeIcon icon={faUser} />{" "}
                    </Box>
                  ),
                }}
              />
              <TextField
                hiddenLabel
                placeholder=" Password"
                error={passwordError === false ? false : true}
                helperText={passwordError}
                onBlur={validatePassword}
                required
                fullWidth
                margin="normal"
                size="small"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? (
                          <FontAwesomeIcon icon={faEyeSlash} />
                        ) : (
                          <FontAwesomeIcon icon={faEye} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                  startAdornment: (
                    <Box sx={{ paddingInlineStart: "0.3rem", paddingInlineEnd: "0.3rem" }}>
                      <FontAwesomeIcon icon={faLock} />
                    </Box>
                  ),
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={keepLoggedIn}
                    onChange={(e) => setKeepLoggedIn(e.target.checked)}
                  />
                }
                alignItems="center"
                sx={{
                  fontSize: "13px",
                  fontWeight: 400,
                  my: "20px",
                }}
                label="Keep me logged in"
              />
              <Box>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={(e) => handleLogin(e)}
                >
                  Login
                </Button>
                {/* <CutomButton onClickHandler={handleLogin} fullWidthCheck={true} /> */}
              </Box>
            </form>
          </LoginLeftSideWrapper>
          {/* Left Side of The Page End */}

          {/* Right Side of The Page Start */}
          <LoginRightSideWrapper>
            <LoginSVGWrapper sx={{ height: "100%" }}>
              <LoginSVG />
            </LoginSVGWrapper>
          </LoginRightSideWrapper>
          {/* Right Side of The Page End */}
        </Box>
      </Container>
    </Box>
  );
}

export default Login;
