import { StatusCodes } from "http-status-codes";

import { createTextMessage } from "../../utils/defaultMessages.js";

// Middleware to validate whether parameters associated with the validate
// update endpoint (name) are present and valid
const validateUpdateMerchant = async (req, res, next) => {
  console.log(req.body);

  // Validate input name
  if (!req.body.name) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("Name field cannot be empty"));
  }

  // Validate input store_name
  if (!req.body.store_name) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("Store Name field cannot be empty"));
  }

  // Validate input location
  if (!req.body.location) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("location field cannot be empty"));
  }

  // Validate input email
  if (!req.body.email) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("email field cannot be empty"));
  }

  next();
};

export default validateUpdateMerchant;
