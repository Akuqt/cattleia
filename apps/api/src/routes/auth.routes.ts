import { Router } from "express";
import { validateToken } from "../middlewares";
import { changeName, signIn, signUp } from "../controllers";

const router = Router();

router.post("/sign-in", signIn);

router.post("/sign-up", signUp);

router.post("/change-name", validateToken, changeName);

export default router;
