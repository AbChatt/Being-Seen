import express from "express";
import { StatusCodes } from "http-status-codes";

import validateYouthSignup from "../../middleware/signup/validateYouthSignup.js";
import validateUserSignup from "../../middleware/signup/validateUserSignup.js";

import { createTextMessage } from "../../utils/defaultMessages.js";
import { createJwtMessage } from "../../utils/defaultMessages.js";
import { createUserToken } from "../../utils/jwtHelpers.js";
import userRoles from "../../utils/userRoles.js";

import Youth from "../../models/Youth.js";
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

export default router;
