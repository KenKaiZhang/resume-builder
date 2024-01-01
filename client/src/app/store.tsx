import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../features/profile/profileSlice";
import educationReducer from "../features/education/educationSlice";
import experienceReducer from "../features/experience/experienceSlice";
import projectReducer from "../features/project/projectSlice";
import skillReducer from "../features/skill/skillSlice";

// These store the utility that allows components to request state changes
export const store = configureStore({
  reducer: {
    profile: profileReducer,
    education: educationReducer,
    experience: experienceReducer,
    project: projectReducer,
    skill: skillReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
