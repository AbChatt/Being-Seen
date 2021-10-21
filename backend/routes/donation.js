import express from "express";
import paypal from "@paypal/checkout-server-sdk";
import { StatusCodes } from "http-status-codes";

import client from "../utils/payPalClient.js";
import { donationToCredit } from "../utils/creditConversion.js";
import { createTextMessage } from "../utils/defaultMessages.js";
import validateCreateDonation from "../middleware/payments/validateCreateDonation.js";
import validateSaveDonation from "../middleware/payments/validateSaveDonation.js";
import PendingDonation from "../models/PendingDonation.js";
import Donation from "../models/Donation.js";
import Youth from "../models/Youth.js";

const router = express.Router();

// api/v1/payment/donation/create
router.use("/create", validateCreateDonation);
router.post("/create", async (req, res) => {
  const donorUsername = req.body.donor;
  const youthUsername = req.body.youth;
  const donationAmount = req.body.amount;

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "CAD",
          value: +donationAmount,
        },
      },
    ],
  });

  try {
    const order = await client().execute(request);
    const pendingDonation = new PendingDonation({
      order_id: order.result.id,
      youth: youthUsername,
      donor: donorUsername,
      amount: donationAmount,
    });
    await pendingDonation.save();
    res.status(StatusCodes.CREATED).send(createTextMessage(order.result.id));
  } catch (err) {
    console.log(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(createTextMessage("Could not create order"));
  }
});

// api/v1/payment/donation/save
router.use("/save", validateSaveDonation);
router.post("/save", async (req, res) => {
  const orderId = req.body.orderId;
  const request = new paypal.orders.OrdersGetRequest(orderId);

  try {
    const order = await client().execute(request);
    const pendingDonation = await PendingDonation.findOne({
      donor_id: orderId,
    });

    if (order.result.status !== "COMPLETED") {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(createTextMessage("Donation process has not been completed"));
    }

    const newDonation = new Donation({
      order_id: orderId,
      donor: pendingDonation.donor,
      youth: pendingDonation.youth,
      amount: pendingDonation.amount,
      date: order.result.create_time,
    });

    await newDonation.save();

    const retrievedYouth = await Youth.findOne({ username: newDonation.youth });
    await Youth.updateOne(
      { username: newDonation.youth },
      {
        $set: {
          credit_balance:
            retrievedYouth.credit_balance +
            donationToCredit(newDonation.amount),
        },
      }
    );

    res.send(createTextMessage("Donation processed successfully"));
  } catch (err) {
    console.log(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(createTextMessage("Error processing donation"));
  }
});

export default router;
