import { Router } from "express";
import { validateAdmin, validateToken } from "../middlewares";
import { addMeta, admin, editMeta } from "../controllers";

const router = Router();

router.get("/", validateToken, validateAdmin, admin);
router.post("/add-meta", validateToken, validateAdmin, addMeta);
router.put("/edit-meta/:id", validateToken, validateAdmin, editMeta);

export default router;
