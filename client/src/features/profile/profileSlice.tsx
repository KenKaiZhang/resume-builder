import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import example from "../../test.json";

// The initial state of the Redux state
const initialState: Profile = example.profile;

// Basically a wrapper for creating reducers
export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    reset: () => {
      return initialState;
    },
    // Calling this will update a feature in the Redux state
    update: (state, action: PayloadAction<Profile>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { reset, update } = profileSlice.actions;
export default profileSlice.reducer;
