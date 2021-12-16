import { Router } from "express";
// import { validateToken } from "../middlewares";
import { stripePaymentIntent, publishableKey } from "../controllers";

const router = Router();

router.post("/create-payment-intent", stripePaymentIntent);

router.get("/get-publishable-key", publishableKey);

export default router;
