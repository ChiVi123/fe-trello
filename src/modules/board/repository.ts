import { toast } from 'react-toastify';
import http from '~core/http';

export const updateBoardDetailAPI = async (id: string, updateData: Record<string, unknown>) => {
    return (await http.put(`v1/boards/${id}`, updateData)).data;
};
export const moveCardAnotherColumnAPI = async (updateData: Record<string, unknown>) => {
    return (await http.put('v1/boards/supports/moving-cards', updateData)).data;
};
export const getBoardsAPI = async (searchPath: string, signal?: AbortSignal) => {
    return (await http.get(`v1/boards${searchPath}`, { signal })).data;
};
export const createBoardAPI = async (data: Record<string, unknown>) => {
    const response = await http.post('v1/boards', data);
    toast.success('Board created successfully!');
    return response.data;
};
