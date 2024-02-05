import { ColorScheme } from "@mantine/core";
import { createSlice } from "@reduxjs/toolkit";

export interface LayoutState {
  color: ColorScheme;
}

const persistedValue =
  localStorage.getItem("theme") != null ? localStorage.getItem("theme") : "light";

const initialState: LayoutState = {
  color:
    persistedValue === "light" || persistedValue === "dark" ? persistedValue : "light",
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const newColor = state.color === "dark" ? "light" : "dark";
      state.color = newColor;
      localStorage.setItem("theme", newColor);
    },
  },
});

export const { toggleTheme } = layoutSlice.actions;

export const LayoutReducer = layoutSlice.reducer;
