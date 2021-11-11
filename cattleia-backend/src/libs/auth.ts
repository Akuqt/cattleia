import config from "../config";
import { RoleModel, RankModel } from "../models";
import { CookieOptions } from "express";
import { hash, verify } from "argon2";
import { User } from "./interfaces";
import { sign } from "jsonwebtoken";

export const createAcessToken = (user: User): string => {
  return sign(
    {
      user: user.userName,
      _id: user._id,
      role: user.role.name,
      tokenVersion: user.tokenVersion,
    },
    config.JWT.ACCESS,
    {
      expiresIn: "1d",
    }
  );
};

export const createRefreshToken = (user: User): string => {
  return sign(
    {
      user: user.userName,
      _id: user._id,
      role: user.role.name,
      tokenVersion: user.tokenVersion,
    },
    config.JWT.REFRESH,
    {
      expiresIn: "1d",
    }
  );
};

export const cookieConf: CookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  path: "/api/v1/refresh_token",
};

export const encryptPassword = async (password: string): Promise<string> =>
  await hash(password);

export const comparePassword = async (
  hash: string,
  password: string
): Promise<boolean> => await verify(hash, password);

export const initRoles = async (): Promise<void> => {
  try {
    const count = await RoleModel.estimatedDocumentCount();
    if (count > 0) {
      return;
    }
    const values = await Promise.all([
      new RoleModel({ name: "user" }).save(),
      new RoleModel({ name: "admin" }).save(),
    ]);
    console.log(values);
  } catch (error) {
    console.error(error);
  }
};

export const initRanks = async (): Promise<void> => {
  try {
    const count = await RankModel.estimatedDocumentCount();
    if (count > 0) {
      return;
    }
    const values = await Promise.all([
      new RankModel({ name: "newbie", points: 0 }).save(),
      new RankModel({ name: "bronze", points: 200 }).save(),
      new RankModel({ name: "silver", points: 500 }).save(),
      new RankModel({ name: "gold", points: 1000 }).save(),
    ]);
    console.log(values);
  } catch (error) {
    console.error(error);
  }
};
