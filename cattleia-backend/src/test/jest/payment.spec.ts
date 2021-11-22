import mongoose from "mongoose";
import config from "../../config";
import { connect } from "../../database";
import { errors } from "../../libs";
import { api } from "./helper";

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await mongoose.connection.close(true);
});

describe("GET /api/v1/payment/get-publishable-key", () => {
  test("should respond with a stripe publishableKey.", async () => {
    const res = await api.get("/api/v1/payment/get-publishable-key");
    expect(res.status).toBe(200);
    expect(res.body.ok).toEqual(true);
    expect(res.body.publishableKey).toEqual(config.STRIPE_PUBLISHABLE);
  });
});

describe("POST /api/v1/payment/create-payment-intent", () => {
  test("should respond with a stripe client-secret.", async () => {
    const res = await api
      .post("/api/v1/payment/create-payment-intent")
      .withCredentials()
      .set({ Authorization: `Bearer ${config.STRIPE_SECRET}` })
      .send({
        amount: 1000000,
      });
    expect(res.status).toBe(200);
    expect(res.body.ok).toEqual(true);
    expect(res.body.clientSecret).toBeDefined();
  });

  test("should respond with invalid amount error (amount defined).", async () => {
    const res = await api
      .post("/api/v1/payment/create-payment-intent")
      .set({ Authorization: `Bearer ${config.STRIPE_SECRET}` })
      .send({
        amount: 1000,
      });
    expect(res.status).toBe(400);
    expect(res.body.ok).toEqual(false);
    expect(res.body.error.message).toEqual(errors.invalidAmount.message);
    expect(res.body.error.code).toEqual(errors.invalidAmount.code);
  });
  test("should respond with invalid amount error (amount undefined).", async () => {
    const res = await api
      .post("/api/v1/payment/create-payment-intent")
      .set({ Authorization: `Bearer ${config.STRIPE_SECRET}` })
      .send({});
    expect(res.status).toBe(400);
    expect(res.body.ok).toEqual(false);
    expect(res.body.error.message).toEqual(errors.invalidAmount.message);
    expect(res.body.error.code).toEqual(errors.invalidAmount.code);
  });
});
