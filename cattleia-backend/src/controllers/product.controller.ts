import { Request, Response } from "express";
import { ProductModel } from "../models";
import { errors } from "../libs";

export const singleProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name } = req.params;

  const product = await ProductModel.findOne({ name });

  if (!product)
    return res.status(404).json({
      ok: false,
      error: errors.productDoesntExist,
    });

  return res.json({ ok: true, product });
};

export const allProducts = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  const products_ = await ProductModel.find();

  const products = products_.map((p) => ({
    id: p._id,
    name: p.name,
    price: p.price,
    description1: p.description1,
    description2: p.description2,
    img: p.image,
  }));

  return res.json({ ok: true, products });
};
