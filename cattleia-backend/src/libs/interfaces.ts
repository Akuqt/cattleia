import mongoose, { Document } from "mongoose";

export interface Role extends Document {
  _id?: mongoose.ObjectId;
  name: string;
}

export interface User extends Document {
  _id?: mongoose.ObjectId;
  email: string;
  name: string;
  userName: string;
  password: string;
  role: Role;
  tokenVersion: number;
}

export interface Payload {
  userName: string;
  _id: string;
  role: string;
  tokenVersion: number;
  iat: number;
  exp: number;
}
