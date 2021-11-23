import config from "../config";
import { NextFunction, Request, Response } from "express";
import { errors, Payload } from "../libs";
import { verify } from "jsonwebtoken";

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token1: string = req.header("Authorization") || "";
  if (!token1)
    return res.status(401).json({
      ok: false,
      error: errors.noAuthToken,
    });
  else {
    const [tk, token] = token1.split(" ");
    if (token && tk === "bearer") {
      try {
        const payload = verify(token, config.JWT.ACCESS) as Payload;
        req.userName = payload.userName;
        req.id = payload._id;
        req.role = payload.role;
      } catch (error) {
        return res.status(401).json({
          ok: false,
          error: errors.invalidAuthToken,
        });
      }
    } else {
      return res.status(401).json({
        ok: false,
        error: errors.noAuthToken,
      });
    }
  }
  next();
};

export const validateAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.role !== "admin")
    return res.status(401).json({
      ok: false,
      error: errors.noAdmin,
    });
  next();
};
