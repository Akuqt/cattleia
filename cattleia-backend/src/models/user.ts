import { Schema, model } from "mongoose";
import { User } from "../libs";

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
    },

    email: {
      type: String,
    },

    userName: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      ref: "Role",
      type: Schema.Types.ObjectId,
    },

    rank: {
      points: Number,
      name: String,
    },

    account: {
      ref: "Account",
      type: Schema.Types.ObjectId,
    },

    tokenVersion: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const UserModel = model<User>("User", userSchema);
