import http from '~core/http';
import { IColumnEntity } from './entity';

export const createColumnAPI = async (data: Record<string, unknown>) => {
    return (await http.post<IColumnEntity>('/v1/columns', data)).data;
};
export const updateColumnDetailAPI = async (id: string, updateData: Record<string, unknown>) => {
    return (await http.put(`v1/columns/${id}`, updateData)).data;
};
export const deleteColumnAPI = async (id: string) => {
    return (await http.delete(`v1/columns/${id}`)).data;
};
