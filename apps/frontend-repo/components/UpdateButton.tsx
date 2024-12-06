import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../store/action'; 
import { RootState, AppDispatch } from '../store/store'; 

const UpdateButton: React.FC = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch<AppDispatch>(); 
  const { userData, loading, error } = useSelector((state: RootState) => state.user);
  console.log('Component userData:', userData); 
  const handleFetchUser = () => {
    if (email) {
      dispatch(fetchUserData(email));
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
        style={{
          width: '100%',
          marginBottom: '10px',
          padding: '10px',
          fontSize: '16px',
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleFetchUser}
        disabled={loading}
        style={{ marginBottom: '10px', width: '100%' }}
      >
        Fetch User Info
      </Button>
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      {userData && (
        <div>
          <Typography variant="h6">User Information</Typography>
          <Typography>Email: {userData.email || 'N/A'}</Typography>
          <Typography>Name: {userData.name || 'N/A'}</Typography>
          <Typography>Age: {userData.age || 'N/A'}</Typography>
        </div>
      )}
    </div>
  );
};
