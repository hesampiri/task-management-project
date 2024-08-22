import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

const themeSlice = createSlice({
  name: "theme",
  initialState: "light",
  reducers: {
    toggleTheme: (state) => {
      return state === "light" ? "dark" : "light"
    },
  },
});


export const {toggleTheme} = themeSlice.actions
export const selectTheme = (state: RootState) => state.theme;
export default themeSlice.reducer

