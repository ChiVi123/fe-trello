import { createAsyncThunk } from '@reduxjs/toolkit';
import http from '~core/http';
import { INotificationEntity } from './entity';

export const getInvitationsAPI = createAsyncThunk(
    'notifications/getInvitationsPI',
    async (_, { signal }) => (await http.get('/v1/invitations', { signal })).data
);
type UpdateBoardInvitationApi = { invitationId: string; status: string };
export const updateBoardInvitationAPI = createAsyncThunk<INotificationEntity, UpdateBoardInvitationApi>(
    'notifications/updateBoardInvitationAPI',
    async ({ invitationId, status }) => (await http.put(`/v1/invitations/board/${invitationId}`, { status })).data
);
