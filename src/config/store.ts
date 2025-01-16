import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { boardReducer } from '~modules/board/slice';

export const store = configureStore({
    reducer: { board: boardReducer },
});
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
