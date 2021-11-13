import mongoose from "mongoose";
import { AccountModel, UserModel } from "../../models";
import { errors } from "../../libs";
import {
  user,
  user2,
  user3,
  invalidToken,
  postWithToken,
  simplePost,
} from "./helper";

beforeAll(async () => {
  await AccountModel.deleteMany({});
  await UserModel.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("POST /api/v1/web3/create-account", () => {
  test("shouldn't be able to create a wallet (token error).", async () => {
    const res = await invalidToken("/web3/create-account", true);
    expect(res.status).toBe(401);
    expect(res.body.ok).toEqual(false);
    expect(res.body.error.message).toEqual(errors.invalidAuthToken.message);
    expect(res.body.error.code).toEqual(errors.invalidAuthToken.code);
  });
  test("shouldn't be able to create a wallet (no-token error).", async () => {
    const res = await invalidToken("/web3/create-account", false);
    expect(res.status).toBe(401);
    expect(res.body.ok).toEqual(false);
    expect(res.body.error.message).toEqual(errors.noAuthToken.message);
    expect(res.body.error.code).toEqual(errors.noAuthToken.code);
  });

  test("should be able to create a wallet.", async () => {
    const { res } = await postWithToken(
      "/auth/sign-up",
      "/web3/create-account",
      user,
      { password: "1234" }
    );
    expect(res.status).toBe(200);
    expect(res.body.ok).toEqual(true);
    expect(res.body.address).toBeDefined();
    expect(res.body.balance).toBeDefined();
  });

  test("shouldn't be able to create a wallet (user already has one).", async () => {
    const { res } = await postWithToken(
      "/auth/sign-in",
      "/web3/create-account",
      { password: user.password, userName: user.userName },
      { password: "1234" }
    );
    expect(res.status).toBe(400);
    expect(res.body.ok).toEqual(false);
    expect(res.body.error.message).toEqual(errors.hasWalletAccount.message);
    expect(res.body.error.code).toEqual(errors.hasWalletAccount.code);
  });
});

describe("POST /api/v1/web3/import-account", () => {
  test("shouldn't be able to import a wallet (token error).", async () => {
    const res = await invalidToken("/web3/import-account", true);
    expect(res.status).toBe(401);
    expect(res.body.ok).toEqual(false);
    expect(res.body.error.message).toEqual(errors.invalidAuthToken.message);
    expect(res.body.error.code).toEqual(errors.invalidAuthToken.code);
  });
  test("shouldn't be able to import a wallet (no-token error).", async () => {
    const res = await invalidToken("/web3/import-account", false);
    expect(res.status).toBe(401);
    expect(res.body.ok).toEqual(false);
    expect(res.body.error.message).toEqual(errors.noAuthToken.message);
    expect(res.body.error.code).toEqual(errors.noAuthToken.code);
  });

  test("should be able to import a wallet.", async () => {
    const { res } = await postWithToken(
      "/auth/sign-up",
      "/web3/import-account",
      user2,
      { password: "1234", privateKey: process.env.TEST_PRIVATE_KEY }
    );
    expect(res.status).toBe(200);
    expect(res.body.ok).toEqual(true);
    expect(res.body.address).toBeDefined();
    expect(res.body.balance).toBeDefined();
  });

  test("shouldn't be able to import a wallet (user already has one).", async () => {
    const { res } = await postWithToken(
      "/auth/sign-in",
      "/web3/import-account",
      { password: user2.password, userName: user2.userName },
      { password: "1234", privateKey: process.env.TEST_PRIVATE_KEY }
    );
    expect(res.status).toBe(400);
    expect(res.body.ok).toEqual(false);
    expect(res.body.error.message).toEqual(errors.hasWalletAccount.message);
    expect(res.body.error.code).toEqual(errors.hasWalletAccount.code);
  });
});

describe("POST /api/v1/web3/access", () => {
  test("shouldn't be able to access to wallet (token error).", async () => {
    const res = await invalidToken("/web3/access", true);
    expect(res.status).toBe(401);
    expect(res.body.ok).toEqual(false);
    expect(res.body.error.message).toEqual(errors.invalidAuthToken.message);
    expect(res.body.error.code).toEqual(errors.invalidAuthToken.code);
  });
  test("shouldn't be able to access to wallet (no-token error).", async () => {
    const res = await invalidToken("/web3/access", false);
    expect(res.status).toBe(401);
    expect(res.body.ok).toEqual(false);
    expect(res.body.error.message).toEqual(errors.noAuthToken.message);
    expect(res.body.error.code).toEqual(errors.noAuthToken.code);
  });

  test("should be able to access to wallet.", async () => {
    const { res } = await postWithToken(
      "/auth/sign-in",
      "/web3/access",
      { password: user2.password, userName: user2.userName },
      { password: "1234" }
    );
    expect(res.status).toBe(200);
    expect(res.body.ok).toEqual(true);
  });

  test("shouldn't be able to access to wallet (wrong password).", async () => {
    const { res } = await postWithToken(
      "/auth/sign-in",
      "/web3/access",
      { password: user2.password, userName: user2.userName },
      { password: "1256" }
    );
    expect(res.status).toBe(401);
    expect(res.body.ok).toEqual(false);
    expect(res.body.error.message).toEqual(errors.wrongWalletPassword.message);
    expect(res.body.error.code).toEqual(errors.wrongWalletPassword.code);
  });
  test("shouldn't be able to access to wallet (no wallet).", async () => {
    const { res, res1 } = await postWithToken(
      "/auth/sign-up",
      "/web3/access",
      { password: user3.password, userName: user3.userName },
      { password: "1256" }
    );
    expect(res.status).toBe(400);
    expect(res.body.ok).toEqual(false);
    expect(res.body.error.message).toEqual(
      errors.invalidIDorNoWallet(res1.body.user.id).message
    );
    expect(res.body.error.code).toEqual(
      errors.invalidIDorNoWallet(res1.body.user.id).code
    );
  });
});

describe("POST /api/v1/web3/get-key", () => {
  test("shouldn't be able to get privateKey (token error).", async () => {
    const res = await invalidToken("/web3/get-key", true);
    expect(res.status).toBe(401);
    expect(res.body.ok).toEqual(false);
    expect(res.body.error.message).toEqual(errors.invalidAuthToken.message);
    expect(res.body.error.code).toEqual(errors.invalidAuthToken.code);
  });
  test("shouldn't be able to get privateKey (no-token error).", async () => {
    const res = await invalidToken("/web3/get-key", false);
    expect(res.status).toBe(401);
    expect(res.body.ok).toEqual(false);
    expect(res.body.error.message).toEqual(errors.noAuthToken.message);
    expect(res.body.error.code).toEqual(errors.noAuthToken.code);
  });

  test("should be able to get privateKey.", async () => {
    const { res } = await postWithToken(
      "/auth/sign-in",
      "/web3/get-key",
      { password: user2.password, userName: user2.userName },
      { password: "1234" }
    );
    expect(res.status).toBe(200);
    expect(res.body.ok).toEqual(true);
    expect(res.body.privateKey).toEqual("0x" + process.env.TEST_PRIVATE_KEY);
  });

  test("shouldn't be able to get privateKey (wrong password).", async () => {
    const { res } = await postWithToken(
      "/auth/sign-in",
      "/web3/get-key",
      { password: user2.password, userName: user2.userName },
      { password: "1256" }
    );
    expect(res.status).toBe(401);
    expect(res.body.ok).toEqual(false);
    expect(res.body.error.message).toEqual(errors.wrongWalletPassword.message);
    expect(res.body.error.code).toEqual(errors.wrongWalletPassword.code);
  });
  test("shouldn't be able to get privateKey (no wallet).", async () => {
    const { res, res1 } = await postWithToken(
      "/auth/sign-in",
      "/web3/get-key",
      { password: user3.password, userName: user3.userName },
      { password: "1256" }
    );
    expect(res.status).toBe(400);
    expect(res.body.ok).toEqual(false);
    expect(res.body.error.message).toEqual(
      errors.invalidIDorNoWallet(res1.body.user.id).message
    );
    expect(res.body.error.code).toEqual(
      errors.invalidIDorNoWallet(res1.body.user.id).code
    );
  });
});

jest.setTimeout(30000);

describe("POST /api/v1/web3/transfer-to", () => {
  test("shouldn't be able to transfer eth (token error).", async () => {
    const res = await invalidToken("/web3/transfer-to", true);
    expect(res.status).toBe(401);
    expect(res.body.ok).toEqual(false);
    expect(res.body.error.message).toEqual(errors.invalidAuthToken.message);
    expect(res.body.error.code).toEqual(errors.invalidAuthToken.code);
  });
  test("shouldn't be able to transfer eth (no-token error).", async () => {
    const res = await invalidToken("/web3/transfer-to", false);
    expect(res.status).toBe(401);
    expect(res.body.ok).toEqual(false);
    expect(res.body.error.message).toEqual(errors.noAuthToken.message);
    expect(res.body.error.code).toEqual(errors.noAuthToken.code);
  });

  test("should be able to transfer eth.", async () => {
    const res_ = await simplePost("/auth/sign-in", {
      password: user.password,
      userName: user.userName,
    });

    const { res } = await postWithToken(
      "/auth/sign-in",
      "/web3/transfer-to",
      { password: user2.password, userName: user2.userName },
      { password: "1234", to: res_.body.user.account.address, value: "0.001" }
    );
    expect(res.status).toBe(200);
    expect(res.body.ok).toEqual(true);
    expect(res.body.to).toEqual("0x" + res_.body.user.account.address);
    expect(res.body.hash).toBeDefined();
    expect(res.body.status).toBeDefined();
  });

  test("shouldn't be able to transfer eth (wrong password).", async () => {
    const res_ = await simplePost("/auth/sign-in", {
      password: user.password,
      userName: user.userName,
    });

    const { res } = await postWithToken(
      "/auth/sign-in",
      "/web3/transfer-to",
      { password: user2.password, userName: user2.userName },
      {
        password: "1256",
        to: res_.body.user.account.address,
        value: "0.001",
      }
    );

    expect(res.status).toBe(401);
    expect(res.body.ok).toEqual(false);
    expect(res.body.error.message).toEqual(errors.wrongWalletPassword.message);
    expect(res.body.error.code).toEqual(errors.wrongWalletPassword.code);
  });
  test("shouldn't be able to transfer eth (no wallet).", async () => {
    const res_ = await simplePost("/auth/sign-in", {
      password: user.password,
      userName: user.userName,
    });

    const { res, res1 } = await postWithToken(
      "/auth/sign-in",
      "/web3/transfer-to",
      { password: user3.password, userName: user3.userName },
      {
        password: "1234",
        to: res_.body.user.account.address,
        value: "0.001",
      }
    );

    expect(res.status).toBe(400);
    expect(res.body.ok).toEqual(false);
    expect(res.body.error.message).toEqual(
      errors.invalidIDorNoWallet(res1.body.user.id).message
    );
    expect(res.body.error.code).toEqual(
      errors.invalidIDorNoWallet(res1.body.user.id).code
    );
  });
});
