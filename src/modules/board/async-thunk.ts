import { createAsyncThunk } from '@reduxjs/toolkit';
import http from '~core/http';
import { IBoardEntity } from './entity';

export const getBoardDetailAPI = createAsyncThunk<IBoardEntity, string | undefined>(
    'board/getBoardDetailAPI',
    async (id) => (await http.get(`/v1/boards/${id}`)).data
);
