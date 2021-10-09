import { StatusCodes } from "http-status-codes";
import { createTextMessage } from "../../utils/defaultMessages.js";

// Middleware to validate required parameters unique to merchant signup
// endpoint (store name, location, PayPal email) are present and valid
const validateMerchantSignup = (req, res, next) => {
  // Validate store name
  if (!req.body.store_name) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("Store name field is empty"));
  }

  // Validate store location
  if (!req.body.location) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("Store location field is empty"));
  }

  // Validate PayPal email
  if (!req.body.email) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("Email field is empty"));
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("Invalid email address provided"));
  }

  next();
};

export default validateMerchantSignup;
