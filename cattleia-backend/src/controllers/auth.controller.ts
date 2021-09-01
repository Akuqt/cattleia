import { Request, Response } from "express";
import {
  User,
  Role,
  cookieConf,
  createAcessToken,
  createRefreshToken,
  comparePassword,
  encryptPassword,
} from "../libs";
import { UserModel, RoleModel, AccountModel } from "../models";

export const signIn = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { userName, password } = req.body;

  const _user: User | null = await UserModel.findOne({
    userName,
  }).populate("role");

  if (_user) {
    const matchPass = await comparePassword(_user.password, password);
    if (!matchPass) {
      return res.json({ ok: false });
    } else {
      res.cookie("jid", createRefreshToken(_user), cookieConf);

      return res.json({
        ok: true,
        user: {
          id: _user._id,
          name: _user.name,
          userName: _user.userName,
          role: _user.role.name,
          email: _user.email,
          token: createAcessToken(_user),
        },
      });
    }
  }
  return res.status(401).json({ ok: false });
};

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, userName, password, role, email } = req.body;

  const _user2: User | null = await UserModel.findOne({ userName });

  if (_user2 && _user2.userName === userName) {
    return res.json({ ok: false });
  } else {
    const _user: User = new UserModel({
      name,
      email,
      userName,
      password: await encryptPassword(password),
    });

    if (role) {
      const foundRole: Role | null = await RoleModel.findOne({ name: role });
      if (foundRole) _user.role = foundRole;
      else return res.json({ ok: false });
    } else {
      const roleD: Role | null = await RoleModel.findOne({ name: "user" });
      _user.role = roleD!;
    }

    const _account = new AccountModel({
      payload: null,
    });

    _account.save();

    _user.account = _account;

    await _user.save();

    return res.json({
      ok: true,
      user: {
        id: _user._id,
        name: _user.name,
        userName: _user.userName,
        role: _user.role.name,
        email: _user.email,
        token: createAcessToken(_user),
      },
    });
  }
};
