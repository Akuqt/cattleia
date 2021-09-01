import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../types';

interface Init {
  user: User;
}

const initialState: Init = {
  user: {
    name: '',
    token: '',
    userName: '',
    role: '',
    id: '',
    email: '',
  },
};

export const userSlide = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearUser: state => {
      state.user = initialState.user;
    },
  },
});

export const {saveUser, clearUser} = userSlide.actions;

export default userSlide.reducer;
