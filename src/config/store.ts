import { configureStore } from '@reduxjs/toolkit';
import { boardReducer } from '~modules/board/slice';

export const store = configureStore({
    reducer: { board: boardReducer },
});
export type AppDispatch = typeof store.dispatch;
