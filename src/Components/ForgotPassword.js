import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Card,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import EmailIcon from "@mui/icons-material/Email";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new URLSearchParams();
    formData.append("email", email);

    try {
      await axios.post(
        "http://localhost:8080/utilisateurs/forgot-password",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      alert("Please check your email for the password reset link."); // Notify user to check email
    } catch (error) {
      console.error("Forgot password error:", error);
      alert("Error sending email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Card sx={{ mt: 8, padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src="/images/logoCoWo.png" alt="CoWorking Logo" style={{ width: 100, marginBottom: 20 }} />
        <Typography variant="h5" gutterBottom>
          Reset Your Password
        </Typography>
        <Box
          component="form"
          onSubmit={handleEmailSubmit}
          noValidate
          sx={{ mt: 1, width: '100%' }}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              endAdornment: <EmailIcon color="action" />
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Send Reset Email"}
          </Button>
        </Box>
      </Card>
    </Container>
  );
}

export default ForgotPassword;
