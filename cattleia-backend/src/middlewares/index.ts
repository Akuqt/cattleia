import Web3 from "web3";
import config from "../config";
import { NextFunction, Request, Response } from "express";
import { comparePassword, errors, Payload, User } from "../libs";
import { verify } from "jsonwebtoken";
import { UserModel } from "../models";

const web3 = new Web3(config.NETWORK);

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token1: string = req.header("Authorization") || "";
  if (!token1)
    return res.status(401).json({
      ok: false,
      error: errors.noAuthToken,
    });
  else {
    const [tk, token] = token1.split(" ");
    if (token && tk === "bearer") {
      try {
        const payload = verify(token, config.JWT.ACCESS) as Payload;
        req.userName = payload.userName;
        req.id = payload._id;
        req.role = payload.role;
      } catch (error) {
        return res.status(401).json({
          ok: false,
          error: errors.invalidAuthToken,
        });
      }
    } else {
      return res.status(401).json({
        ok: false,
        error: errors.noAuthToken,
      });
    }
  }
  next();
};

export const validateAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.role !== "admin")
    return res.status(401).json({
      ok: false,
      error: errors.noAdmin,
    });
  next();
};
export const validateWallet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.id;
  const { password } = req.body;

  const _user: User | null = await UserModel.findById(id).populate("account");

  if (!_user || !_user.account.payload)
    return res.status(400).json({
      ok: false,
      error: errors.invalidIDorNoWallet(id),
    });

  if (!(await comparePassword(_user.account.password, password)))
    return res.status(401).json({
      ok: false,
      error: errors.wrongWalletPassword,
    });

  const payloadKey = web3.eth.accounts.decrypt(
    _user.account.payload as any,
    password
  );

  req.privateKey = payloadKey.privateKey;
  req.address = payloadKey.address;

  next();
};
