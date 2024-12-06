import React, { useState } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../apis/firebaseConfig";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccessMessage("Login Successful");
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  const handleRegister = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccessMessage("Registration Successful");
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        textAlign: "center",
        marginTop: 5,
        padding: 3,
        border: "1px solid #ccc",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Login/Register
      </Typography>

      {errorMessage && <Alert severity="error" sx={{ marginBottom: 2 }}>{errorMessage}</Alert>}
      {successMessage && <Alert severity="success" sx={{ marginBottom: 2 }}>{successMessage}</Alert>}

      <TextField
        label="Email"
        type="email"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ marginBottom: 3 }}
      />

      <Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          sx={{ marginRight: 1 }}
        >
          Login
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={handleRegister}
          sx={{ marginLeft: 1 }}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
}
