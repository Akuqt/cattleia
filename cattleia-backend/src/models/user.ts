import { Schema, model } from "mongoose";
import { User } from "../libs";

const userSchema: Schema = new Schema(
  {
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

    tokenVersion: {
      type: Number,
      default: 0,
    },

    name: {
      type: String,
    },

    gender: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const UserModel = model<User>("User", userSchema);
