import React, { useState } from "react";
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

function Login() {
  const passwordMinLength = 8;
  const loginFormRef = React.useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const navigate = useNavigate();
  
  const handlePasswordChange = e => {
    setPassword(e.target.value);
    console.log(e.target.value.length);
    if (e.target.value.length < passwordMinLength) {
      setPasswordError("Password must be at least 8 characters long");
    } else {
      setPasswordError(false);
    }

  };
  const handleLogin = (e) => {
    let isFormFilled = loginFormRef.current.reportValidity();
    if(password.length < passwordMinLength) {
      e.preventDefault();
      return;
    }

    if (username && password) {
      if (keepLoggedIn) {
        localStorage.setItem("loggedIn", "true");
      } else {
        sessionStorage.setItem("loggedIn", "true");
      }
      navigate("/dashboard");
    }
  };

  return (
    <Container maxWidth="sm">
      <form ref={loginFormRef}>
        <h2>Login to your account</h2>
        <TextField
          required
          fullWidth
          margin="normal"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          InputProps={{
            type: "email",
            startAdornment: <PersonOutline />,
          }}
        />
        
        <TextField
          error={passwordError}
          helperText={passwordError}
          onBlur={handlePasswordChange}
          required
          fullWidth
          margin="normal"
          type={showPassword ? "text" : "password"}
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
      </form>
    </Container>
  );
}

export default Login;
