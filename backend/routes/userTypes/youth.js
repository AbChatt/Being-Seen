import express from "express";
import { StatusCodes } from "http-status-codes";

import validateYouthSignup from "../../middleware/signup/validateYouthSignup.js";
import validateUserSignup from "../../middleware/signup/validateUserSignup.js";

import {
  createTextMessage,
  createJwtMessage,
} from "../../utils/defaultMessages.js";
import { createUserToken } from "../../utils/jwtHelpers.js";
import userRoles from "../../utils/userRoles.js";
import createPayoutBody from "../../utils/payPalUtils.js";

import Youth from "../../models/Youth.js";
import User from "../../models/User.js";

const router = express.Router();

router.use("/signup", [validateUserSignup, validateYouthSignup]);
router.post("/signup", async (req, res) => {
  const newUser = new User({
    role: userRoles.youth,
    username: req.body.username,
    password: req.body.password,
  });

  const newYouth = new Youth({
    name: req.body.name,
    username: req.body.username,
    date_of_birth: req.body.date_of_birth,
    profile_picture: req.body.profile_picture || "#",
  });

  try {
    await newUser.save();
    await newYouth.save();
    const jwtToken = createUserToken(req.body.username, userRoles.youth);
    res.status(StatusCodes.CREATED).send(createJwtMessage(jwtToken));
  } catch (err) {
    console.log(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(createTextMessage("Error saving youth to database"));
  }
});

router.post("/checkout", async (req, res) => {
  let requestBody = {
    sender_batch_header: {
      recipient_type: "EMAIL",
      email_message: "SDK payouts test txn",
      note: "Enjoy your Payout!!",
      sender_batch_id: "Test_sdk_3",
      email_subject: "This is a test transaction from SDK",
    },
    items: [
      {
        note: "Your 10$ Payout!",
        amount: {
          currency: "CAD",
          value: "10.00",
        },
        receiver: "sb-24mve8025231@business.example.com",
        sender_item_id: "Test_txn_1",
      },
    ],
  };
  // let requestBody = createPayoutBody(productInfo);

  // Construct a request object and set desired parameters
  // Here, PayoutsPostRequest() creates a POST request to /v1/payments/payouts
  let request = new paypal.payouts.PayoutsPostRequest();
  request.requestBody(requestBody);

  // Call API with your client and get a response for your call
  let createPayouts = async function () {
    let response = await client().execute(request);
    console.log(`Response: ${JSON.stringify(response)}`);
  };

  await createPayouts();
  res.send("");
});

export default router;
