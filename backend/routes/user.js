import express from "express";
import { StatusCodes } from "http-status-codes";
import { decodeUserToken } from "../utils/jwtHelpers.js";
import { createTextMessage } from "../utils/defaultMessages.js";
import hasAuthHeader from "../middleware/hasAuthHeader.js";

import donorRoute from "./userTypes/donor.js";
import merchantRoute from "./userTypes/merchant.js";
import youthRoute from "./userTypes/youth.js";

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

router.use("/donor", donorRoute);
router.use("/merchant", merchantRoute);
router.use("/youth", youthRoute);

export default router;
