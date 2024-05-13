import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Card,
  Grid,
  Link,
  Snackbar,
  Alert,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

function SignupForm() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [signupError, setSignupError] = useState("");
  const navigate = useNavigate();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const validateForm = () => {
    let tempErrors = {};
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    tempErrors.email = emailRegex.test(values.email)
      ? ""
      : "Enter a valid email address.";
    tempErrors.username = values.username ? "" : "This field is required.";
    tempErrors.password = values.password ? "" : "This field is required.";
    tempErrors.confirmPassword =
      values.confirmPassword && values.confirmPassword === values.password
        ? ""
        : "Passwords must match and cannot be empty.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/auth/register",
          {
            username: values.username,
            email: values.email,
            password: values.password,
            role: "USER",
          }
        );
        if (response.status === 200) {
          setOpenSnackbar(true);
        }
      } catch (error) {
        console.error("Registration error:", error);
        setSignupError("Failed to register. Please try again later.");
      }
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
    navigate("/login");
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
              style={{ width: 260, marginBottom: 20 }}
            />
            <AppRegistrationIcon
              sx={{ fontSize: 40, color: "primary.main" }}
            />
            <Typography variant="h6">Register</Typography>
            {signupError && (
              <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
                {signupError}
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
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={values.email}
                onChange={handleChange("email")}
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirm-password"
                value={values.confirmPassword}
                onChange={handleChange("confirmPassword")}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Already have an account?
                <Link component={RouterLink} to="/login" sx={{ ml: 1 }}>
                  Login
                </Link>
              </Typography>
            </Box>
          </Box>
        </Card>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          User registered successfully! Click to continue.
        </Alert>
      </Snackbar>
    </Grid>
  );
}

export default SignupForm;
