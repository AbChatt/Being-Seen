import { StatusCodes } from "http-status-codes";
import { createTextMessage } from "../../utils/defaultMessages.js";
import Product from "../../models/Product.js";

// Middleware to validate required parameters for product delete endpoint
// (product name) are present
const validateProductDelete = async (req, res, next) => {
  // Validate product name
  if (!req.body.product) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("Name field is empty"));
  }

  next();
};

export default validateProductDelete;
