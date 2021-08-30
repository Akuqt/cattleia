import config from "../config";
import { User } from "./interfaces";
import { sign } from "jsonwebtoken";
import { CookieOptions } from "express";
import { hash, verify } from "argon2";
import { RoleModel } from "../models";

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
