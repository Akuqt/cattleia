import { RankModel } from "../models";
import { Rank } from "./interfaces";

export const rankColor = (name: string) => {
  switch (name) {
    case "newbie":
      return "#DF569A";
    case "bronze":
      return "#CD7F32";
    case "silver":
      return "#C0C0C0";
    case "gold":
      return "#FFD700";
    default:
      return "#DF569A";
  }
};

export const getRank = async (points: number) => {
  const _ranks: Rank[] = await RankModel.find();

  const next = _ranks.filter((r) => {
    if (points < r.points) {
      return r;
    }
  })[0];

  const current = _ranks
    .filter((r) => {
      if (points >= r.points) {
        return r;
      }
    })
    .slice(-1)[0];

  return { current, next };
};
