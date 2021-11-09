import { Request, Response } from "express";

export const admin = async (req: Request, res: Response): Promise<Response> => {
  if (req.role !== "admin")
    return res.status(401).json({
      ok: false,
      error: {
        message: "You need to be an admin.",
        code: 4045,
      },
    });

  return res.json({ msg: "admin" });
};
