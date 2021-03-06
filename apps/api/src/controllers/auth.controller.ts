import Web3 from "web3";
import config from "../config";
import { UserModel, RoleModel, AccountModel, RankModel } from "../models";
import { getRank, rankColor } from "../libs";
import { Request, Response } from "express";
import {
  Rank,
  Role,
  User,
  errors,
  cookieConf,
  comparePassword,
  encryptPassword,
  createAcessToken,
  createRefreshToken,
} from "../libs";

const web3 = new Web3(config.NETWORK);

export const signIn = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { userName, password } = req.body;

  const _user: User | null = await UserModel.findOne({
    userName,
  })
    .populate("role")
    .populate("rank")
    .populate("account");

  if (_user) {
    const matchPass = await comparePassword(_user.password, password);
    if (!matchPass) {
      return res.status(401).json({
        ok: false,
        error: errors.wrongUserOrPassword,
      });
    } else {
      res.cookie("jid", createRefreshToken(_user), cookieConf);

      const { current, next } = await getRank(_user.rank.points);

      let balance = "";
      let address = "";

      if (_user.account.payload) {
        const balanceWeis = await web3.eth.getBalance(
          _user.account.payload.address
        );
        balance = web3.utils.fromWei(balanceWeis, "ether");
        address = _user.account.payload.address;
      }

      return res.json({
        ok: true,
        user: {
          id: _user._id,
          name: _user.name,
          userName: _user.userName,
          role: _user.role.name,
          email: _user.email,
          token: createAcessToken(_user),
          account: {
            hasAccount: _user.account.payload !== null,
            balance,
            address,
          },
          rank: {
            color: rankColor(current.name),
            name: current.name,
            points: _user.rank.points,
            next: {
              color: rankColor(next.name),
              name: next.name,
              points: next.points,
            },
          },
        },
      });
    }
  }
  return res.status(401).json({
    ok: false,
    error: errors.wrongUserOrPassword,
  });
};

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, userName, password, role, email } = req.body;

  const _user2: User | null = await UserModel.findOne({ userName });

  if (_user2 && _user2.userName === userName) {
    return res.json({
      ok: false,
      error: errors.userAlreadyTaken,
    });
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
      else return res.json({ ok: false, error: errors.invalidRole });
    } else {
      const roleD: Role | null = await RoleModel.findOne({ name: "user" });
      _user.role = roleD!;
    }

    const _ranks: Rank[] = await RankModel.find();

    const _account = new AccountModel({
      payload: null,
      password: "",
    });

    _account.save();

    _user.account = _account;

    _user.rank = _ranks[0];

    await _user.save();

    res.cookie("jid", createRefreshToken(_user), cookieConf);

    return res.json({
      ok: true,
      user: {
        id: _user._id,
        name: _user.name,
        userName: _user.userName,
        role: _user.role.name,
        account: {
          hasAccount: false,
          balance: "",
          address: "",
        },
        rank: {
          color: rankColor(_user.rank.name),
          name: _user.rank.name,
          points: _user.rank.points,
          next: {
            color: rankColor(_ranks[1].name),
            name: _ranks[1].name,
            points: _ranks[1].points,
          },
        },
        email: _user.email,
        token: createAcessToken(_user),
      },
    });
  }
};

export const changeName = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = req.id;
  const { name } = req.body;

  const _user: User | null = await UserModel.findById(id);

  if (!_user) {
    return res.status(401).json({
      ok: false,
      error: errors.invalidID(id),
    });
  }

  _user.name = name;

  await _user.save();

  return res.json({ ok: true });
};
