import { StatusCodes } from "http-status-codes";
import { createTextMessage } from "../../utils/defaultMessages.js";
import userRoles from "../../utils/userRoles.js";
import User from "../../models/User.js";

// Middleware to validate whether parameters associated with the create donation
// endpoint (donation amount, youth, donor) are present and valid
const validateCreateDonation = async (req, res, next) => {
  console.log(req.body);

  // Validate donation amount
  const validAmounts = [5, 10, 25, 100];
  if (!req.body.amount) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("Donation amount is empty"));
  } else if (!validAmounts.includes(+req.body.amount)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("Donation amount is invalid"));
  }

  // Validate youth username
  if (!req.body.youth) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("Youth username is empty"));
  } else if (
    !(await User.exists({ username: req.body.youth, role: userRoles.youth }))
  ) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send(createTextMessage("Youth account does not exist"));
  }

  // Validate donor username
  if (!req.body.donor) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("Donor username is empty"));
  } else if (
    !(await User.exists({ username: req.body.donor, role: userRoles.donor }))
  ) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send(createTextMessage("Donor account does not exist"));
  }

  next();
};

export default validateCreateDonation;
