import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './filterSlice';

const STORAGE_KEY = 'cameras-project-filters';

const loadCameraQuery = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return '';
    }

    const parsed = JSON.parse(raw) as { cameraQuery?: string };
    return typeof parsed.cameraQuery === 'string' ? parsed.cameraQuery : '';
  } catch (error) {
    console.warn('Cannot read saved filters from localStorage:', error);
    return '';
  }
};

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
  },
  preloadedState: {
    filters: {
      cameraQuery: loadCameraQuery(),
    },
  },
  devTools: true,
});

store.subscribe(() => {
  try {
    const state = store.getState();
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ cameraQuery: state.filters.cameraQuery }),
    );
  } catch (error) {
    console.warn('Cannot persist filters to localStorage:', error);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
