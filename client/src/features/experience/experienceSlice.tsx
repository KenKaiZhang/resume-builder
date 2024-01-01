import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import example from "../../test.json";

// The initial state of the Redux state
const initialState: { current: Experience; history: Experience[] } = {
  current: {},
  history: example.experience,
};

// Basically a wrapper for creating reducers
export const experienceSlice = createSlice({
  name: "experience",
  initialState,
  reducers: {
    reset: () => {
      return initialState;
    },
    // Calling this will update the current feature of the Redux state
    updateCurrent: (state, action: PayloadAction<Experience>) => {
      if (Object.keys(action.payload).length === 0) {
        return { ...state, current: {} };
      }
      return { ...state, current: { ...state.current, ...action.payload } };
    },
    // Calling this will update the history feature of the Redux state
    updateHistory: (state, action: PayloadAction<Experience[]>) => {
      return { ...state, history: action.payload };
    },
  },
});

export const { reset, updateCurrent, updateHistory } = experienceSlice.actions;
export default experienceSlice.reducer;
