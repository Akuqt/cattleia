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
      default:
        "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg",
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
