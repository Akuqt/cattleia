import { Schema, model } from "mongoose";
import { Product } from "../libs";

const productSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    description1: {
      type: String,
      required: true,
    },

    description2: {
      type: String,
    },

    image: {
      type: String,
    },

    price: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const ProductModel = model<Product>("Product", productSchema);
