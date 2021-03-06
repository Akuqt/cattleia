import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ITheme} from 'types';

const initialState: ITheme = {
  dark: false,
};

export const modeSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<boolean>) => {
      state.dark = action.payload;
    },
  },
});

export const {setMode} = modeSlice.actions;

export default modeSlice.reducer;
