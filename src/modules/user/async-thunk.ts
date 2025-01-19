import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import http from '~core/http';
import { IUserEntity } from '~modules/user/entity';

type LoginArgs = { email: string; password: string };
type LogoutRes = { loggedOut: boolean };

export const loginAPI = createAsyncThunk<IUserEntity, LoginArgs>(
    'user/loginAPI',
    async (data) => (await http.post('/v1/users/login', data)).data
);
export const logoutAPI = createAsyncThunk<LogoutRes, boolean | undefined>(
    'user/logoutAPI',
    async (showSuccessMessage = true) => {
        const res = await http.delete('/v1/users/logout');
        if (showSuccessMessage) {
            toast.success('Logged out successfully!');
        }
        return res.data;
    }
);
type UpdateArgs = Record<string, unknown>;
export const updateUserAPI = createAsyncThunk<IUserEntity, UpdateArgs>(
    'user/updateUserAPI',
    async (data) => (await http.put('/v1/users/update', data)).data
);
