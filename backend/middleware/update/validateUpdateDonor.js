import { StatusCodes } from "http-status-codes";

import { createTextMessage } from "../../utils/defaultMessages.js";

// Middleware to validate whether parameters associated with the validate
// update endpoint (name) are present and valid
const validateUpdateDonor = async (req, res, next) => {
  // Validate input name
  if (!req.body.name) {
    console.log(req.body.name);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("Name field cannot be empty"));
  }

  // Validate input organization

  if (!req.body.organization) {
    console.log(req.body.organization);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("organzation field cannot be empty"));
  }

  // Validate pictureUrl
  if (!req.body.profile_picture) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("profile picture field cannot be empty"));
  }

  next();
};

export default validateUpdateDonor;
