import { Request, Response } from "express";

export const admin = async (req: Request, res: Response): Promise<Response> => {
  if (req.role !== "admin") return res.status(401).json({ ok: false });

  return res.json({ msg: "admin" });
};
