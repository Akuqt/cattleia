import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {History, InitHistory} from 'types';

const history: History[] = [];

const initialState: InitHistory = {
  history,
};

export const historySlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    addHistory: (state, action: PayloadAction<History>) => {
      state.history.unshift(action.payload);
    },
    setHistory: (state, action: PayloadAction<History[]>) => {
      state.history = action.payload;
    },
  },
});

export const {addHistory, setHistory} = historySlice.actions;

export default historySlice.reducer;
