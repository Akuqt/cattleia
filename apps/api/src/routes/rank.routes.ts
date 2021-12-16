import { Router } from "express";
import { updateRank } from "../controllers";
import { validateToken } from "../middlewares";

const router = Router();

router.post("/update", validateToken, updateRank);

export default router;
