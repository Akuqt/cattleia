import { validateAdmin, validateToken } from "../middlewares";
import { Router } from "express";
import {
  admin,
  addMeta,
  editMeta,
  addProduct,
  editProduct,
} from "../controllers";

const router = Router();

router.get("/", validateToken, validateAdmin, admin);

router.post("/add-meta", validateToken, validateAdmin, addMeta);

router.put("/edit-meta/:id", validateToken, validateAdmin, editMeta);

router.post("/add-product", validateToken, validateAdmin, addProduct);

router.put("/edit-product/:name", validateToken, validateAdmin, editProduct);

export default router;
