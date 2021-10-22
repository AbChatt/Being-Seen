import { StatusCodes } from "http-status-codes";
import { createTextMessage } from "../../utils/defaultMessages.js";
import PendingDonation from "../../models/PendingDonation.js";
import Donation from "../../models/Donation.js";

// Middleware to validate whether parameters associated with the save donation
// endpoint (order ID) are present and valid
const validateSaveDonation = async (req, res, next) => {
  console.log(req.body);

  // Validate order ID
  if (!req.body.orderId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("Order ID is empty"));
  } else if (!(await PendingDonation.exists({ order_id: req.body.orderId }))) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send(createTextMessage("Order ID cannot be found"));
  } else if (await Donation.exists({ order_id: req.body.orderId })) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("Donation has been processed already"));
  }

  next();
};

export default validateSaveDonation;
