import mongoose from "mongoose";
import { errors } from "../../libs";
import { api } from "./helper";

afterEach(() => {
  mongoose.connection.close();
});

describe("GET /api/v1/admin", () => {
  test("should response with no token error.", async () => {
    const res = await api.get("/api/v1/admin");
    expect(res.body.ok).toEqual(false);
    expect(res.body.error.message).toEqual(errors.noAuthToken.message);
    expect(res.body.error.code).toEqual(errors.noAuthToken.code);
  });
});
