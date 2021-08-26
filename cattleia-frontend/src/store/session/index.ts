import { createSlice } from "@reduxjs/toolkit";
import { Session } from "./interfaces";

const session: Session = {
  name: "",
  userName: "",
  role: "",
  token: "",
};

const initialState = {
  currentSession: session,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    save: (state, action) => {},
    token: (state, action) => {},
    user: (state, action) => {},
  },
});

export const { save, token, user } = sessionSlice.actions;

export default sessionSlice.reducer;
