import { Schema, model } from "mongoose";
import { History } from "../libs";

const historySchema: Schema = new Schema(
  {
    date: {
      type: String,
      required: true,
    },

    method: {
      type: String,
      required: true,
    },

    total: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

export const HistoryModel = model<History>("History", historySchema);
