import express from "express";
import paypal from "@paypal/payouts-sdk";
import { StatusCodes } from "http-status-codes";

import client from "../utils/payPalClient.js";
import { createTextMessage } from "../utils/defaultMessages.js";
import {
  creditToDonation,
  donationToCredit,
} from "../utils/creditConversion.js";

import Youth from "../models/Youth.js";
import Product from "../models/Product.js";

const router = express.Router();

// api/v1/payment/purchase
router.post("/", async (req, res) => {
  const youthUsername = req.body.youth;
  const productName = req.body.product;

  const retriecedProduct = await Product.findOne({ name: productName });
  const retrievedYouth = await Youth.findOne({ username: youthUsername });

  // if youth don't have enough credit to buy the product
  if (
    retrievedYouth.credit_balance < donationToCredit(retriecedProduct.price)
  ) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("not enough credits!"));
    return;
  }

  let createPayOutBody = async (productInfo) => {
    let senderBatchId = "Test_sdk_" + Math.random().toString(36).substring(7);

    const price = productInfo.price;
    const owner = Merchant.findOne({
      userName: productInfo.store_owner_username,
    });
    const receiverEmail = owner.email;
    return {
      sender_batch_header: {
        recipient_type: "EMAIL",
        note: "",
        sender_batch_id: senderBatchId,
        email_subject: "",
      },
      items: [
        {
          amount: {
            currency: "CAD",
            value: price,
          },
          receiver: receiverEmail,
          sender_item_id: "Test_txn_1",
        },
      ],
    };
  };

  // Construct a request object and set desired parameters
  let requestBody = createPayOutBody(retriecedProduct);

  // Here, PayoutsPostRequest() creates a POST request to /v1/payments/payouts
  let request = new paypal.payouts.PayoutsPostRequest();
  request.requestBody(requestBody);

  try {
    let createPayouts = async function () {
      let response = await client().execute(request);
      console.log(`Response: ${JSON.stringify(response)}`);
    };

    await createPayouts();
    res.send(createTextMessage(response.result.payout_batch_id));

    // update youth balence
    await Youth.updateOne(
      { username: newDonation.youth },
      {
        $set: {
          credit_balance:
            retrievedYouth.credit_balance - retriecedProduct.price,
        },
      }
    );
  } catch (error) {
    console.log(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(createTextMessage("Could not complete payout"));
  }
});

export default router;
