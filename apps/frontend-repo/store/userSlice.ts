import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUserData } from './action';

interface UserData {
  name: string;
  email: string;
  age?: number;
}

interface UserState {
  userData: UserData | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userData: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData>) => {
      state.userData = action.payload;
    },
    clearUser: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        console.log('Fetching user info...');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.loading = false;
        state.userData = action.payload;
        console.log('User data fetched:', action.payload);
      })
      .addCase(fetchUserData.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Error fetching user data';
        console.log('Fetch failed:', action.payload);
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;