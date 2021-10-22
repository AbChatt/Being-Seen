import express, { response } from "express";
import client from "../utils/payOutclient.js";
import paypal from "@paypal/payouts-sdk";

import { createTextMessage } from "../utils/defaultMessages.js";
import { StatusCodes } from "http-status-codes";
import Youth from "../models/Youth.js";
import Product from "../models/Product.js";
import createPayOutBody from "../utils/payPalUtils.js";

const router = express.Router();

// api/v1/purchase/checkout
router.post("/checkout", async (req, res) => {
  const youthUsername = req.body.youth;
  const productName = req.body.product;

  const retriecedProduct = await Product.findOne({ name: productName });
  const retrievedYouth = await Youth.findOne({ username: youthUsername });

  // if youth don't have enough credit to buy the product
  if (retrievedYouth.credit_balance < retriecedProduct.price) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("not enough credits!"));
    return;
  }

  // Construct a request object and set desired parameters
  let requestBody = createPayOutBody(retriecedProduct);

  // //uncomment to test
  // let requestBody = {
  //   sender_batch_header: {
  //     recipient_type: "EMAIL",
  //     note: "",
  //     sender_batch_id: "1",
  //     email_subject: "",
  //   },
  //   items: [
  //     {
  //       amount: {
  //         currency: "CAD",
  //         value: "10",
  //       },
  //       receiver: "merchantId@utsc.com",
  //       sender_item_id: "Test_txn_1",
  //     },
  //   ],
  // };

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
