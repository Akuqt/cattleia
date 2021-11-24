import axios, {AxiosResponse, AxiosError} from 'axios';

// const base = 'https://api.aku-mi.xyz/api/v1';
const base = 'http://10.0.2.2:4000/api/v1';
// const base = 'http://192.168.1.6:4000/api/v1';

export const Post = async <T, E, K = any>(
  url: string,
  body: object,
  token: string = '',
): Promise<AxiosResponse<T & E & K>> => {
  return await axios
    .post(url, body, {
      withCredentials: true,
      timeout: 2000,
      baseURL: base,
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
    .catch((_e: AxiosError<T>) => {
      return _e.response as AxiosResponse<T & E & K>;
    });
};

export const Get = async <T, E, K = any>(
  url: string,
  token: string = '',
): Promise<AxiosResponse<T & E & K>> => {
  return await axios
    .get(url, {
      withCredentials: true,
      timeout: 2000,
      baseURL: base,
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
    .catch((_e: AxiosError<T>) => {
      return _e.response as AxiosResponse<T & E & K>;
    });
};
