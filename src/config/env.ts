const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const env = {
    API_BASE_URL: typeof apiBaseUrl === 'string' && apiBaseUrl.startsWith('http') ? apiBaseUrl : '',
};
