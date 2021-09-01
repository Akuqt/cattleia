import { Router } from "express";
import {
  createAccount,
  access,
  getPrivateKey,
  importAccount,
  transferTo,
} from "../controllers/web3.controller";

import { validateToken } from "../middlewares";

const router = Router();

router.post("/access", validateToken, access);

router.post("/create-account", validateToken, createAccount);

router.post("/import-account", validateToken, importAccount);

router.post("/get-key", validateToken, getPrivateKey);

router.post("/transfer-to", validateToken, transferTo);

export default router;
