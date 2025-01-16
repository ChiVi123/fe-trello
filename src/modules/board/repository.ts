import http from '~core/http';

export const updateBoardDetailAPI = async (id: string, updateData: Record<string, unknown>) => {
    return (await http.put(`v1/boards/${id}`, updateData)).data;
};
export const moveCardAnotherColumnAPI = async (updateData: Record<string, unknown>) => {
    return (await http.put(`v1/boards/supports/moving-cards`, updateData)).data;
};
