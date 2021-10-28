import { StatusCodes } from "http-status-codes";

import { createTextMessage } from "../../utils/defaultMessages.js";

// Middleware to validate whether parameters associated with the validate
// update endpoint (youth) are present and valid
const validateUpdateYouth = async (req, res, next) => {
  console.log(req.body);

  // Validate input feild
  if (!req.body.name) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("youth name is empty"));
  }
  if (!req.body.profile_picture) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("profile picture is empty"));
  }
  if (!req.body.story) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("stroy is empty"));
  }
  if (!req.body.saving_plan) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("saving_plan is empty"));
  }

  next();
};

export default validateUpdateYouth;
