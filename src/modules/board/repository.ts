import http from '~core/http';
import { IBoardEntity } from './entity';

export const getBoardDetailAPI = async (id: string) => {
    return (await http.get<IBoardEntity>(`/v1/boards/${id}`)).data;
};
