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

export interface History extends Document {
  _id?: mongoose.ObjectId;
  date: string;
  method: string;
  total: number;
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
  history: History[];
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

export interface Product extends Document {
  _id?: mongoose.ObjectId;
  name: string;
  description1: string;
  description2?: string;
  image?: string;
  price: number;
  amount: number;
}
