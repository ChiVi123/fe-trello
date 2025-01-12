import http from '~core/http';
import { IColumnEntity } from './entity';

export const createColumnAPI = async (data: Record<string, unknown>) => {
    return (await http.post<IColumnEntity>('/v1/columns', data)).data;
};
