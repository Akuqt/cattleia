import { Router } from "express";
import { validateToken } from "../middlewares";
import { admin } from "../controllers";

const router = Router();

router.get("/", validateToken, admin);

export default router;
