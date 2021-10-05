import express from "express";
import { StatusCodes } from "http-status-codes";

import validateDonorSignup from "../../middleware/signup/validateDonorSignup.js";
import validateUserSignup from "../../middleware/signup/validateUserSignup.js";

import {
  createTextMessage,
  createJwtMessage,
} from "../../utils/defaultMessages.js";
import { createUserToken } from "../../utils/jwtHelpers.js";
import userRoles from "../../utils/userRoles.js";

import Donor from "../../models/Donor.js";
import User from "../../models/User.js";

const router = express.Router();

router.use("/signup", validateDonorSignup);
router.post("/signup", async (req, res) => {
  const newUser = new User({
    role: userRoles.donor,
    username: req.body.username,
    password: req.body.password,
  });

  const newDonor = new Donor({
    name: req.body.name,
    username: req.body.username,
    date_of_birth: req.body.date_of_birth,
    organization: req.body.organization || "None",
    profile_picture: req.body.profile_picture || "#",
    display_name: Boolean(req.body.anonymize) ? "Anonymous" : req.body.name,
    anonymize: Boolean(req.body.anonymize),
  });

  try {
    await newUser.save();
    await newDonor.save();
    const jwtToken = createUserToken(req.body.username, userRoles.donor);
    res.status(StatusCodes.CREATED).send(createJwtMessage(jwtToken));
  } catch (err) {
    console.log(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(createTextMessage("Error saving donor to database"));
  }
});

export default router;
