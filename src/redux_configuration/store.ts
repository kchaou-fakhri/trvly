import {configureStore} from '@reduxjs/toolkit';
import {RootState} from '@reduxjs/toolkit/query';
import {useDispatch, useSelector} from 'react-redux';
import type {Dispatch} from 'redux';
import {rootReducer} from './route_reducers';

const store = configureStore({
  reducer: rootReducer,
});

export const useAppDispatch = useDispatch.withTypes<Dispatch>();
export const useAppSelector = useSelector.withTypes<RootState<any, any, any>>();

export default store;
