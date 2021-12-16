import { Request, Response } from "express";
import { errors } from "../libs";
import { UserModel, HistoryModel } from "../models";

export const addHistory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = req.id;

  const { method, date, total } = req.body;

  const _user = await UserModel.findById(id).populate("history");

  if (!_user)
    return res.status(400).json({
      ok: false,
      error: errors.invalidID(id),
    });

  const history = new HistoryModel({
    method,
    date,
    total,
  });

  await history.save();

  _user.history.push(history);

  await _user.save();

  return res.json({ ok: true });
};

export const getHistory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = req.id;

  const _user = await UserModel.findById(id).populate("history");

  if (!_user)
    return res.status(400).json({
      ok: false,
      error: errors.invalidID(id),
    });

  return res.json({ ok: true, history: _user.history.reverse() });
};
