import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { FLUSH, PAUSE, PERSIST, PersistConfig, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { boardReducer } from '~modules/board/slice';
import { userReducer } from '~modules/user/slice';

const reducers = combineReducers({ board: boardReducer, user: userReducer });
const persistConfig: PersistConfig<ReturnType<typeof reducers>> = {
    key: 'root',
    storage,
    whitelist: ['user'],
};
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
