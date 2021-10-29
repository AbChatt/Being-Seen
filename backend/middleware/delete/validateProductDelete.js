import { StatusCodes } from "http-status-codes";
import { createTextMessage } from "../../utils/defaultMessages.js";
import { decodeUserToken } from "../../utils/jwtHelpers.js";
import Product from "../../models/Product.js";

// Middleware to validate required parameters for product delete endpoint
// (product) are present (note: token should be validated before calling this)
const validateProductDelete = async (req, res, next) => {
  const decoded = decodeUserToken(req.headers.authorization);

  // Validate product name
  if (!req.body.product) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("Name field is empty"));
  } else if (
    !(await Product.exists({
      name: req.body.product,
      store_owner_username: decoded.username,
    }))
  ) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send(createTextMessage("Product does not exist"));
  }

  next();
};

export default validateProductDelete;
