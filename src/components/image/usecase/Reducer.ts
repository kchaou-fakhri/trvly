import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Result} from '@model/entity/unspleash/Result';
import {FullScreenImageState} from '../configuration/State';
import {TrvlyImage} from '@model/index';

const initialState: FullScreenImageState = {
  data: undefined,
  index: undefined
};

export const fullScreenImageSlice = createSlice({
  name: 'fullScreenImage',
  initialState,
  reducers: {
    displayImage(state, action: PayloadAction<{data: TrvlyImage[], index: number}>) {
      state.data = action.payload.data;
      state.index = action.payload.index;
    },
    closeImage(state) {
      state.data = undefined;
      state.index = undefined;
    },
  },
});

export const {displayImage, closeImage} = fullScreenImageSlice.actions;

export default fullScreenImageSlice.reducer;