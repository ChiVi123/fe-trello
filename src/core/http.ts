import axios from 'axios';
import { toast } from 'react-toastify';
import { env } from '~config/env';
import { interceptorLoadingElements } from '~utils/formatters';

const http = axios.create({ baseURL: env.API_BASE_URL });

http.defaults.timeout = 1000 * 60 * 10;
http.defaults.withCredentials = true;

http.interceptors.request.use(
    (config) => {
        interceptorLoadingElements(true);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

http.interceptors.response.use(
    (response) => {
        interceptorLoadingElements(false);
        return response;
    },
    (error) => {
        interceptorLoadingElements(false);

        let errorMessage = error?.message;
        if (error.response?.data?.message) errorMessage = error.response?.data?.message;

        // if status code is 410, should pass
        if (error.response.status !== 410) {
            toast.error(errorMessage);
        }

        return Promise.reject(error);
    }
);

export default http;
