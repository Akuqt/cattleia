import { Request, Response } from "express";
import { errors } from "../libs";

export const admin = async (req: Request, res: Response): Promise<Response> => {
  if (req.role !== "admin")
    return res.status(401).json({
      ok: false,
      error: errors.noAdmin,
    });

  return res.json({ msg: "admin" });
};
