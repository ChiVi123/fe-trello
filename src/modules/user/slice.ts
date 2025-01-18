import { createSlice } from '@reduxjs/toolkit';
import { loginAPI } from '~modules/user/async-thunk';
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
    },
    selectors: {
        selectCurrentUser: (state) => state.currentUser,
    },
});

export const { selectCurrentUser } = userSlice.selectors;
export const userReducer = userSlice.reducer;
