import express from "express";
import { StatusCodes } from "http-status-codes";

import verifyAuthHeader from "../middleware/security/verifyAuthHeader.js";
import validateUserSignup from "../middleware/signup/validateUserSignup.js";
import validateMerchantSignup from "../middleware/signup/validateMerchantSignup.js";
import validateProductUpload from "../middleware/upload/validateProductUpload.js";

import { createUserToken, decodeUserToken } from "../utils/jwtHelpers.js";
import { createTextMessage } from "../utils/defaultMessages.js";
import { createJwtMessage } from "../utils/defaultMessages.js";
import userRoles from "../utils/userRoles.js";

import Merchant from "../models/Merchant.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

const router = express.Router();

// api/v1/user/merchant/signup
router.use("/signup", [validateUserSignup, validateMerchantSignup]);
router.post("/signup", async (req, res) => {
  const newUser = new User({
    role: userRoles.merchant,
    username: req.body.username,
    password: req.body.password,
  });

  const newMerchant = new Merchant({
    name: req.body.name,
    username: req.body.username,
    date_of_birth: req.body.date_of_birth,
    profile_picture: req.body.profile_picture || "#",
    store_name: req.body.store_name,
    location: req.body.location,
    email: req.body.email,
  });

  try {
    await newUser.save();
    await newMerchant.save();
    const jwtToken = createUserToken(req.body.username, userRoles.merchant);
    return res.status(StatusCodes.CREATED).send(createJwtMessage(jwtToken));
  } catch (err) {
    console.log(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(createTextMessage("Error saving merchant to database"));
  }
});

router.use("/upload", [
  verifyAuthHeader(userRoles.merchant),
  validateProductUpload,
]);
router.post("/upload", async (req, res) => {
  const decoded = decodeUserToken(req.headers.authorization);

  const newProduct = new Product({
    name: req.body.name,
    description: req.body.description,
    picture: req.body.picture || "#",
    store_owner_username: decoded.username,
    price: (+req.body.price).toFixed(2),
  });

  try {
    await newProduct.save();
    return res
      .status(StatusCodes.CREATED)
      .send(createTextMessage("Product successfully uploaded"));
  } catch (err) {
    console.log(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(createTextMessage("Error saving product to database"));
  }
});

router.get("/products", async (req, res) => {
  const parseRetrievedProducts = (product) => ({
    name: product.name,
    description: product.description,
    picture: product.picture,
    owner: product.store_owner_username,
    price: product.price,
  });

  // Request wants products from a specific merchant
  if (req.query.owner) {
    try {
      const retrievedProducts = await Product.find({
        store_owner_username: req.query.owner,
      });
      const parsedProducts = retrievedProducts.map((product) =>
        parseRetrievedProducts(product)
      );

      return res.send(parsedProducts);
    } catch (err) {
      console.log(err);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(createTextMessage("Error retrieving products from database"));
    }
  }

  // Request wants all products
  try {
    const retrievedProducts = await Product.find({});
    const parsedProducts = retrievedProducts.map((product) =>
      parseRetrievedProducts(product)
    );
    return res.send(parsedProducts);
  } catch (err) {
    console.log(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(createTextMessage("Error retrieving products from database"));
  }
});

export default router;