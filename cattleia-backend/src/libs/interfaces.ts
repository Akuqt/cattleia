import mongoose, { Document } from "mongoose";

export interface Role extends Document {
  _id?: mongoose.ObjectId;
  name: string;
}

export interface AccountPayload {
  address: string;
  id: string;
  crypto: object;
  version: number;
}

export interface Account extends Document {
  _id?: mongoose.ObjectId;
  payload: AccountPayload;
  password: string;
}

export interface User extends Document {
  _id?: mongoose.ObjectId;
  email: string;
  name: string;
  userName: string;
  password: string;
  role: Role;
  account: Account;
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
