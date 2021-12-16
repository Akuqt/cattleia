import mongoose from "mongoose";
import { HistoryModel, UserModel } from "../models";
import { connect } from "../database";
import { user, postWithToken, gettWithToken } from "./helper";

jest.setTimeout(20000);

beforeAll(async () => {
  await connect();
  await HistoryModel.deleteMany({});
  await UserModel.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close(true);
});

describe("POST /api/v1/history/add", () => {
  it("should be able to add history", async () => {
    const { res } = await postWithToken("/auth/sign-up", "/history/add", user, {
      date: new Date(),
      total: 4000,
      method: "Credit Card",
    });

    expect(res.body.ok).toEqual(true);
  });
});

describe("POST /api/v1/history/get", () => {
  it("should be able to add history", async () => {
    const { res } = await gettWithToken("/auth/sign-in", "/history/get", user);
    expect(res.body.ok).toEqual(true);
    expect(res.body.history).toBeInstanceOf(Array);
  });
});
