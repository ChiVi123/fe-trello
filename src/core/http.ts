import axios from 'axios';
import { toast } from 'react-toastify';
import { env } from '~config/env';
import { logoutAPI } from '~modules/user/async-thunk';
import { refreshTokenAPI } from '~modules/user/repository';
import { interceptorLoadingElements } from '~utils/formatters';
import { ReduxStore } from './store';

// https://redux.js.org/faq/code-structure#how-can-i-use-the-redux-store-in-non-component-files
let axiosReduxStore: ReduxStore | null = null;
export const injectStoreToAxiosInterceptor = (mainStore: ReduxStore) => void (axiosReduxStore = mainStore);

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

/*
    The variable we declared is in the global scope. After we called the refresh token API, we tried all the requests 
    that had previously failed.
*/
let refreshTokenPromise: Promise<string | undefined> | null = null;

http.interceptors.response.use(
    (response) => {
        interceptorLoadingElements(false);
        return response;
    },
    async (interceptorResponseError) => {
        interceptorLoadingElements(false);

        if (interceptorResponseError.response.status === 401 && axiosReduxStore) {
            axiosReduxStore.dispatch(logoutAPI(false));
        }
        const originalRequests = interceptorResponseError.config;

        // https://www.thedutchlab.com/insights/using-axios-interceptors-for-refreshing-your-api-token
        // originalRequests._retry = true, meaning the requests were retried at least one time
        if (interceptorResponseError.response.status === 410 && !originalRequests?._retry) {
            originalRequests._retry = true;

            if (!refreshTokenPromise) {
                refreshTokenPromise = refreshTokenAPI()
                    .then((data) => data?.accessToken)
                    .catch((_error) => {
                        // force logout, any errors
                        axiosReduxStore?.dispatch(logoutAPI(false));
                        return Promise.reject(_error);
                    })
                    .finally(() => {
                        refreshTokenPromise = null;
                    });
            }

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            return refreshTokenPromise.then((_data) => {
                /**
                 * If token not store in http cookie, you should handle is here ([DSth]),
                 * like: axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
                 */
                // [DSth] Do something

                return http(originalRequests);
            });
        }

        let errorMessage = interceptorResponseError?.message;
        if (interceptorResponseError.response?.data?.message) {
            errorMessage = interceptorResponseError.response?.data?.message;
        }

        // if status code is 410, should pass
        if (interceptorResponseError.response.status !== 410) {
            toast.error(errorMessage);
        }

        return Promise.reject(interceptorResponseError);
    }
);

export default http;
