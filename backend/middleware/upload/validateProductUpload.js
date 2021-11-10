import { StatusCodes } from "http-status-codes";
import { createTextMessage } from "../../utils/defaultMessages.js";
import Product from "../../models/Product.js";

// Middleware to validate required parameters for the product upload endpoint
// (product, description, price) are present and valid
const validateProductUpload = async (req, res, next) => {
  // Fields to validate
  const productName = req.body.name;
  const productDescription = req.body.description;
  const productPriceString = req.body.price;
  const productPrice = +productPriceString;

  // Validate product name
  if (!productName) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("Product name field is empty"));
  } else if (await Product.exists({ name: productName })) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("Another product with same name already exists"));
  }

  // Validate product description
  if (!productDescription) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("Description field is empty"));
  }

  // Validate product price
  if (!productPriceString) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("Price field is empty"));
  } else if (isNaN(productPrice)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("Price field must be a number"));
  } else if (productPrice < 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(createTextMessage("Price field cannot be negative"));
  }

  next();
};

export default validateProductUpload;
