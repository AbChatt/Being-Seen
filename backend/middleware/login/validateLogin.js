import { StatusCodes } from "http-status-codes";
import { createTextMessage } from "../../utils/defaultMessages.js";

const validateLogin = (req, res, next) => {
  // Validate username
  if (!req.body.username) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("Username field is empty"));
  }

  // Validate password
  if (!req.body.password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("Password field is empty"));
  }

  next();
};

export default validateLogin;
