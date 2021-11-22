import mongoose from "mongoose";
import { connect } from "../../database";
import { errors } from "../../libs";
import { api } from "./helper";

beforeAll(async () => {
  await connect();
});

afterEach(async () => {
  await mongoose.connection.close(true);
});

describe("GET /api/v1/admin", () => {
  test("should response with no token error.", async () => {
    const res = await api.get("/api/v1/admin");
    expect(res.body.ok).toEqual(false);
    expect(res.body.error.message).toEqual(errors.noAuthToken.message);
    expect(res.body.error.code).toEqual(errors.noAuthToken.code);
  });
});
