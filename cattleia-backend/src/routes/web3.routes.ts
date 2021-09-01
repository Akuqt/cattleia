import { Router } from "express";
import {
  createAccount,
  getBalance,
  getPrivateKey,
  importAccount,
  transferTo,
} from "../controllers/web3.controller";

import { validateToken } from "../middlewares";

const router = Router();

router.get("/balance", validateToken, getBalance);

router.post("/create-account", validateToken, createAccount);

router.post("/import-account", validateToken, importAccount);

router.post("/get-key", validateToken, getPrivateKey);

router.post("/transfer-to", validateToken, transferTo);

export default router;
