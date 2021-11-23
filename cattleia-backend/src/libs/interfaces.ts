import mongoose, { Document } from "mongoose";

export interface Role extends Document {
  _id?: mongoose.ObjectId;
  name: string;
}

export interface Rank extends Document {
  _id?: mongoose.ObjectId;
  name: string;
  points: number;
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
  rank: Rank;
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

interface Traits {
  display_types?: string;
  trait_type: string;
  value: string | number;
}

export interface Meta extends Document {
  nft: string;
  name: string;
  description: string;
  image?: string;
  external_url?: string;
  attributes?: Traits[];
}
