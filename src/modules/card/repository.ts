import http from '~core/http';
import { ICardEntity } from './entity';

export const createCardAPI = async (data: Record<string, unknown>) => {
    return (await http.post<ICardEntity>('/v1/cards', data)).data;
};
