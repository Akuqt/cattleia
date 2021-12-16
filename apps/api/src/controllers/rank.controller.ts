import { Request, Response } from "express";
import { errors, getRank, rankColor } from "../libs";
import { UserModel } from "../models";

/* istanbul ignore next */
export const updateRank = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = req.id;

  const { points } = req.body;

  const _user = await UserModel.findById(id).populate("rank");

  if (!_user)
    return res.status(400).json({
      ok: false,
      error: errors.invalidID(id),
    });

  if (typeof points !== "number" || points <= 0)
    return res.json({
      ok: false,
      error: errors.invalidPoints,
    });

  let { current, next } = await getRank(_user.rank.points);

  console.log(current.name, next.name);

  _user.rank.points += points;
  if (_user.rank.points >= next.points) {
    const diff = _user.rank.points - next.points;
    if (next.name === "gold" && diff >= 0) {
      _user.rank = next;
      _user.rank.points += diff;
    } else {
      _user.rank = next;
      _user.rank.points += diff;
    }
  }

  await _user.save();

  current = (await getRank(_user.rank.points)).current;
  next = (await getRank(_user.rank.points)).next;

  return res.json({
    ok: true,
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
  });
};
