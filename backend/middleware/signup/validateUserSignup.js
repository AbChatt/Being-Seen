import moment from "moment";
import { StatusCodes } from "http-status-codes";
import { createTextMessage } from "../../utils/defaultMessages.js";
import User from "../../models/User.js";

const validateUser = async (req, res, next) => {
  console.log(req.body);

  // Validate name
  if (!req.body.name) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("Name field is empty"));
  }

  // Validate username
  if (!req.body.username) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("Username field is empty"));
  } else if (/\s/.test(req.body.username)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("Username cannot contain whitespace"));
  } else if (await User.exists({ username: req.body.username })) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("Username is already taken"));
  }

  // Validate password
  if (!req.body.password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("Password field is empty"));
  }

  // Validate date of birth
  if (!req.body.date_of_birth) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("Date of birth field is empty"));
  } else if (!moment(req.body.date_of_birth, moment.ISO_8601, true).isValid()) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("Date of birth is invalid"));
  } else if (moment(req.body.date_of_birth).isAfter(moment())) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("Date of birth cannot be in the future"));
  }

  next();
};

export default validateUser;
