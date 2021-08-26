import { Router } from "express";
import auth from "./auth.routes";
import admin from "./admin.routes";
import { index, refreshToken, revokeRefreshTokens } from "../controllers";

const router = Router();

router.get("/", index);

router.post("/refresh_token", refreshToken);

router.post("/revoke_token", revokeRefreshTokens);

router.use("/auth", auth);

router.use("/admin", admin);

export default router;
