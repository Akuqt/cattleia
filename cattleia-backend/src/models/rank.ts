import { Schema, model } from "mongoose";
import { Rank } from "../libs";

const rankSchema = new Schema(
  {
    name: String,
    points: Number,
  },
  {
    versionKey: false,
  }
);

export const RankModel = model<Rank>("Rank", rankSchema);
