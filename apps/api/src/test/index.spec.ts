import mongoose from "mongoose";
import { api, app, postWithToken, simplePost, user } from "./helper";
import { wsrequest } from "wsreq";
import { connect } from "../database";
import { errors } from "../libs";
import { UserModel } from "../models";

jest.setTimeout(20000);

beforeAll(async () => {
  await connect();
});

beforeEach(async () => {
  await UserModel.deleteMany({});
});

afterAll(async () => {
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
    const [conn] = await wsrequest(app, { config: { path: "/api/v1/ws" } });
    const res = await conn.emit("ping", { msg: "ping" }).on("pong");
    expect(res).toEqual({ msg: "test" });
    conn.close();
  });
  test("should respond with msg (with http request).", async () => {
    const [conn] = await wsrequest(app, { config: { path: "/api/v1/ws" } });
    const { ws: res } = await conn.onWithHttp<object>("pong", {
      url: "/api/v1/",
      method: "get",
    });
    expect(res).toEqual({ msg: "test" });
    conn.close();
  });
});

describe("POST /api/v1/refresh_token", () => {
  test("should respond with no token error.", async () => {
    const res = await simplePost("/refresh_token", {});
    expect(res.body.ok).toEqual(false);
    expect(res.body.error.message).toEqual(errors.noAuthToken.message);
    expect(res.body.error.code).toEqual(errors.noAuthToken.code);
  });
  test("should respond with invalid token error.", async () => {
    const res = await api
      .post("/api/v1/refresh_token")
      .set("Cookie", ["jid=invalid"])
      .send({});
    expect(res.body.ok).toEqual(false);
    expect(res.body.error.message).toEqual(errors.invalidAuthToken.message);
    expect(res.body.error.code).toEqual(errors.invalidAuthToken.code);
  });
  test("should respond with token.", async () => {
    const res1 = await api.post("/api/v1/auth/sign-up").send(user);
    const jid = (res1.headers["set-cookie"][0] as string).split(";")[0];
    const res = await api
      .post("/api/v1/refresh_token")
      .set("Cookie", [jid])
      .send({});
    expect(res.body.ok).toEqual(true);
    expect(res.body.token).toBeDefined();
  });
});

describe("POST /api/v1/revoke_token", () => {
  test("should respond with ok.", async () => {
    const { res } = await postWithToken(
      "/auth/sign-up",
      "/revoke_token",
      user,
      {}
    );
    expect(res.body.ok).toEqual(true);
  });
});
