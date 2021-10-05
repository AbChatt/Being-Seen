import express from "express";
import { StatusCodes } from "http-status-codes";
import { decodeUserToken, createUserToken } from "../../utils/jwtHelpers.js";
import { createTextMessage } from "../../utils/defaultMessages.js";
import Donor from "../../models/Donor.js";
import User from "../../models/User.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  console.log(req.body);

  const user = new User({
    username: req.body.username,
    role: "donors",
  });

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
    const savedUser = await user.save();
    res.json(savedUser, savedDonor, 2);
  } catch (err) {
    res.json({ message: err });
  }
});

export default router;
