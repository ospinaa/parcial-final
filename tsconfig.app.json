import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';

export const storeRedux = configureStore({
	reducer: {
		app: appReducer,
	},
});

export type RootState = ReturnType<typeof storeRedux.getState>;
export type AppDispatch = typeof storeRedux.dispatch;
