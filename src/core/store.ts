import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { boardReducer } from '~modules/board/slice';
import { userReducer } from '~modules/user/slice';

export const store = configureStore({
    reducer: { board: boardReducer, user: userReducer },
});
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
