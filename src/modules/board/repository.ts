import http from '~core/http';
import { IBoardEntity } from './entity';

export const getBoardDetailAPI = async (id: string) => {
    return (await http.get<IBoardEntity>(`/v1/boards/${id}`)).data;
};
export const updateBoardDetailAPI = async (id: string, updateData: Record<string, unknown>) => {
    return (await http.put(`v1/boards/${id}`, updateData)).data;
};
