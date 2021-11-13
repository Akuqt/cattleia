import Stripe from "stripe";
import config from "../config";
import { Request, Response } from "express";
import { errors } from "../libs";

const stripe = new Stripe(config.STRIPE_SECRET, {
  apiVersion: "2020-08-27",
  typescript: true,
});

export const stripePaymentIntent = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { amount } = req.body;

  if (amount < 2000 || !amount) {
    return res.status(400).json({
      ok: false,
      error: errors.invalidAmount,
    });
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "cop",
  });
  return res.json({
    ok: true,
    clientSecret: paymentIntent.client_secret,
  });
};

export const publishableKey = (_req: Request, res: Response) => {
  res.json({
    ok: true,
    publishableKey: config.STRIPE_PUBLISHABLE,
  });
};
