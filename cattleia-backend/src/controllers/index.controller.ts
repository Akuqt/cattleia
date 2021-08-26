import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import config from "../config";
import {
  cookieConf,
  createAcessToken,
  createRefreshToken,
  User,
  Payload,
} from "../libs";
import { UserModel } from "../models";

export const index = (_req: Request, res: Response): Response =>
  res.json({ msg: "Hello" });

export const refreshToken = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const token = req.cookies.jid;
  if (!token)
    return res.json({
      ok: false,
      accessToken: "",
    });
  try {
    const payload = verify(token, config.JWT.REFRESH) as Payload;
    const user: User | null = await UserModel.findById(payload._id);
    if (!user || user.tokenVersion !== payload.tokenVersion)
      return res.json({
        ok: false,
        accessToken: "",
      });
    res.cookie("jid", createRefreshToken(user), cookieConf);
    return res.json({
      ok: true,
      accessToken: createAcessToken(user),
    });
  } catch (error) {
    return res.json({
      ok: false,
      accessToken: "",
    });
  }
};

export const revokeRefreshTokens = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const user: User | null = await UserModel.findById(id);
  if (!user) return res.json({ ok: false });

  user.tokenVersion += 1;
  await user.save();
  return res.json({ ok: true });
};
