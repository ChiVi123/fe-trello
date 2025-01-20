import { createSlice } from '@reduxjs/toolkit';
import { loginAPI, logoutAPI, updateUserAPI } from '~modules/user/async-thunk';
import { IUserEntity } from '~modules/user/entity';

interface IState {
    currentUser: IUserEntity | null;
}
const initialState: IState = { currentUser: null };
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: () => ({}),
    extraReducers: (builder) => {
        builder.addCase(loginAPI.fulfilled, (state, { payload }) => {
            state.currentUser = payload;
        });
        builder.addCase(logoutAPI.fulfilled, (state) => {
            state.currentUser = null;
        });
        builder.addCase(updateUserAPI.fulfilled, (state, { payload }) => {
            state.currentUser = payload;
        });
    },
    selectors: {
        selectCurrentUser: (state) => state.currentUser,
    },
});

export const { selectCurrentUser } = userSlice.selectors;
export const userReducer = userSlice.reducer;
