import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UserProfile } from "../types";

export interface TAuthState {
  isAuth: boolean;
  profile: UserProfile | undefined;
}

const initialState: TAuthState = {
  isAuth: false,
  profile: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
    },
  },
});

export const { setAuth, setProfile } = authSlice.actions;

export const AuthReducer = authSlice.reducer;
