import { createAsyncThunk } from '@reduxjs/toolkit';
import http from '~core/http';
import { IBoardEntity } from '~modules/board/entity';

export const getBoardDetailAPI = createAsyncThunk<IBoardEntity, string | undefined>(
    'board/getBoardDetailAPI',
    async (id, { signal }) => (await http.get(`/v1/boards/${id}`, { signal })).data
);
