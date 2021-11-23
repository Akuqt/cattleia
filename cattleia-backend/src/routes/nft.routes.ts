import { Router } from "express";
import { metadata } from "../controllers";

const router = Router();

router.get("/metadata/:id", metadata);

export default router;
