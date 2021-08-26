import mongoose, { Document } from "mongoose";

export interface Role extends Document {
  _id?: mongoose.ObjectId;
  name: string;
}

export interface User extends Document {
  _id?: mongoose.ObjectId;
  userName: string;
  password: string;
  name?: string;
  gender?: string;
  birthDate?: Date;
  about?: string;
  stars: number;
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
