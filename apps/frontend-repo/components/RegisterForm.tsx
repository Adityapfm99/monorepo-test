import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { registerUser } from "../apis/userApi"; 

const RegisterForm: React.FC<{ setIsRegistering: (value: boolean) => void }> = ({ setIsRegistering }) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState<number>(0);
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = async () => {
    if (!email || !name || !password || !age) {
      setErrorMessage("All fields are required");
      return;
    }

    try {
        const response = await registerUser(email, name, age, password);
        console.log("Registration successful:", response);
        
        // Show success message
        setSuccessMessage("Registration successful! Redirecting to login...");
  
        // Wait for a few seconds before redirecting to login
        setTimeout(() => {
          setIsRegistering(false); // Redirect to login form
        }, 2000); // You can adjust the timeout duration
  
      } catch (error: any) {
        setErrorMessage(error.message || "Registration failed");
      }
    };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        padding: 2,
        border: "1px solid #ddd",
        borderRadius: 2,
        textAlign: "center",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Register
      </Typography>
      <TextField
        label="Email"
        type="email"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Name"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Age"
        type="number"
        fullWidth
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleRegister}
      >
        Register
      </Button>
      {errorMessage && (
        <Typography color="error" sx={{ marginTop: 2 }}>
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
};

export default RegisterForm;
