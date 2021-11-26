import { Router } from "express";
import {
  createAccount,
  access,
  getPrivateKey,
  importAccount,
  transferTo,
  transferTokens,
  transferNFTs,
  fullBalance,
} from "../controllers/web3.controller";

import { validateToken, validateWallet } from "../middlewares";

const router = Router();

router.post("/access", validateToken, validateWallet, access);

router.post("/create-account", validateToken, createAccount);

router.post("/import-account", validateToken, importAccount);

router.post("/get-key", validateToken, validateWallet, getPrivateKey);

router.post("/transfer-to", validateToken, validateWallet, transferTo);

router.post("/transfer-tokens", validateToken, validateWallet, transferTokens);

router.post("/transfer-nft", validateToken, validateWallet, transferNFTs);

router.get("/balance/:address", fullBalance);

export default router;
