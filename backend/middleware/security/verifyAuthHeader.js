import { StatusCodes } from "http-status-codes";
import { createTextMessage } from "../../utils/defaultMessages.js";
import { decodeUserToken } from "../../utils/jwtHelpers.js";
import User from "../../models/User.js";

// RETURNS middleware to validate whether an authorization header was passed and
// matches the role passed (or any role if none is passed)
const verifyAuthHeader = (role) => async (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(createTextMessage("No authorization header found"));
  }

  const decoded = decodeUserToken(req.headers.authorization);
  if (!decoded || (role && decoded.role !== role)) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send(createTextMessage("JWT passed is not valid"));
  }

  if (role) {
    if (!(await User.exists({ username: decoded.username, role: role }))) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send(createTextMessage("User does not exist with that role"));
    }
  } else {
    if (!(await User.exists({ username: decoded.username }))) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .send(createTextMessage("User does not exist"));
    }
  }

  next();
};

export default verifyAuthHeader;
