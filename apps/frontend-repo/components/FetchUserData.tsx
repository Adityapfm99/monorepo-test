import React, { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { fetchUserData } from '../apis/userApi'; 
import { UserData } from '../apis/userApi'; 

const FetchUserData: React.FC = () => {
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchUserData = async () => {
    if (!email) {
      setError('Email is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchUserData(email);
      setUserData(data);
    } catch (err: any) {
      setError('Failed to fetch user data');
    } finally {
      setLoading(false);
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
        Fetch User Data
      </Typography>
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: '10px', width: '100%' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleFetchUserData}
        disabled={loading}
        fullWidth
      >
        {loading ? 'Loading...' : 'Fetch User Data'}
      </Button>

      {error && (
        <Typography color="error" sx={{ marginTop: 2 }}>
          {error}
        </Typography>
      )}

      {userData && (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6">User Info:</Typography>
          <Typography>Email: {userData.email}</Typography>
          <Typography>Name: {userData.name}</Typography>
          <Typography>Age: {userData.age}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default FetchUserData;
