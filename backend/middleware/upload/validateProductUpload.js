import { StatusCodes } from "http-status-codes";
import { createTextMessage } from "../../utils/defaultMessages.js";

// Middleware to validate required parameters for product upload
// endpoint (product name, description, picture, store owner username) are present and valid
const validateProductUpload = (req, res, next) => {
  // Validate store name
  if (!req.body.name) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("Name field is empty"));
  }

  // Validate product description
  if (!req.body.description) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("Description field is empty"));
  }

  // Validate store owner username
  if (!req.body.store_owner_username) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("Username field is empty"));
  } else if (/\s/.test(req.body.store_owner_username)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("Username cannot contain whitespace"));
  }

  // Validate product price
  if (!req.body.price) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("Price field is empty"));
  } else if (!/^[1-9]\d*$/.test(req.body.price)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("Price must be a positive integer"));
  }

  next();
};

export default validateProductUpload;
