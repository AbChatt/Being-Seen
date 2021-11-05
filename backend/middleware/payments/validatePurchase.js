import { StatusCodes } from "http-status-codes";

import { createTextMessage } from "../../utils/defaultMessages.js";
import userRoles from "../../utils/userRoles.js";

import Product from "../../models/Product.js";
import User from "../../models/User.js";

// Middleware to validate whether parameters associated with the validate
// purchase endpoint (product) are present and valid
const validatePurchase = async (req, res, next) => {
  console.log(req.body);

  // Validate product name
  if (!req.body.product) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("Product name is empty"));
  } else if (!(await Product.exists({ name: req.body.product }))) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send(createTextMessage("Product does not exist"));
  }

  next();
};

export default validatePurchase;
