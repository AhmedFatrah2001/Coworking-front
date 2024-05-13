import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Card,
  Grid,
  Link,
  Alert,
} from "@mui/material";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import LoginIcon from "@mui/icons-material/Login";

function LoginForm() {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve the state passed to this route, default to navigating to "/"
  const { from } = location.state || { from: { pathname: "/" } };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.username = values.username ? "" : "This field is required.";
    tempErrors.password = values.password ? "" : "This field is required.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/auth/login",
          {
            username: values.username,
            password: values.password,
          }
        );
        if (response.data && response.data.token) {
          login(response.data);
          navigate(from.pathname);  // Navigate to the intended path
        }
      } catch (error) {
        console.error("Login error:", error);
        setLoginError("Login failed. Check username and password.");
      }
    }
  };

  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        sx={{
          backgroundImage: "url(/images/background.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "absolute",
          height: "100%",
          width: "100%",
          zIndex: -1,
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={4}
        sx={{
          m: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
        }}
      >
        <Card sx={{ p: 3, width: "100%", maxWidth: 360 }} elevation={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <img
              src="/images/logoCoWo.png"
              alt="Logo"
              style={{ width: 320, marginBottom: 20 }}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LoginIcon
                sx={{ fontSize: 40, color: "primary.main" }}
              />
              <Typography variant="h6">Login</Typography>
            </Box>
            {loginError && (
              <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                {loginError}
              </Alert>
            )}
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1, width: "100%" }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={values.username}
                onChange={handleChange("username")}
                error={!!errors.username}
                helperText={errors.username}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={values.password}
                onChange={handleChange("password")}
                error={!!errors.password}
                helperText={errors.password}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    component={RouterLink}
                    to="/forgot-password"
                    variant="body2"
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link component={RouterLink} to="/signup" variant="body2">
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}

export default LoginForm;
