import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Card,
  CircularProgress,
  Alert,
  AlertTitle,
} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!token) {
    return (
      <Container component="main" maxWidth="xs">
        <Card sx={{ mt: 8, padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Alert severity="error">
            <AlertTitle>No Reset Token Provided</AlertTitle>
            Please make sure you have accessed this page from a valid reset password email link.
          </Alert>
        </Card>
      </Container>
    );
  }

  const handleResetSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);
    const formData = new URLSearchParams();
    formData.append("token", token);
    formData.append("newPassword", password);

    try {
      await axios.post(
        "http://localhost:8080/utilisateurs/reset-password",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      alert("Password has been reset successfully.");
      navigate("/login");
    } catch (error) {
      console.error("Reset password error:", error);
      alert("Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Card sx={{ mt: 8, padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src="/images/logoCoWo.png" alt="CoWorking Logo" style={{ height: 60, marginBottom: 20 }} />
        <Typography variant="h5" gutterBottom>
          Enter New Password
        </Typography>
        <Box
          component="form"
          onSubmit={handleResetSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="New Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: <LockResetIcon color="action" />
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm New Password"
            type="password"
            id="confirm-password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Reset Password"}
          </Button>
        </Box>
      </Card>
    </Container>
  );
}

export default ResetPassword;
