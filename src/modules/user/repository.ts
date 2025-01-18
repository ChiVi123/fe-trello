import { toast } from 'react-toastify';
import http from '~core/http';

export const verifyUserAPI = async (verifyData: Record<string, unknown>, signal: AbortSignal) => {
    const res = await http.put('v1/users/verify', verifyData, { signal });
    toast.success('Account verified successfully!', { position: 'bottom-left', theme: 'colored' });
    return res.data;
};
