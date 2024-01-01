import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import example from "../../test.json";

// The initial state of the Redux state
const initialState: { current: Project; history: Project[] } = {
  current: {},
  history: example.project,
};

// Basically a wrapper for creating reducers
export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    reset: () => {
      return initialState;
    },
    // Calling this will update the current feature of the Redux state
    updateCurrent: (state, action: PayloadAction<Project>) => {
      if (Object.keys(action.payload).length === 0) {
        return { ...state, current: {} };
      }
      return { ...state, current: { ...state.current, ...action.payload } };
    },
    // Calling this will update the history feature of the Redux state
    updateHistory: (state, action: PayloadAction<Project[]>) => {
      console.log("HISTORY PROJECT UPDATED");
      return { ...state, history: action.payload };
    },
  },
});

export const { reset, updateCurrent, updateHistory } = projectSlice.actions;
export default projectSlice.reducer;
