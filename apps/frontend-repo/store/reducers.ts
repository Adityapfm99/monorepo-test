import { UserData } from '../apis/userApi';
import { fetchUserData } from './action'; // Adjust path if needed

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

const extraReducers = {
  [fetchUserData.pending.type]: (state: UserState) => {
    state.loading = true;
    state.error = null;
  },
  [fetchUserData.fulfilled.type]: (state: UserState, action: { payload: UserData }) => {
    state.loading = false;
    state.userData = action.payload;
  },
  [fetchUserData.rejected.type]: (state: UserState, action: { payload: string | undefined }) => {
    state.loading = false;
    state.error = action.payload || 'Failed to fetch user data';
  },
};