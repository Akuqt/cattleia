import Web3 from "web3";
import { Request, Response } from "express";
import { UserModel, AccountModel } from "../models";
import { Account, User } from "../libs";

const web3 = new Web3(process.env.GANACHE);

const getNonce = (): string => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export const getBalance = async (req: Request, res: Response) => {
  const id = req.id;

  const _user: User | null = await UserModel.findById(id).populate("account");

  if (!_user || !_user.account.payload) return res.json({ ok: false });

  const balance = await web3.eth.getBalance(_user.account.payload.address);

  res.json({ balance });
};

export const createAccount = async (req: Request, res: Response) => {
  const { password } = req.body;

  const _id = req.id;

  const _user = await UserModel.findById(_id).populate("account");

  if (!_user || _user.account.payload) {
    return res.json({ ok: false });
  }

  const account = web3.eth.accounts.create(getNonce());

  const encryptedKey = web3.eth.accounts.encrypt(account.privateKey, password);

  const _account: Account | null = await AccountModel.findById(
    _user.account._id
  );

  if (!_account) return res.json({ ok: false });

  _account.payload = encryptedKey;

  await _account.save();

  _user.account = _account;

  _user.save();

  res.json({ encryptedKey });
};

export const importAccount = async (req: Request, res: Response) => {
  const id = req.id;

  const _user: User | null = await UserModel.findById(id).populate("account");

  if (!_user || _user.account.payload) return res.json({ ok: false });

  let { privateKey, password } = req.body;

  if (!(privateKey as string).startsWith("0x")) privateKey = "0x" + privateKey;

  const account = web3.eth.accounts.privateKeyToAccount(privateKey);

  const encryptedKey = web3.eth.accounts.encrypt(account.privateKey, password);

  const _account: Account = new AccountModel({ payload: encryptedKey });

  await _account.save();

  _user.account = _account;

  await _user.save();

  res.json({ ok: true });
};

export const getPrivateKey = async (req: Request, res: Response) => {
  const { password } = req.body;

  const _id = req.id;

  const _user = await UserModel.findById(_id).populate("account");

  if (!_user || !_user.account.payload) {
    return res.json({ ok: false });
  }
  const payloadKey = web3.eth.accounts.decrypt(
    _user.account.payload as any,
    password
  );

  res.json({ payloadKey });
};

export const transferTo = async (req: Request, res: Response) => {
  const id = req.id;

  const { password, to, value } = req.body;

  const _user: User | null = await UserModel.findById(id).populate("account");

  if (!_user || !_user.account.payload) return res.json({ ok: false });

  const payloadKey = web3.eth.accounts.decrypt(
    _user.account.payload as any,
    password
  );

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

  res.json({
    status: result.status,
    hash: result.transactionHash,
    to: result.to,
  });
};