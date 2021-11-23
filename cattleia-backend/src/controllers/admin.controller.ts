import { Request, Response } from "express";
import { errors, Meta } from "../libs";
import { MetaModel } from "../models";

export const admin = (_req: Request, res: Response): Response => {
  return res.json({ ok: true, msg: "admin" });
};

export const addMeta = async (
  req: Request<any, any, Meta>,
  res: Response
): Promise<Response> => {
  const { attributes, description, external_url, image, name, nft } = req.body;

  const found = await MetaModel.findOne({ nft });

  console.log(req.body);

  if (found) {
    return res.status(400).json({
      ok: false,
      error: errors.metadataAlreadyExist,
    });
  }

  const meta = new MetaModel({
    attributes,
    description,
    external_url,
    nft,
    image,
    name,
  });

  await meta.save();

  return res.json({ ok: true });
};

export const editMeta = async (
  req: Request<any, any, Meta>,
  res: Response
): Promise<Response> => {
  const { id: nft } = req.params;
  const { attributes, description, external_url, image, name } = req.body;

  const found = await MetaModel.findOne({ nft });

  if (!found) {
    return res.status(404).json({
      ok: false,
      error: errors.metadataDoesntExist,
    });
  }

  found.name = name;
  found.description = description;
  found.image = image;
  found.external_url = external_url;
  found.attributes = attributes;

  await found.save();

  return res.json({ ok: true });
};
