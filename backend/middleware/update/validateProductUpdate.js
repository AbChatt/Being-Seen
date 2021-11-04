import { StatusCodes } from "http-status-codes";
import { createTextMessage } from "../../utils/defaultMessages.js";
import { decodeUserToken } from "../../utils/jwtHelpers.js";
import Product from "../../models/Product.js";

// Middleware to validate required parameters for product update endpoint
// (product, description, price) are present and valid
const validateProductUpdate = async (req, res, next) => {
  const decoded = decodeUserToken(req.headers.authorization);

  // Validate product name
  if (!req.body.name) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("Name field is empty"));
  } else if (
    !(await Product.exists({
      name: req.body.old_name,
      store_owner_username: decoded.username,
    }))
  ) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send(createTextMessage("Product does not exist"));
  }

  // Validate product description
  if (!req.body.description) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("Description field is empty"));
  }

  // Validate product price
  if (!req.body.price) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("Price field is empty"));
  } else if (isNaN(+req.body.price)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("Price field must be a number"));
  } else if (+req.body.price < 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("Price field cannot be negative"));
  }

  next();
};

export default validateProductUpdate;
