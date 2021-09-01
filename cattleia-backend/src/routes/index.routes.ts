import { Router } from "express";
import auth from "./auth.routes";
import admin from "./admin.routes";
import web3 from "./web3.routes";
import { index, refreshToken, revokeRefreshTokens } from "../controllers";

const router = Router();

router.get("/", index);

router.post("/refresh_token", refreshToken);

router.post("/revoke_token", revokeRefreshTokens);

router.use("/auth", auth);

router.use("/admin", admin);

router.use("/web3", web3);

export default router;
