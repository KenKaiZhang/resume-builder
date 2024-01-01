/*
 * Pretyped versions of useDispatch and useSelector hooks.
 * Avoids having to re-type useSelector every time its used
 * Allows for proper dispatching of thunk
 */
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Use these throughout the application instead of useDispatch and useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
