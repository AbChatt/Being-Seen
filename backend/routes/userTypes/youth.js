import express from "express";
import { StatusCodes } from "http-status-codes";

import validateYouthSignup from "../../middleware/signup/validateYouthSignup.js";
import validateUserSignup from "../../middleware/signup/validateUserSignup.js";

import { createTextMessage } from "../../utils/defaultMessages.js";
import { createJwtMessage } from "../../utils/defaultMessages.js";
import { createUserToken } from "../../utils/jwtHelpers.js";
import userRoles from "../../utils/userRoles.js";
import createPayoutBody from "../../utils/payPalUtils.js";

import Donation from "../../models/Donation.js";
import Youth from "../../models/Youth.js";
import Donor from "../../models/Donor.js";
import User from "../../models/User.js";

const router = express.Router();

// api/v1/user/youth/signup
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
    return res.status(StatusCodes.CREATED).send(createJwtMessage(jwtToken));
  } catch (err) {
    console.log(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(createTextMessage("Error saving youth to database"));
  }
});

// api/v1/user/youth
router.get("/", async (req, res) => {
  const parseRetrievedYouth = async (youth) => {
    const rawDonations = await Donation.find({
      youth: youth.username,
    });

    const parsedDonations = await Promise.all(
      rawDonations.map(async (donation) => {
        const retrievedDonor = await Donor.findOne({
          username: donation.donor,
        });

        return {
          donor: retrievedDonor.display_name,
          youth: youth.name,
          amount: donation.amount,
          date: donation.date,
        };
      })
    );

    return {
      name: youth.name,
      username: youth.username,
      dateOfBirth: youth.date_of_birth,
      profilePicture: youth.profile_picture,
      savingPlan: youth.saving_plan,
      story: youth.story,
      donations: parsedDonations,
    };
  };

  // Request wants a specific youth
  if (req.query.username) {
    if (
      !(await User.exists({
        username: req.query.username,
        role: userRoles.youth,
      }))
    ) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(createTextMessage("Cannot find given youth"));
    }

    try {
      const retrievedYouth = await Youth.findOne({
        username: req.query.username,
      });
      const parsedYouth = await parseRetrievedYouth(retrievedYouth);
      return res.send(parsedYouth);
    } catch (err) {
      console.log(err);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(createTextMessage("Error retrieving youth from database"));
    }
  }

  // Request wants all youths
  try {
    const retrievedYouths = await Youth.find({});
    const parsedYouths = await Promise.all(
      retrievedYouths.map(async (youth) => {
        return await parseRetrievedYouth(youth);
      })
    );

    return res.send(parsedYouths);
  } catch (err) {
    console.log(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(createTextMessage("Error retrieving youths from database"));
  }
});

export default router;
