import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Result} from '@model/entity/unspleash/Result';
import {FullScreenImageState} from '../configuration/State';
import {TrvlyImage} from '@model/index';

const initialState: FullScreenImageState = {
  data: undefined,
};

export const fullScreenImageSlice = createSlice({
  name: 'fullScreenImage',
  initialState,
  reducers: {
    displayImage(state, action: PayloadAction<TrvlyImage>) {
      state.data = action.payload;
    },
    closeImage(state) {
      state.data = undefined;
    },
  },
});

export const {displayImage, closeImage} = fullScreenImageSlice.actions;

export default fullScreenImageSlice.reducer;
