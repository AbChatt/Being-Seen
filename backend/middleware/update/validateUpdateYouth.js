import { StatusCodes } from "http-status-codes";

import { createTextMessage } from "../../utils/defaultMessages.js";

// Middleware to validate whether parameters associated with the validate
// update endpoint (name) are present and valid
const validateUpdateYouth = async (req, res, next) => {
  console.log(req.body);

  // Validate input name
  if (!req.body.name) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("Name field cannot be empty"));
  }

  next();
};

export default validateUpdateYouth;
