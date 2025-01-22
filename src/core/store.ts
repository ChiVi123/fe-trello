import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { PersistConfig, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { boardReducer } from '~modules/board/slice';
import { cardReducer } from '~modules/card/slice';
import { notificationsReducer } from '~modules/notifications/slice';
import { userReducer } from '~modules/user/slice';

const reducers = combineReducers({
    board: boardReducer,
    user: userReducer,
    card: cardReducer,
    notifications: notificationsReducer,
});
const persistConfig: PersistConfig<ReturnType<typeof reducers>> = {
    key: 'root',
    storage,
    whitelist: ['user'],
};
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export type ReduxStore = typeof store;
