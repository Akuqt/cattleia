import mongoose from "mongoose";
import { api, app } from "./helper";
import { wsrequest } from "wsreq";
import { connect } from "../../database";

beforeAll(async () => {
  await connect();
});

afterEach(async () => {
  await mongoose.connection.close(true);
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

describe("WS /api/v1/ws", () => {
  test("should respond with msg.", async () => {
    const conn = await wsrequest({ path: "/api/v1/ws" }).local(app);
    const res = await conn.emit("ping", { msg: "ping" }).on("pong");
    expect(res).toEqual({ msg: "test" });
    conn.close();
  });
  test("should respond with msg (with http request).", async () => {
    const conn = await wsrequest({ path: "/api/v1/ws" }).local(app);
    const res = await conn.onWithHttp<object>("pong", {
      url: "/api/v1/",
      method: "get",
    });
    expect(res).toEqual({ msg: "test" });
    conn.close();
  });
});
