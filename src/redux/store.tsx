import { configureStore } from '@reduxjs/toolkit';
import modalSlice from './slices/modal-slice';

export function makeStore() {
  return configureStore({
    reducer: {
      modal: modalSlice,
    },
  });
}

export const store = makeStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
