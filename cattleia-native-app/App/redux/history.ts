import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {History} from '../types';

const history: History[] = [];

interface Init {
  history: History[];
}

const initialState: Init = {
  history,
};

export const historySlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    addHistory: (state, action: PayloadAction<History>) => {
      state.history.push(action.payload);
    },
  },
});

export const {addHistory} = historySlice.actions;

export default historySlice.reducer;
