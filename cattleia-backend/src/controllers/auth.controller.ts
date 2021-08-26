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
import { UserModel, RoleModel } from "../models";

export const signIn = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { userName, password } = req.body;
  const _user: User | null = await UserModel.findOne({ userName }).populate(
    "role"
  );

  if (_user) {
    const matchPass = await comparePassword(_user.password, password);
    if (!matchPass) {
      return res.status(401).json({ ok: false });
    } else {
      res.cookie("jid", createRefreshToken(_user), cookieConf);

      return res.json({
        ok: true,
        user: {
          id: _user._id,
          userName: _user.userName,
          role: _user.role.name,
          name: _user.name,
          gender: _user.gender,
          birthDate: _user.birthDate,
          about: _user.about,
        },
        accessToken: createAcessToken(_user),
      });
    }
  }
  return res.status(401).json({ ok: false });
};

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, gender, birthDate, userName, password, role, about } = req.body;

  const _user2: User | null = await UserModel.findOne({ userName });

  if (_user2 && _user2.userName === userName) {
    return res.json({ ok: false });
  } else {
    const _user: User = new UserModel({
      name,
      gender,
      birthDate,
      about,
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

    await _user.save();

    return res.json({
      ok: true,
    });
  }
};
