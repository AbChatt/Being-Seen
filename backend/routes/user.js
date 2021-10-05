import express from "express";
import { StatusCodes } from "http-status-codes";
import { decodeUserToken } from "../utils/jwtHelpers.js";
import { createTextMessage } from "../utils/defaultMessages.js";
import hasAuthHeader from "../middleware/hasAuthHeader.js";

import Donor from "../models/donors.js";
import User from "../models/users.js"
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

router.post("/signup/donors", async (req, res) => {
  console.log(req.body);
  const user = new User({
    username: req.body.username,
    role: "donors",
  })

  const donor = new Donor({
    name: req.body.name,
    username: req.body.username,
    profile_picture: req.body.profile_picture,
    date_of_birth: req.body.date_of_birth,
    password: req.body.password,
    credit_card: req.body.credit_card,
    organization: req.body.organization,
  });
  try {
    const savedDonor = await donor.save();
    res.json(savedDonor);
  } catch (err) {
    res.json({ message: err });
  }
  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

export default router;
