import express from "express";
import { StatusCodes } from "http-status-codes";

import validateMerchantSignup from "../../middleware/signup/validateMerchantSignup.js";
import validateUserSignup from "../../middleware/signup/validateUserSignup.js";
import validateProductUpload from "../../middleware/upload/validateProductUpload.js";

import {
  createTextMessage,
  createJwtMessage,
} from "../../utils/defaultMessages.js";
import { createUserToken } from "../../utils/jwtHelpers.js";
import userRoles from "../../utils/userRoles.js";

import Merchant from "../../models/Merchant.js";
import User from "../../models/User.js";
import Product from "../../models/Product.js";

const router = express.Router();

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
    res.status(StatusCodes.CREATED).send(createJwtMessage(jwtToken));
  } catch (err) {
    console.log(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(createTextMessage("Error saving merchant to database"));
  }
});

router.use("/upload", validateProductUpload);
router.post("/upload", async (req, res) => {
  const retrieved = await Merchant.findOne({
    username: req.body.store_owner_username,
  });
  const reused_name = await Product.findOne({
    name: req.body.name,
  });
  if (!retrieved) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .send(createTextMessage("Username does not exist"));
  } else if (reused_name) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .send(createTextMessage("Name already exists"));
  } else {
    const newProduct = new Product({
      name: req.body.name,
      description: req.body.description,
      picture: req.body.picture || "#",
      store_owner_username: req.body.store_owner_username,
      price: Number(req.body.price),
    });

    try {
      await newProduct.save();
      res.send("");
    } catch (err) {
      console.log(err);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(createTextMessage("Error saving product to database"));
    }
  }
});

router.get("/products", async (req, res) => {
  const parseRetrievedProducts = async (product) => {
    return {
      name: product.name,
      description: product.description,
      picture: product.picture,
      store_owner_username: product.store_owner_username,
      price: product.price,
    };
  };

  // Request wants products from a specific merchant
  if (req.query.store_owner_username) {
    if (
      !(await Product.exists({
        store_owner_username: req.query.store_owner_username,
      }))
    ) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send(createTextMessage("Cannot find products for the given merchant"));
    }

    try {
      const retrievedProducts = await Product.find({
        store_owner_username: req.query.store_owner_username,
      });
      const parsedProducts = await Promise.all(
        retrievedProducts.map(async (product) => {
          return await parseRetrievedProducts(product);
        })
      );

      return res.send(parsedProducts);
    } catch (err) {
      console.log(err);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(createTextMessage("Error retrieving products from database"));
    }
  }

  // Request wants all youths
  try {
    const retrievedProducts = await Product.find({});
    const parsedProducts = await Promise.all(
      retrievedProducts.map(async (product) => {
        return await parseRetrievedProducts(product);
      })
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
