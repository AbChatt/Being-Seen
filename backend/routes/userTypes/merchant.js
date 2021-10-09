import express from "express";
import { StatusCodes } from "http-status-codes";

import validateMerchantSignup from "../../middleware/signup/validateMerchantSignup.js";
import validateUserSignup from "../../middleware/signup/validateUserSignup.js";

import {
  createTextMessage,
  createJwtMessage,
} from "../../utils/defaultMessages.js";
import { createUserToken } from "../../utils/jwtHelpers.js";
import userRoles from "../../utils/userRoles.js";

import Merchant from "../../models/Merchant.js";
import User from "../../models/User.js";

const router = express.Router();

router.use("/signup", [validateUserSignup, validateMerchantSignup]);
router.post("/signup", async (req, res) => {
  const newUser = new User({
    role: userRoles.merchant,
    username: req.body.username,
    password: req.body.password,
  });

  const newMerchant = new Merchant({
    name: req.body.name,
    username: req.body.username,
    date_of_birth: req.body.date_of_birth,
    profile_picture: req.body.profile_picture || "#",
    store_name: req.body.store_name,
    location: req.body.location,
    email: req.body.email,
  });

  try {
    await newUser.save();
    await newMerchant.save();
    const jwtToken = createUserToken(req.body.username, userRoles.merchant);
    res.status(StatusCodes.CREATED).send(createJwtMessage(jwtToken));
  } catch (err) {
    console.log(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(createTextMessage("Error saving merchant to database"));
  }
});

export default router;
