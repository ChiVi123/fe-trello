import http from '~core/http';
import { ICardEntity } from './entity';

export const createCardAPI = async (data: Record<string, unknown>) => {
    return (await http.post<ICardEntity>('/v1/cards', data)).data;
};
export const updateCardAPI = async (cardId: string, data: Record<string, unknown> | FormData) => {
    return (await http.put<ICardEntity>(`/v1/cards/${cardId}`, data)).data;
};
