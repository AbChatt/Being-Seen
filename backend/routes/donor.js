import express from "express";
import { StatusCodes } from "http-status-codes";

import validateDonorSignup from "../middleware/signup/validateDonorSignup.js";
import validateUserSignup from "../middleware/signup/validateUserSignup.js";
import verifyAuthHeader from "../middleware/security/verifyAuthHeader.js";

import { decodeUserToken, createUserToken } from "../utils/jwtHelpers.js";
import { createTextMessage } from "../utils/defaultMessages.js";
import { createJwtMessage } from "../utils/defaultMessages.js";
import userRoles from "../utils/userRoles.js";

import Donor from "../models/Donor.js";
import Youth from "../models/Youth.js";
import Donation from "../models/Donation.js";
import User from "../models/User.js";

const router = express.Router();

// api/v1/user/donor/signup
router.use("/signup", [validateUserSignup, validateDonorSignup]);
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
    return res.status(StatusCodes.CREATED).send(createJwtMessage(jwtToken));
  } catch (err) {
    console.log(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(createTextMessage("Error saving donor to database"));
  }
});

// Method to generate the API returned donor object based on a retrieved
// donor object from database
const parseRetrievedDonor = async (retrievedDonor) => {
  const rawDonations = await Donation.find({
    donor: retrievedDonor.username,
  });

  const parsedDonations = await Promise.all(
    rawDonations.map(async (donation) => {
      const retrievedYouth = await Youth.findOne({
        username: donation.youth,
      });

      return {
        donor: retrievedDonor.display_name,
        youth: retrievedYouth.name,
        amount: donation.amount,
        date: donation.date,
      };
    })
  );

  return {
    name: retrievedDonor.name,
    username: retrievedDonor.username,
    dateOfBirth: retrievedDonor.date_of_birth,
    profilePicture: retrievedDonor.profile_picture,
    organization: retrievedDonor.organization,
    anonymize: retrievedDonor.anonymize,
    donations: parsedDonations,
  };
};

// api/v1/user/donor/private
router.use("/private", verifyAuthHeader(userRoles.donor));
router.post("/private", async (req, res) => {
  const decoded = decodeUserToken(req.headers.authorization);

  try {
    const retrievedDonor = await Donor.findOne({ username: decoded.username });
    const parsedDonor = await parseRetrievedDonor(retrievedDonor);
    return res.send(parsedDonor);
  } catch (err) {
    console.log(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(createTextMessage("Error retrieving donor from database"));
  }
});

export default router;
