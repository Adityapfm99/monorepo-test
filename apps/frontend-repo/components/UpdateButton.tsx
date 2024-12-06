import { Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { fetchUserData } from '../apis/userApi';
import React from 'react';

export default function UpdateButton() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const handleFetchUser = async () => {
    const data = await fetchUserData('YOUR_TOKEN');
    console.log(data);
  };

  return (
    <Button variant="contained" onClick={handleFetchUser}>
      Fetch User Data
    </Button>
  );
}
