import useSWR, { ConfigInterface, responseInterface } from 'swr';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

axios.defaults.baseURL = 'https://www.vue-js.com/'; // process.env.REACT_APP_API_ROOT;
// axios.defaults.headers.common['app_id'] = process.env.REACT_APP_API_APP_ID;
// axios.defaults.headers.common['app_secret'] = process.env.REACT_APP_API_APP_SECRET;

export type GetRequest = AxiosRequestConfig | null;

interface Return<Data, Error>
    extends Pick<responseInterface<AxiosResponse<Data>, AxiosError<Error>>, 'isValidating' | 'revalidate' | 'error'> {
    data: Data | undefined;
    response: AxiosResponse<Data> | undefined;
}

// export interface Config<Data = unknown, Error = unknown>
//     extends Omit<ConfigInterface<AxiosResponse<Data>, AxiosError<Error>>, 'initialData'> {
//     initialData?: Data;
// }

export default function useRequest<Data = unknown, Error = unknown>(
    request: GetRequest,
    { ...config }: ConfigInterface<AxiosResponse<Data>, AxiosError<Error>> = {}
): Return<Data, Error> {
    const { data: response, error, isValidating, revalidate } = useSWR<AxiosResponse<Data>, AxiosError<Error>>(
        request && JSON.stringify(request),
        () => axios(request || {}),
        {
            ...config
        }
    );

    return {
        data: response && { ...response.data, page: request?.params.page || 1 },
        response,
        error,
        isValidating,
        revalidate
    };
}
