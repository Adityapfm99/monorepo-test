import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserInfo, UserData } from '../apis/userApi'; // Adjust path if needed

export const fetchUserData = createAsyncThunk<UserData, string, { rejectValue: string }>(
  'user/fetchUserData',
  async (email, { rejectWithValue }) => {
    try {
      return await fetchUserInfo(email);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Error fetching user data');
    }
  }
);