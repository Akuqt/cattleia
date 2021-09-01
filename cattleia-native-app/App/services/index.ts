import axios, {AxiosResponse} from 'axios';

// const base = 'https://akumi.me/api/v1';
const base = 'http://10.0.2.2:4000/api/v1';

export const Post = async <T>(
  url: string,
  body: object,
  token: string = '',
): Promise<AxiosResponse<T>> => {
  return await axios.post(url, body, {
    withCredentials: true,
    baseURL: base,
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
};

export const Get = async <T>(
  url: string,
  token: string = '',
): Promise<AxiosResponse<T>> => {
  return await axios.get(url, {
    withCredentials: true,
    baseURL: base,
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
};
