import { Router } from "express";
import { singleProduct, allProducts } from "../controllers";

const router = Router();

router.get("/single/:name", singleProduct);

router.get("/all", allProducts);

export default router;
