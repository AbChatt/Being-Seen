import { StatusCodes } from "http-status-codes";
import { createTextMessage } from "../../utils/defaultMessages.js";
import userRoles from "../../utils/userRoles.js";
import Product from "../../models/Product.js";
import { decodeUserToken } from "../../utils/jwtHelpers.js";

// Middleware to validate whether parameters associated with the create donation
// endpoint (donation amount, youth, donor) are present and valid
const validatePurchase = async (req, res, next) => {
  console.log(req.body);

  // Validate JWT
  if (!req.headers.authorization) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(createTextMessage("JWT passed is not given"));
  }
  const decoded = decodeUserToken(req.headers.authorization);
  if (!decoded || decoded.role !== "youth") {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(createTextMessage("JWT passed is not valid"));
  }
  const youthName = decoded.username;

  // Validate youth username
  if (!(await User.exists({ username: youthName, role: userRoles.youth }))) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send(createTextMessage("Youth account does not exist"));
  }

  // Validate product name
  if (!req.body.product) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("product name is empty"));
  } else if (!(await Product.exists({ name: req.body.product }))) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send(createTextMessage("product does not exist"));
  }

  next();
};

export default validatePurchase;
