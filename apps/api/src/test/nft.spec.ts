import mongoose from "mongoose";
import { connect } from "../database";
import { errors } from "../libs";
import { MetaModel, UserModel } from "../models";
import { api, meta, postWithToken, user } from "./helper";

jest.setTimeout(20000);

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await mongoose.connection.close(true);
});

beforeEach(async () => {
  await UserModel.deleteMany({});
  await MetaModel.deleteMany({});
});

describe("GET /api/v1/nft/metadata", () => {
  test("should respond with no metadata error.", async () => {
    const res = await api.get("/api/v1/nft/metadata/0");
    expect(res.status).toBe(404);
    expect(res.body.ok).toEqual(false);
    expect(res.body.error.message).toEqual(errors.metadataDoesntExist.message);
    expect(res.body.error.code).toEqual(errors.metadataDoesntExist.code);
  });
  test("should respond with metadata.", async () => {
    await postWithToken(
      "/auth/sign-up",
      "/admin/add-meta",
      { ...user, role: "admin" },
      meta
    );
    const res = await api.get("/api/v1/nft/metadata/0");
    const should = { ...meta };
    //@ts-ignore
    delete should.nft;
    expect(res.body).toEqual(should);
  });
});
