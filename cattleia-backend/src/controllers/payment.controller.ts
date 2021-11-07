import { Request, Response } from "express";
import Stripe from "stripe";
import config from "../config";

const stripe = new Stripe(config.STRIPE_SECRET, {
  apiVersion: "2020-08-27",
  typescript: true,
});

export const stripePaymentIntent = async (req: Request, res: Response) => {
  const { amount } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "cop",
  });
  res.json({
    ok: true,
    clientSecret: paymentIntent.client_secret,
  });
};

export const publishableKey = (_req: Request, res: Response) => {
  res.json({
    publishableKey: config.STRIPE_PUBLISHABLE,
  });
};
