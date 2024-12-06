import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { loginUser, fetchUserData, updateUserData } from '../apis/userApi'; // Adjust the import path

interface LoginFormProps {
  setIsRegistering: (value: boolean) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ setIsRegistering }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState<any>(null); // Store fetched user data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updatedData, setUpdatedData] = useState({ name: '', age: 0,email:'' ,password:''}); // New data for user update

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const loginResponse = await loginUser(email, password);
      console.log('Login successful:', loginResponse);

      // Now fetch user data after login
      const userData = await fetchUserData(email);
      setUserData(userData); // Store the fetched user data
      console.log('Fetched user data:', userData);

      // Optionally, set the token or additional login actions here
    } catch (err: any) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!updatedData.name || !updatedData.age) {
      setError('Name and age are required');
      return;
    }

    try {
      await updateUserData(updatedData); 
      setUserData({ ...userData, ...updatedData }); 
      setError(null); // Clear any previous error
      console.log('User data updated successfully');
    } catch (err) {
      setError('Failed to update user data');
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: 'auto',
        padding: 2,
        border: '1px solid #ddd',
        borderRadius: 2,
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Login
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
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? 'Logging In...' : 'Login'}
      </Button>

      {error && (
        <Typography sx={{ marginTop: 2, color: 'red' }}>
          {error}
        </Typography>
      )}

      {/* Display user data if fetched */}
      {userData && (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6">User Info:</Typography>
          <Typography>Email: {userData.email}</Typography>
          <Typography>Name: {userData.name}</Typography>
          <Typography>Age: {userData.age}</Typography>

          {/* Update User Form */}
          <Typography variant="h6" sx={{ marginTop: 2 }}>Update User Data</Typography>
          <TextField
            label="Name"
            fullWidth
            value={updatedData.name}
            onChange={(e) => setUpdatedData({ ...updatedData, name: e.target.value })}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Age"
            type="number"
            fullWidth
            value={updatedData.age}
            onChange={(e) => setUpdatedData({ ...updatedData, age: Number(e.target.value) })}
            sx={{ marginBottom: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleUpdate}
            sx={{ marginTop: 2 }}
          >
            Update User Data
          </Button>
        </Box>
      )}

      <Typography sx={{ marginTop: 2 }}>
        Don't have an account?{' '}
        <Button variant="text" onClick={() => setIsRegistering(true)}>
          Register
        </Button>
      </Typography>
    </Box>
  );
};

export default LoginForm;
