import request from "supertest";
import mongoose from "mongoose";
import app from "../../app";

const api = request(app);

afterEach(() => {
  mongoose.connection.close();
});

describe("GET /api/v1", () => {
  test("should respond with status code: 200 and Content-Type: Application/json.", async () => {
    await api
      .get("/api/v1")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
  test("should respond with 'Hello' msg.", async () => {
    const res = await api.get("/api/v1");
    expect(res.body.msg).toEqual("Hello");
  });
});
