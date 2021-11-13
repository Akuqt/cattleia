import { Schema, model } from "mongoose";
import { Role } from "../libs";

const roleSchema = new Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  }
);

export const RoleModel = model<Role>("Role", roleSchema);
