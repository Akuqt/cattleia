import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User, IAuth} from 'types';

const initialState: IAuth = {
  user: {
    name: '',
    token: '',
    userName: '',
    role: '',
    id: '',
    email: '',
    account: {
      hasAccount: false,
      balance: {ctt: 0, eth: 0, nft: {tokens: [], total: 0}},
      address: '',
    },
    rank: {
      color: '#000',
      name: '',
      points: 200,
      next: {
        color: '#000',
        points: 300,
        name: 'Bronze',
      },
    },
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
