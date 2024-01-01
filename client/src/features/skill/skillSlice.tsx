import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import example from "../../test.json";

const initialState: Skill = example.skills ?? {};

export const skillSlice = createSlice({
  name: "skill",
  initialState,
  reducers: {
    reset: () => {
      return initialState;
    },
    update: (state, action: PayloadAction<Skill>) => {
      if (Object.keys(action.payload).length === 0) {
        return { ...state, current: {} };
      }
      return { ...state, ...action.payload };
    },
  },
});

export const { reset, update } = skillSlice.actions;
export default skillSlice.reducer;
