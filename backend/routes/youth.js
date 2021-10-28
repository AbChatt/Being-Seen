import express from "express";
import { StatusCodes } from "http-status-codes";

import validateYouthSignup from "../middleware/signup/validateYouthSignup.js";
import validateUserSignup from "../middleware/signup/validateUserSignup.js";
import validateUpdateYouth from "../middleware/update/validateUpdateYouth.js";

import { decodeUserToken, createUserToken } from "../utils/jwtHelpers.js";
import { createTextMessage } from "../utils/defaultMessages.js";
import { createJwtMessage } from "../utils/defaultMessages.js";
import userRoles from "../utils/userRoles.js";

import Donation from "../models/Donation.js";
import Youth from "../models/Youth.js";
import Donor from "../models/Donor.js";
import User from "../models/User.js";
import verifyAuthHeader from "../middleware/security/verifyAuthHeader.js";

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

// Method to generate the API returned youth object based on a retrieved
// youth object from database (isPrivate determines whether to return private
// information)
const parseRetrievedYouth = async (retrievedYouth, isPrivate) => {
  const rawDonations = await Donation.find({
    youth: retrievedYouth.username,
  });

  const parsedDonations = await Promise.all(
    rawDonations.map(async (donation) => {
      const retrievedDonor = await Donor.findOne({
        username: donation.donor,
      });

      return {
        donor: retrievedDonor.display_name,
        youth: retrievedYouth.name,
        amount: donation.amount,
        date: donation.date,
      };
    })
  );

  const publicInformation = {
    name: retrievedYouth.name,
    username: retrievedYouth.username,
    dateOfBirth: retrievedYouth.date_of_birth,
    profilePicture: retrievedYouth.profile_picture,
    savingPlan: retrievedYouth.saving_plan,
    story: retrievedYouth.story,
    donations: parsedDonations,
  };

  const privateInformation = {
    credits: retrievedYouth.credit_balance,
  };

  return {
    ...publicInformation,
    ...(isPrivate && privateInformation),
  };
};

// api/v1/user/youth
router.get("/", async (req, res) => {
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

// api/v1/user/youth/private
router.use("/private", verifyAuthHeader(userRoles.youth));
router.post("/private", async (req, res) => {
  const decoded = decodeUserToken(req.headers.authorization);

  try {
    const retrievedYouth = await Youth.findOne({ username: decoded.username });
    const parsedYouth = await parseRetrievedYouth(retrievedYouth, true);
    return res.send(parsedYouth);
  } catch (err) {
    console.log(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(createTextMessage("Error retrieving youth from database"));
  }
});

// api/v1/user/youth/update
router.use("/update", [verifyAuthHeader(userRoles.youth), validateUpdateYouth]);
router.put("/update", async (req, res) => {
  // get require JWT token that include youth username
  const decoded = decodeUserToken(rep.headers.authorization);
  const youthUsername = decoded.username;

  // get require name, profile_picture, story, saving_plan
  const name = req.body.name;
  const profile_picture = req.body.profile_picture;
  const story = req.body.story;
  const saving_plan = req.body.saving_plan;

  // find youth and update
  try {
    await Youth.findOneAndUpdate(
      { username: youthUsername },
      {
        name: name,
        profile_picture: profile_picture,
        story: story,
        saving_plan: saving_plan,
      }
    );
    return res.send(createTextMessage("successfully update your profile"));
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(createTextMessage("Error update profile"));
  }
});

export default router;
