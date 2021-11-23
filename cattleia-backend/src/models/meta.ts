import { Schema, model } from "mongoose";
import { Meta } from "../libs";

const metaSchema: Schema = new Schema(
  {
    nft: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
    },

    external_url: {
      type: String,
    },

    attributes: {
      type: [Object],
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

export const MetaModel = model<Meta>("Meta", metaSchema);
