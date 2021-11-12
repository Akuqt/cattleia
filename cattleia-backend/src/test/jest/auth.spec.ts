import request from "supertest";
import mongoose from "mongoose";
import app from "../../app";
import { UserModel } from "../../models";
import { encryptPassword, errors } from "../../libs";

const api = request(app);

const user = {
  name: "Testing",
  email: "test@email.com",
  userName: "test",
  password: "1234",
};

const user2 = {
  name: "Testing2",
  email: "test2@email.com",
  userName: "test2",
  password: "1234",
};

beforeEach(async () => {
  await UserModel.deleteMany({});
  const _user = new UserModel({
    ...user2,
    password: await encryptPassword(user2.password),
  });
  await _user.save();
});

afterAll(() => {
  mongoose.connection.close();
});

describe("POST /api/v1/auth/sign-up", () => {
  test("should register an user with default role (user).", async () => {
    const res = await api.post("/api/v1/auth/sign-up").send(user);
    expect(res.status).toBe(200);
    expect(res.body.ok).toEqual(true);
    expect(res.body.user.id).toBeDefined();
    expect(res.body.user.role).toEqual("user");
    expect(res.body.user.token).toBeDefined();
    expect(res.body.user.account).toBeDefined();
    expect(res.body.user.rank).toBeDefined();
    expect(res.body.user.email).toEqual(user.email);
    expect(res.body.user.name).toEqual(user.name);
    expect(res.body.user.userName).toEqual(user.userName);
  });

  test("should register an user with role = user.", async () => {
    const res = await api
      .post("/api/v1/auth/sign-up")
      .send({ ...user, role: "user" });
    expect(res.status).toBe(200);
    expect(res.body.ok).toEqual(true);
    expect(res.body.user.id).toBeDefined();
    expect(res.body.user.role).toEqual("user");
    expect(res.body.user.token).toBeDefined();
    expect(res.body.user.account).toBeDefined();
    expect(res.body.user.rank).toBeDefined();
    expect(res.body.user.email).toEqual(user.email);
    expect(res.body.user.name).toEqual(user.name);
    expect(res.body.user.userName).toEqual(user.userName);
  });

  test("should register an user with role = admin.", async () => {
    const res = await api
      .post("/api/v1/auth/sign-up")
      .send({ ...user, role: "admin" });
    expect(res.status).toBe(200);
    expect(res.body.ok).toEqual(true);
    expect(res.body.user.id).toBeDefined();
    expect(res.body.user.role).toEqual("admin");
    expect(res.body.user.token).toBeDefined();
    expect(res.body.user.account).toBeDefined();
    expect(res.body.user.rank).toBeDefined();
    expect(res.body.user.email).toEqual(user.email);
    expect(res.body.user.name).toEqual(user.name);
    expect(res.body.user.userName).toEqual(user.userName);
  });

  test("should respond with 'invalid role' error.", async () => {
    const res = await api
      .post("/api/v1/auth/sign-up")
      .send({ ...user, role: "test" });
    expect(res.body.ok).toEqual(false);
    expect(res.body.error.message).toEqual(errors.invalidRole.message);
    expect(res.body.error.code).toEqual(errors.invalidRole.code);
  });

  test("should respond with 'userName taken' error.", async () => {
    const res = await api.post("/api/v1/auth/sign-up").send(user2);
    expect(res.body.ok).toEqual(false);
    expect(res.body.error.message).toEqual(errors.userAlreadyTaken.message);
    expect(res.body.error.code).toEqual(errors.userAlreadyTaken.code);
  });
});

describe("POST /api/v1/auth/sign-in", () => {
  test("should be able to login.", async () => {
    await api.post("/api/v1/auth/sign-up").send(user);

    const res = await api
      .post("/api/v1/auth/sign-in")
      .send({ userName: user.userName, password: user.password });

    expect(res.status).toBe(200);
    expect(res.body.ok).toEqual(true);
    expect(res.body.user.id).toBeDefined();
    expect(res.body.user.role).toEqual("user");
    expect(res.body.user.token).toBeDefined();
    expect(res.body.user.account).toBeDefined();
    expect(res.body.user.rank).toBeDefined();
    expect(res.body.user.email).toEqual(user.email);
    expect(res.body.user.name).toEqual(user.name);
    expect(res.body.user.userName).toEqual(user.userName);
  });

  test("shouldn't be able to login with wrong username.", async () => {
    await api.post("/api/v1/auth/sign-up").send(user);

    const res = await api
      .post("/api/v1/auth/sign-in")
      .send({ userName: "wrong", password: user.password });

    expect(res.status).toBe(401);
    expect(res.body.ok).toEqual(false);
    expect(res.body.error.message).toEqual(errors.wrongUserOrPassword.message);
    expect(res.body.error.code).toEqual(errors.wrongUserOrPassword.code);
  });

  test("shouldn't be able to login with wrong password.", async () => {
    await api.post("/api/v1/auth/sign-up").send(user);

    const res = await api
      .post("/api/v1/auth/sign-in")
      .send({ userName: user.userName, password: "wrong" });

    expect(res.status).toBe(401);
    expect(res.body.ok).toEqual(false);
    expect(res.body.error.message).toEqual(errors.wrongUserOrPassword.message);
    expect(res.body.error.code).toEqual(errors.wrongUserOrPassword.code);
  });

  test("shouldn't be able to login with wrong password and wrong username.", async () => {
    await api.post("/api/v1/auth/sign-up").send(user);

    const res = await api
      .post("/api/v1/auth/sign-in")
      .send({ userName: "wrong1", password: "wrong2" });

    expect(res.status).toBe(401);
    expect(res.body.ok).toEqual(false);
    expect(res.body.error.message).toEqual(errors.wrongUserOrPassword.message);
    expect(res.body.error.code).toEqual(errors.wrongUserOrPassword.code);
  });
});
