import { StatusCodes } from "http-status-codes";
import { createTextMessage } from "../../utils/defaultMessages.js";

const hasAuthHeader = (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(createTextMessage("No authorization header found"));
  }
  next();
};

export default hasAuthHeader;
