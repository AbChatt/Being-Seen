import express from "express";
import { StatusCodes } from "http-status-codes";

import {
  createTextMessage,
  createJwtMessage,
} from "../utils/defaultMessages.js";
import { createUserToken, decodeUserToken } from "../utils/jwtHelpers.js";

import validateLogin from "../middleware/validateLogin.js";
import hasAuthHeader from "../middleware/hasAuthHeader.js";

import donorRoute from "./userTypes/donor.js";
import merchantRoute from "./userTypes/merchant.js";
import youthRoute from "./userTypes/youth.js";

import User from "../models/User.js";

const router = express.Router();

router.use("/validate", hasAuthHeader);
router.get("/validate", (req, res) => {
  if (decodeUserToken(req.headers.authorization)) {
    res.send(createTextMessage("JWT passed is valid"));
  } else {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .send(createTextMessage("JWT passed is not valid"));
  }
});

router.use("/login", validateLogin);
router.post("/login", async (req, res) => {
  const retrieved = await User.findOne({ username: req.body.username });
  if (!retrieved || !(await retrieved.comparePassword(req.body.password))) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .send(createTextMessage("Username or password is incorrect"));
  } else {
    res.send(
      createJwtMessage(
        createUserToken(
          req.body.username,
          req.body.password,
          Boolean(req.body.remember)
        )
      )
    );
  }
});

router.use("/donor", donorRoute);
router.use("/merchant", merchantRoute);
router.use("/youth", youthRoute);

export default router;
