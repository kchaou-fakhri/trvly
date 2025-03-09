/**
 * Redux store configuration module.
 * 
 * @module store
 * 
 * @remarks
 * This module sets up the Redux store with the root reducer and exports typed hooks
 * for use throughout the application.
 * 
 * @exports store - The configured Redux store instance
 * @exports RootState - Type representing the complete state tree
 * @exports AppDispatch - Type representing the store's dispatch function
 * @exports useAppDispatch - Typed dispatch hook
 * @exports useAppSelector - Typed selector hook for accessing store state
 */
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { rootReducer } from "./route_reducers";

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
