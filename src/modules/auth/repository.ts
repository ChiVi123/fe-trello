import { toast } from 'react-toastify';
import http from '~core/http';

export const registerAPI = async (formData: Record<string, unknown>) => {
    const res = await http.post('v1/users/register', formData);
    toast.success('Account created successfully!', { position: 'bottom-left', theme: 'colored' });
    return res.data;
};
