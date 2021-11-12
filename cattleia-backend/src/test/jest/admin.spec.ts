import request from "supertest";
import mongoose from "mongoose";
import app from "../../app";
import { errors } from "../../libs";

const api = request(app);

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
