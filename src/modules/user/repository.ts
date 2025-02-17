import { toast } from 'react-toastify';
import http from '~core/http';

export const registerAPI = async (formData: Record<string, unknown>) => {
    const res = await http.post('v1/users/register', formData);
    toast.success('Account created successfully!', { position: 'bottom-left', theme: 'colored' });
    return res.data;
};
export const verifyUserAPI = async (verifyData: Record<string, unknown>, signal: AbortSignal) => {
    const res = await http.put('v1/users/verify', verifyData, { signal });
    toast.success('Account verified successfully!', { position: 'bottom-left', theme: 'colored' });
    return res.data;
};
export const refreshTokenAPI = async () => (await http.get<{ accessToken?: string }>('v1/users/refresh-token')).data;
export const inviteUserToBoardAPI = async (data: Record<string, unknown>) => {
    const res = await http.post('v1/invitations/board', data);
    toast.success('User was invited to board successfully !', { position: 'bottom-left', theme: 'colored' });
    return res.data;
};
