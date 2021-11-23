import mongoose from "mongoose";
import { connect } from "../../database";
import { errors } from "../../libs";
import { MetaModel, UserModel, ProductModel } from "../../models";
import {
  api,
  gettWithToken,
  meta,
  product,
  postWithToken,
  putWithToken,
  user,
} from "./helper";

jest.setTimeout(30000);

beforeAll(async () => {
  await connect();
  await MetaModel.deleteMany({});
  await ProductModel.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close(true);
});

beforeEach(async () => {
  await UserModel.deleteMany({});
});

describe("GET /api/v1/admin", () => {
  test("should response with no token error.", async () => {
    const res = await api.get("/api/v1/admin");
    expect(res.body.ok).toEqual(false);
    expect(res.body.error.message).toEqual(errors.noAuthToken.message);
    expect(res.body.error.code).toEqual(errors.noAuthToken.code);
  });

  test("should respond with no admin error.", async () => {
    const { res } = await gettWithToken("/auth/sign-up", "/admin", user);
    expect(res.body.ok).toEqual(false);
    expect(res.body.error.message).toEqual(errors.noAdmin.message);
    expect(res.body.error.code).toEqual(errors.noAdmin.code);
  });

  test("should respond with admin msg.", async () => {
    const { res } = await gettWithToken("/auth/sign-up", "/admin", {
      ...user,
      role: "admin",
    });
    expect(res.body.ok).toEqual(true);
    expect(res.body.msg).toEqual("admin");
  });
});

describe("POST /api/v1/admin/add-meta", () => {
  test("should be able to add metadata.", async () => {
    const { res } = await postWithToken(
      "/auth/sign-up",
      "/admin/add-meta",
      { ...user, role: "admin" },
      meta
    );
    expect(res.body.ok).toEqual(true);
  });
  test("should respond with metadata exist error.", async () => {
    const { res } = await postWithToken(
      "/auth/sign-up",
      "/admin/add-meta",
      { ...user, role: "admin" },
      meta
    );
    expect(res.status).toBe(400);
    expect(res.body.ok).toEqual(false);
    expect(res.body.error.message).toEqual(errors.metadataAlreadyExist.message);
    expect(res.body.error.code).toEqual(errors.metadataAlreadyExist.code);
  });
});

describe("PUT /api/v1/admin/edit-meta", () => {
  test("should respond with no metadata error.", async () => {
    const { res } = await putWithToken(
      "/auth/sign-up",
      "/admin/edit-meta/10",
      { ...user, role: "admin" },
      meta
    );
    expect(res.body.ok).toEqual(false);
    expect(res.body.error.message).toEqual(errors.metadataDoesntExist.message);
    expect(res.body.error.code).toEqual(errors.metadataDoesntExist.code);
  });
  test("should be able to edit metadata.", async () => {
    const { res } = await putWithToken(
      "/auth/sign-up",
      "/admin/edit-meta/0",
      { ...user, role: "admin" },
      meta
    );
    expect(res.body.ok).toEqual(true);
  });
});

describe("POST /api/v1/admin/add-product", () => {
  test("should be able to add product.", async () => {
    const { res } = await postWithToken(
      "/auth/sign-up",
      "/admin/add-product",
      { ...user, role: "admin" },
      product
    );
    expect(res.body.ok).toEqual(true);
  });
  test("should respond with product exist error.", async () => {
    const { res } = await postWithToken(
      "/auth/sign-up",
      "/admin/add-product",
      { ...user, role: "admin" },
      product
    );
    expect(res.status).toBe(400);
    expect(res.body.ok).toEqual(false);
    expect(res.body.error.message).toEqual(errors.productAlreadyExist.message);
    expect(res.body.error.code).toEqual(errors.productAlreadyExist.code);
  });
});

describe("PUT /api/v1/admin/edit-product", () => {
  test("should respond with no product error.", async () => {
    const { res } = await putWithToken(
      "/auth/sign-up",
      "/admin/edit-product/anything",
      { ...user, role: "admin" },
      product
    );
    expect(res.body.ok).toEqual(false);
    expect(res.body.error.message).toEqual(errors.productDoesntExist.message);
    expect(res.body.error.code).toEqual(errors.productDoesntExist.code);
  });
  test("should be able to edit product.", async () => {
    const { res } = await putWithToken(
      "/auth/sign-up",
      `/admin/edit-product/${product.name}`,
      { ...user, role: "admin" },
      product
    );
    expect(res.body.ok).toEqual(true);
  });
});
