import Web3 from "web3";
import config from "../config";
import { UserModel, AccountModel } from "../models";
import { Request, Response } from "express";
import {
  User,
  errors,
  Account,
  Stacked,
  errorStack,
  transferToken,
  encryptPassword,
} from "../libs";

import contractData20 from "../abis/CattleiaERC20.json";
import contractData721 from "../abis/CattleiaERC721.json";

const web3 = new Web3(config.NETWORK);

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
  _req: Request,
  res: Response
): Promise<Response> => {
  return res.json({
    ok: true,
  });
};

export const createAccount = async (
  req: Request<any, any, { password: string }>,
  res: Response
): Promise<Response> => {
  const { password } = req.body;

  const _id = req.id;

  const _user = await UserModel.findById(_id).populate("account");

  if (!_user)
    return res.status(400).json({
      ok: false,
      error: errors.invalidID(_id),
    });

  if (_user.account.payload)
    return res.status(400).json({
      ok: false,
      error: errors.hasWalletAccount,
    });

  const account = web3.eth.accounts.create(getNonce());

  const encryptedKey = web3.eth.accounts.encrypt(account.privateKey, password);

  const _account: Account | null = await AccountModel.findById(
    _user.account._id
  );

  if (!_account)
    return res.json({
      ok: false,
      error: errors.noWalletAccount,
    });

  _account.password = await encryptPassword(password);

  _account.payload = encryptedKey;

  await _account.save();

  _user.account = _account;

  _user.save();

  return res.json({ ok: true, address: _account.payload.address });
};

export const importAccount = async (
  req: Request<any, any, { privateKey: string; password: string }>,
  res: Response
): Promise<Response> => {
  const id = req.id;

  const _user: User | null = await UserModel.findById(id).populate("account");

  if (!_user)
    return res.status(400).json({
      ok: false,
      error: errors.invalidID(id),
    });

  if (_user.account.payload)
    return res.status(400).json({
      ok: false,
      error: errors.hasWalletAccount,
    });

  let { privateKey, password } = req.body;

  if (!privateKey.startsWith("0x")) privateKey = "0x" + privateKey;

  const account = web3.eth.accounts.privateKeyToAccount(privateKey);

  const encryptedKey = web3.eth.accounts.encrypt(account.privateKey, password);

  const _account: Account | null = await AccountModel.findById(
    _user.account._id
  );

  if (!_account)
    return res.json({
      ok: false,
      error: errors.noWalletAccount,
    });

  _account.payload = encryptedKey;

  _account.password = await encryptPassword(password);

  await _account.save();

  _user.account = _account;

  await _user.save();

  return res.json({ ok: true, address: _account.payload.address });
};

export const getPrivateKey = async (
  req: Request<any, any, { password: string }>,
  res: Response
): Promise<Response> => {
  return res.json({ ok: true, privateKey: req.privateKey });
};

export const transferTo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const stack: Stacked[] = [];
  const { to, value } = req.body;
  try {
    const txConfig = {
      to,
      value: web3.utils.toHex(web3.utils.toWei(value, "ether")),
      gasLimit: web3.utils.toHex(21000),
      gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
    };

    const tx = await web3.eth.accounts.signTransaction(
      txConfig,
      req.privateKey
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

  return res.status(400).json({
    ok: false,
    error: stack[0],
  });
};

/* istanbul ignore next */
export const transferTokens = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const stack: Stacked[] = [];

  const contractAddress = process.env.ECR20_ADDRESS;

  const { to, value } = req.body;

  try {
    const result = await transferToken(
      web3,
      contractData20.abi,
      contractAddress,
      to,
      value,
      req.privateKey
    );

    return res.json({
      ok: true,
      status: result.status,
      hash: result.transactionHash,
      to: result.to,
    });
  } catch (e: any) {
    errorStack(stack, e);
  }

  return res.status(400).json({
    ok: false,
    error: stack[0],
  });
};

/* istanbul ignore next */
export const transferNFTs = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const stack: Stacked[] = [];

  const contractAddress = process.env.ECR721_ADDRESS;

  const { to, tokenId } = req.body;

  try {
    const result = await transferToken(
      web3,
      contractData721.abi,
      contractAddress,
      to,
      tokenId,
      req.privateKey
    );

    return res.json({
      ok: true,
      status: result.status,
      hash: result.transactionHash,
      to: result.to,
    });
  } catch (e: any) {
    errorStack(stack, e);
  }

  return res.status(400).json({
    ok: false,
    error: stack[0],
  });
};

/* istanbul ignore next */
export const fullBalance = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { address } = req.params;

  const balanceWeis = await web3.eth.getBalance(address);
  const eth = web3.utils.fromWei(balanceWeis, "ether");

  const contractAddress20 = process.env.ECR20_ADDRESS;
  const contractAddress721 = process.env.ECR721_ADDRESS;

  const contract20 = new web3.eth.Contract(
    contractData20.abi as any,
    contractAddress20
  );

  const contract721 = new web3.eth.Contract(
    contractData721.abi as any,
    contractAddress721
  );

  const ctt = await contract20.methods.balanceOf(address).call();
  const total_tokens = await contract721.methods.balanceOf(address).call();
  const tokens = await contract721.methods.tokensOf(address).call();

  return res.json({
    ok: true,
    balance: {
      eth,
      ctt,
      nft: {
        total: total_tokens,
        tokens,
      },
    },
  });
};
