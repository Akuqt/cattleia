import Web3 from "web3";
import { Request, Response } from "express";
import { UserModel, AccountModel } from "../models";
import {
  Account,
  User,
  encryptPassword,
  comparePassword,
  Stacked,
  errorStack,
} from "../libs";

const web3 = new Web3(process.env.INFURA_RINKEBY);

const getNonce = (): string => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export const access = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = req.id;
  const { password } = req.body;
  const _user: User | null = await UserModel.findById(id).populate("account");
  if (!_user || !_user.account.payload)
    return res.json({
      ok: false,
      error: {
        message: `There's no user with ID <${id}> or the user has no wallet account.`,
        code: 4040,
      },
    });
  if (!(await comparePassword(_user.account.password, password)))
    return res.json({
      ok: false,
      error: {
        message: `Invalid wallet password.`,
        code: 5040,
      },
    });
  return res.json({
    ok: true,
  });
};

export const createAccount = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { password } = req.body;

  const _id = req.id;

  const _user = await UserModel.findById(_id).populate("account");

  if (!_user || _user.account.payload)
    return res.json({
      ok: false,
      error: {
        message: `There's no user with ID <${_id}> or the user has no wallet account.`,
        code: 4040,
      },
    });

  const account = web3.eth.accounts.create(getNonce());

  const encryptedKey = web3.eth.accounts.encrypt(account.privateKey, password);

  const _account: Account | null = await AccountModel.findById(
    _user.account._id
  );

  if (!_account)
    return res.json({
      ok: false,
      error: {
        message: `There's no user with ID <${_id}> or the user has no wallet account.`,
        code: 4040,
      },
    });

  _account.password = await encryptPassword(password);

  _account.payload = encryptedKey;

  await _account.save();

  _user.account = _account;

  _user.save();

  return res.json({ ok: true, address: _account.payload.address, balance: 0 });
};

export const importAccount = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = req.id;

  const _user: User | null = await UserModel.findById(id).populate("account");

  if (!_user || _user.account.payload)
    return res.json({
      ok: false,
      error: {
        message: `There's no user with ID <${id}> or the user has no wallet account.`,
        code: 4040,
      },
    });

  let { privateKey, password } = req.body;

  if (!(privateKey as string).startsWith("0x")) privateKey = "0x" + privateKey;

  const account = web3.eth.accounts.privateKeyToAccount(privateKey);

  const encryptedKey = web3.eth.accounts.encrypt(account.privateKey, password);

  const _account: Account | null = await AccountModel.findById(
    _user.account._id
  );

  if (!_account)
    return res.json({
      ok: false,
      error: {
        message: "There's no wallet accout for this user.",
        code: 4050,
      },
    });

  _account.payload = encryptedKey;

  _account.password = await encryptPassword(password);

  await _account.save();

  _user.account = _account;

  await _user.save();

  const balanceWeis = await web3.eth.getBalance(_user.account.payload.address);
  const balance = web3.utils.fromWei(balanceWeis, "ether");

  return res.json({ ok: true, address: _account.payload.address, balance });
};

export const getPrivateKey = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { password } = req.body;

  const _id = req.id;

  const _user = await UserModel.findById(_id).populate("account");

  if (!_user || !_user.account.payload) {
    return res.json({
      ok: false,
      error: {
        message: `There's no user with ID <${_id}> or the user has no wallet account.`,
        code: 4040,
      },
    });
  }

  if (!(await comparePassword(_user.account.password, password)))
    return res.json({
      ok: false,
      error: {
        message: `Invalid wallet password.`,
        code: 5040,
      },
    });

  const payloadKey = web3.eth.accounts.decrypt(
    _user.account.payload as any,
    password
  );

  return res.json({ ok: true, privateKey: payloadKey.privateKey });
};

export const transferTo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const stack: Stacked[] = [];

  const id = req.id;

  const { password, to, value } = req.body;

  const _user: User | null = await UserModel.findById(id).populate("account");

  if (!_user || !_user.account.payload)
    return res.json({
      ok: false,
      error: {
        message: `There's no user with ID <${id}> or the user has no wallet account.`,
        code: 4040,
      },
    });

  if (!(await comparePassword(_user.account.password, password)))
    return res.json({
      ok: false,
      error: {
        message: `Invalid wallet password.`,
        code: 5040,
      },
    });

  const payloadKey = web3.eth.accounts.decrypt(
    _user.account.payload as any,
    password
  );

  try {
    const txConfig = {
      to,
      value: web3.utils.toHex(web3.utils.toWei(value, "ether")),
      gasLimit: web3.utils.toHex(21000),
      gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
    };

    const tx = await web3.eth.accounts.signTransaction(
      txConfig,
      payloadKey.privateKey
    );

    const raw = tx.rawTransaction || "";

    const result = await web3.eth.sendSignedTransaction(raw);

    return res.json({
      ok: true,
      status: result.status,
      hash: result.transactionHash,
      to: result.to,
    });
  } catch (e: any) {
    errorStack(stack, e);
  }

  return res.json({
    ok: false,
    error: stack[0],
  });
};
