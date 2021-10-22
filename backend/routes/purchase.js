import express from "express";
import paypal from "@paypal/payouts-sdk";
import { StatusCodes } from "http-status-codes";
import { v4 as uuidv4 } from "uuid";

import client from "../utils/payPalClient.js";
import { createTextMessage } from "../utils/defaultMessages.js";
import { donationToCredit } from "../utils/creditConversion.js";
import validatePurchase from "../middleware/payments/validatePurchase.js";

import Youth from "../models/Youth.js";
import Product from "../models/Product.js";
import Merchant from "../models/Merchant.js";

const router = express.Router();

// api/v1/payment/purchase
router.use("/", validatePurchase);
router.post("/", async (req, res) => {
  const decoded = decodeUserToken(req.headers.authorization);
  if (!decoded || decoded.role !== "youth") {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(createTextMessage("JWT passed is not valid"));
  }

  const youthUsername = decoded.role;
  const productName = req.body.product;

  const retrievedProduct = await Product.findOne({ name: productName });
  const retrievedYouth = await Youth.findOne({ username: youthUsername });

  // If youth don't have enough credit to buy the product
  if (
    retrievedYouth.credit_balance < donationToCredit(retrievedProduct.price)
  ) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("Not enough credits to purchase product"));
  }

  const reqBatchId = `test-sdk-${uuidv4()}`;
  const reqInformation = `Youth @${youthUsername} purchased ${productName}`;
  const retrievedMerchant = await Merchant.findOne({
    username: retrievedProduct.store_owner_username,
  });

  let requestBody = {
    sender_batch_header: {
      recipient_type: "EMAIL",
      note: reqInformation,
      sender_batch_id: reqBatchId,
      email_subject: reqInformation,
    },
    items: [
      {
        amount: {
          currency: "CAD",
          value: retrievedProduct.price,
        },
        receiver: retrievedMerchant.email,
      },
    ],
  };

  try {
    let request = new paypal.payouts.PayoutsPostRequest();
    request.requestBody(requestBody);
    await client().execute(request);
    await Youth.updateOne(
      { username: youthUsername },
      {
        $set: {
          credit_balance:
            retrievedYouth.credit_balance -
            donationToCredit(retrievedProduct.price),
        },
      }
    );

    return res.send(createTextMessage("Successfully processed payment"));
  } catch (err) {
    console.log(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(createTextMessage("Could not complete payout"));
  }
});

export default router;
