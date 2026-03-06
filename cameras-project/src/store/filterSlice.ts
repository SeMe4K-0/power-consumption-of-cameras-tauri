import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

interface FiltersState {
  cameraQuery: string;
}

const initialState: FiltersState = {
  cameraQuery: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCameraQuery: (state, action: PayloadAction<string>) => {
      state.cameraQuery = action.payload;
    },
  },
});

export const { setCameraQuery } = filtersSlice.actions;
export const selectCameraQuery = (state: RootState) => state.filters.cameraQuery;
export default filtersSlice.reducer;
