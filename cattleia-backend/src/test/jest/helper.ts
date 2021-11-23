import request from "supertest";
import app_ from "../../app";

export const app = app_;
export const api = request(app);

const baseUrl = "/api/v1";

export const user = {
  name: "Testing",
  email: "test@email.com",
  userName: "test",
  password: "1234",
};

export const user2 = {
  name: "Testing2",
  email: "test2@email.com",
  userName: "test2",
  password: "1234",
};

export const user3 = {
  name: "Testing3",
  email: "test3@email.com",
  userName: "test3",
  password: "1234",
};

export const meta = {
  nft: "0",
  name: "NFT Name",
  description: "Meta description",
  image: "http://some-uri/image.png",
  external_url: "http://external.com",
  attributes: [
    {
      trait_type: "level",
      value: 5,
    },
    {
      display_type: "boost_number",
      trait_type: "aqua power",
      value: 40,
    },
  ],
};

export const invalidToken = async (
  url: string,
  token: boolean
): Promise<request.Response> => {
  return await api
    .post(baseUrl + url)
    .set({ Authorization: token ? "bearer adsfsdfdf" : "" })
    .send({ password: "1234" });
};

export const simplePost = async (
  url: string,
  data: object
): Promise<request.Response> => {
  return await api.post(baseUrl + url).send(data);
};

export const postWithToken = async (
  url1: string,
  url2: string,
  data1: object,
  data2: object
): Promise<{ res: request.Response; res1: request.Response }> => {
  const res1 = await api.post(baseUrl + url1).send(data1);
  const res = await api
    .post(baseUrl + url2)
    .set({ Authorization: `bearer ${res1.body.user.token}` })
    .send(data2);

  return {
    res,
    res1,
  };
};

export const putWithToken = async (
  url1: string,
  url2: string,
  data1: object,
  data2: object
): Promise<{ res: request.Response; res1: request.Response }> => {
  const res1 = await api.post(baseUrl + url1).send(data1);
  const res = await api
    .put(baseUrl + url2)
    .set({ Authorization: `bearer ${res1.body.user.token}` })
    .send(data2);

  return {
    res,
    res1,
  };
};

export const gettWithToken = async (
  url1: string,
  url2: string,
  data1: object
): Promise<{ res: request.Response; res1: request.Response }> => {
  const res1 = await api.post(baseUrl + url1).send(data1);
  const res = await api
    .get(baseUrl + url2)
    .set({ Authorization: `bearer ${res1.body.user.token}` });

  return {
    res,
    res1,
  };
};
