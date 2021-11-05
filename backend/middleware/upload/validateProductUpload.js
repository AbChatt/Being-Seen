import { StatusCodes } from "http-status-codes";
import { createTextMessage } from "../../utils/defaultMessages.js";
import Product from "../../models/Product.js";

// Middleware to validate required parameters for product upload endpoint
// (product, description, price) are present and valid
const validateProductUpload = async (req, res, next) => {
  // Validate product name
  if (!req.body.name) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("Name field is empty"));
  } else if (await Product.exists({ name: req.body.name })) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("Another product with same name already exists"));
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

export default validateProductUpload;
