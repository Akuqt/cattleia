import { Request, Response } from "express";
import { errors } from "../libs";
import { MetaModel } from "../models";

export const metadata = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  const meta = await MetaModel.findOne({ nft: id });

  if (!meta)
    return res.status(404).json({
      ok: false,
      error: errors.metadataDoesntExist,
    });

  return res.json({
    name: meta.name,
    description: meta.description,
    image: meta.image,
    external_url: meta.external_url,
    attributes: meta.attributes,
  });
};
