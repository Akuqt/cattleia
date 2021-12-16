import mongoose from "mongoose";
import { connect } from "../database";
import { errors } from "../libs";
import { ProductModel, UserModel } from "../models";
import { api, postWithToken, product, user } from "./helper";

jest.setTimeout(20000);

beforeAll(async () => {
  await connect();
  await UserModel.deleteMany({});
  await ProductModel.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close(true);
});

describe("GET /api/v1/product/single", () => {
  test("should respond with no product error.", async () => {
    const res = await api.get("/api/v1/product/single/idk");
    expect(res.status).toBe(404);
    expect(res.body.ok).toEqual(false);
    expect(res.body.error.message).toEqual(errors.productDoesntExist.message);
    expect(res.body.error.code).toEqual(errors.productDoesntExist.code);
  });
  test("should respond with product.", async () => {
    await postWithToken(
      "/auth/sign-up",
      "/admin/add-product",
      { ...user, role: "admin" },
      product
    );
    const res = await api.get(`/api/v1/product/single/${product.name}`);
    expect(res.body.ok).toEqual(true);
    expect(res.body.product).toBeDefined();
  });
});
describe("GET /api/v1/product/all", () => {
  test("should respond with product array.", async () => {
    const res = await api.get(`/api/v1/product/all`);
    expect(res.body.ok).toEqual(true);
    expect(res.body.products).toBeDefined();
  });
});
