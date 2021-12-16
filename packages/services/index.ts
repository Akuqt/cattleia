import axios, { AxiosResponse, AxiosError } from "axios";
import { constants } from "utils";

export const Post = async <T, E, K = any>(
  url: string,
  body: object,
  token: string = ""
): Promise<AxiosResponse<T & E & K>> => {
  return await axios
    .post(url, body, {
      withCredentials: true,
      timeout: 2000,
      baseURL: constants.baseUri + "/api/v1",
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
  token: string = ""
): Promise<AxiosResponse<T & E & K>> => {
  return await axios
    .get(url, {
      withCredentials: true,
      timeout: 2000,
      baseURL: constants.baseUri + "/api/v1",
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
    .catch((_e: AxiosError<T>) => {
      return _e.response as AxiosResponse<T & E & K>;
    });
};
