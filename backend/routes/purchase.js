import express from "express";
import paypal from "@paypal/payouts-sdk";
import { StatusCodes } from "http-status-codes";

import client from "../utils/payPalClient.js";
import { createTextMessage } from "../utils/defaultMessages.js";

const router = express.Router();

// api/v1/payment/purchase
router.post("/", async (req, res) => {
  res.send("Add your code here");
});

export default router;
