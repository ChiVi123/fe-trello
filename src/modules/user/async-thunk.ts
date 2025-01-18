import { createAsyncThunk } from '@reduxjs/toolkit';
import http from '~core/http';
import { IUserEntity } from '~modules/user/entity';

type Args = { email: string; password: string };

export const loginAPI = createAsyncThunk<IUserEntity, Args>(
    'user/loginAPI',
    async (data) => (await http.post('/v1/users/login', data)).data
);
