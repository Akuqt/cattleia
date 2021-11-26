import { Router } from "express";
import { addHistory, getHistory } from "../controllers";
import { validateToken } from "../middlewares";

const router = Router();

router.post("/add", validateToken, addHistory);

router.get("/get", validateToken, getHistory);

export default router;
