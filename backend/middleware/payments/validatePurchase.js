import { StatusCodes } from "http-status-codes";

import { createTextMessage } from "../../utils/defaultMessages.js";
import { decodeUserToken } from "../../utils/jwtHelpers.js";
import userRoles from "../../utils/userRoles.js";

import Product from "../../models/Product.js";
import User from "../../models/User.js";

// Middleware to validate whether parameters associated with the validate
// purchase endpoint (authorization, product name) are present and valid
const validatePurchase = async (req, res, next) => {
  console.log(req.body);

  // Validate JWT
  if (!req.headers.authorization) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(createTextMessage("No authorization header found"));
  }

  const decoded = decodeUserToken(req.headers.authorization);
  if (!decoded || decoded.role !== userRoles.youth) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(createTextMessage("JWT passed is not valid"));
  }

  // Validate youth username
  const youthName = decoded.username;
  if (!(await User.exists({ username: youthName, role: userRoles.youth }))) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send(createTextMessage("Youth account does not exist"));
  }

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
