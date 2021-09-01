import { Schema, model } from "mongoose";
import { Account } from "../libs";

const accountSchema = new Schema(
  {
    payload: {
      type: Object,
    },
  },
  {
    versionKey: false,
  }
);

export const AccountModel = model<Account>("Account", accountSchema);
