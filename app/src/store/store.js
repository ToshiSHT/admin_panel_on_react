import { configureStore } from '@reduxjs/toolkit';
import modals from './slices/openModalSlice.js';
import dataList from './slices/dataListSlice.js';

export const store = configureStore({
    reducer: {
        modals,
        dataList,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
});
