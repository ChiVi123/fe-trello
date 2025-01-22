import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getInvitationsAPI, updateBoardInvitationAPI } from './async-thunk';
import { INotificationEntity } from './entity';

interface IState {
    currentNotifications: INotificationEntity[] | null;
}

const initialState: IState = { currentNotifications: null };
const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: (creators) => ({
        addNotification: creators.reducer((state, { payload }: PayloadAction<INotificationEntity>) => {
            state.currentNotifications?.unshift(payload);
        }),
        clearCurrentNotifications: creators.reducer((state) => {
            state.currentNotifications = null;
        }),
        updateCurrentNotifications: creators.reducer((state, { payload }: PayloadAction<INotificationEntity[]>) => {
            state.currentNotifications = payload;
        }),
    }),
    extraReducers: (builder) => {
        builder.addCase(getInvitationsAPI.fulfilled, (state, { payload }) => {
            state.currentNotifications = Array.isArray(payload) ? payload.reverse() : [];
        });
        builder.addCase(updateBoardInvitationAPI.fulfilled, (state, { payload }) => {
            const getInvitation = state.currentNotifications?.find((item) => item._id === payload._id);
            if (getInvitation) getInvitation.boardInvitation = payload.boardInvitation;
        });
    },
    selectors: {
        selectCurrentNotifications: (state) => state.currentNotifications,
    },
});

export const { addNotification, clearCurrentNotifications, updateCurrentNotifications } = notificationsSlice.actions;
export const { selectCurrentNotifications } = notificationsSlice.selectors;
export const notificationsReducer = notificationsSlice.reducer;
