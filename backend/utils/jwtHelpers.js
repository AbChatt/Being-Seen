import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const UserRoles = {
  donor: "donor",
  merchant: "merchant",
  youth: "youth",
};

const stripAuthBearer = (authorizationHeader) =>
  authorizationHeader.replace(/^Bearer\s/, "");

const createUserToken = (username, role, remember) =>
  jwt.sign(
    {
      role: role,
      username: username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: remember ? "30d" : "7d",
    }
  );

const decodeUserToken = (token) => {
  token = stripAuthBearer(token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (
      decoded.role &&
      decoded.username &&
      Object.values(UserRoles).includes(decoded.role)
    ) {
      return decoded;
    }
    console.log("Decoded token is not valid: " + JSON.stringify(decoded));
  } catch (err) {
    console.log(err);
  }

  return null;
};

export { UserRoles, createUserToken, decodeUserToken };
