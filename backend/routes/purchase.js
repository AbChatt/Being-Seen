import express from "express";
import paypal from "@paypal/payouts-sdk";
import { StatusCodes } from "http-status-codes";
import { v4 as uuidv4 } from "uuid";

import client from "../utils/payPalClient.js";
import { decodeUserToken } from "../utils/jwtHelpers.js";
import { createTextMessage } from "../utils/defaultMessages.js";
import { donationToCredit } from "../utils/creditConversion.js";
import userRoles from "../utils/userRoles.js";

import validatePurchase from "../middleware/payments/validatePurchase.js";
import verifyAuthHeader from "../middleware/security/verifyAuthHeader.js";

import Youth from "../models/Youth.js";
import Product from "../models/Product.js";
import Merchant from "../models/Merchant.js";

const router = express.Router();

// api/v1/payment/purchase
router.use("/", [verifyAuthHeader(userRoles.youth), validatePurchase]);
router.post("/", async (req, res) => {
  const decoded = decodeUserToken(req.headers.authorization);
  const youthUsername = decoded.username;
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
          credit_balance: (
            retrievedYouth.credit_balance -
            donationToCredit(retrievedProduct.price)
          ).toFixed(2),
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
