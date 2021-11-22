import mongoose from "mongoose";
import { api, app } from "./helper";
import { wsreq } from "../../websocket/wstest";

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

describe("WS /api/v1/ws", () => {
  test("should respond with msg.", async () => {
    const res = await wsreq(app, "/api/v1/ws")
      .emit("ping", { msg: "ping" })
      .on<object>("pong")
      .catch((e: Error) => {
        console.log(e.message);
        return { msg: e.message };
      });
    expect(res).toEqual({ msg: "test" });
  });
  test("should respond with msg (with http request).", async () => {
    const res = await wsreq(app, "/api/v1/ws")
      .onWithHttp<object>("pong", { url: "/api/v1/", method: "get" })
      .catch((e: Error) => {
        return { msg: e.message };
      });
    expect(res).toEqual({ msg: "test" });
  });
});
