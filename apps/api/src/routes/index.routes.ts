import nft from "./nft.routes";
import auth from "./auth.routes";
import rank from "./rank.routes";
import web3 from "./web3.routes";
import admin from "./admin.routes";
import payment from "./payment.routes";
import product from "./product.routes";
import history from "./history.routes";
import { index, refreshToken, revokeRefreshTokens } from "../controllers";
import { validateToken } from "../middlewares";
import { Router } from "express";

const router = Router();

router.get("/", index);

router.post("/refresh_token", refreshToken);

router.post("/revoke_token", validateToken, revokeRefreshTokens);

router.use("/nft", nft);

router.use("/auth", auth);

router.use("/rank", rank);

router.use("/web3", web3);

router.use("/admin", admin);

router.use("/payment", payment);

router.use("/product", product);

router.use("/history", history);

export default router;
