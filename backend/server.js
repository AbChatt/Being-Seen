import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import chalk from "chalk";

import mongoose from "mongoose";
import userRoute from "./routes/user.js";
import requestLogger from "./middleware/log/requestLogger.js";

const paypal = require('@paypal/checkout-server-sdk');

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const API_VERSION = process.env.API_VERSION;

// Body parser and CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// App routes
app.use("/", requestLogger);
app.use(`/api/${API_VERSION}/user`, userRoute);

// Mongo database connection
mongoose.connect(process.env.MONGO_CONN_STR, { useNewUrlParser: true }, () =>
  console.log(chalk.white("Connected successfully to DB"))
);

app.listen(PORT, () => {
  console.log(chalk.whiteBright(`Listening at http://localhost:${PORT}`));
});

app.set("view engine", "ejs");
app.get("/", (req, res) => res.render("index"));

// 1. Set up your server to make calls to PayPal

// 1b. Add your client ID and secret
const PAYPAL_CLIENT = 'AWicEzH0zpWmLIeGBODTWvSLhVfYDlBq8f2-O_VZX2AhPQb9VAbLMja1VAKyf9XeOztSlSJd88zQ06Nd';
const PAYPAL_SECRET = 'EB43JmHCCF9vkr52JicXy4RKbtvb69xYAzCOzb_bTFcx4tGFXCoDLTKdbuhdqYS9PdpPAX29nBzK7hgx';

// 1c. Set up the SDK client
const env = new paypal.core.SandboxEnvironment(PAYPAL_CLIENT, PAYPAL_SECRET);
const client = new paypal.core.PayPalHttpClient(env);

// 2. Set up your server to receive a call from the client
module.exports = async function handleRequest(req, res) {

  // 3. Call PayPal to set up a transaction with payee
  const request = new sdk.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'CAN',
        value: '50.00'
      },
      payee: {
        email_address: 'beenSeen@business.example.com'
      }
    }]
  });

  let order;
  try {
    order = await payPalClient.client().execute(request);
  } catch (err) {

    // 4. Handle any errors from the call
    console.error(err);
    return res.send(500);
  }

  // 5. Return a successful response to the client with the order ID
  res.status(200).json({
    orderID: order.result.id
  });

}