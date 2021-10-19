import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import chalk from "chalk";

import mongoose from "mongoose";
import userRoute from "./routes/user.js";
import requestLogger from "./middleware/log/requestLogger.js";

import paypal from "@paypal/checkout-server-sdk";
import client from "./payPalClient.js";

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

app.set("view engine", "ejs");
app.get("/", (req, res) => res.render("index"));

let orderId = "";
app.post("/checkout", (req, res) => {
  // Construct a request object and set desired parameters
  // Here, OrdersCreateRequest() creates a POST request to /v2/checkout/orders
  let request = new paypal.orders.OrdersCreateRequest();
  request.requestBody({
    intent: "CAPTURE",
    application_context: {
      return_url: "http://localhost:3000/success",
    },
    purchase_units: [
      {
        amount: {
          currency_code: "CAD",
          value: "50.00",
        },
      },
    ],
  });

  // Call API with your client and get a response for your call
  let createOrder = async () => {
    let response = await client().execute(request);
    console.log(`Response: ${JSON.stringify(response)}`);
    orderId = response.result.id;

    for (let i = 0; i < response.result.links.length; i++) {
      if (response.result.links[i].rel === "approve") {
        res.redirect(response.result.links[i].href);
      }
    }
  };

  createOrder();
  console.log("Creating order now");
});

app.get("/success", async (req, res) => {
  let captureOrder = async (orderId) => {
    let request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});
    // Call API with your client and get a response for your call
    let response = await client().execute(request);
    // If call returns body in response, you can get the deserialized version from the result attribute of the response.
    console.log(`Response: ${JSON.stringify(response)}`);
  };

  let capture = await captureOrder(orderId); //'REPLACE-WITH-APPROVED-ORDER-ID'
  console.log("Captured order now");
  res.send("");
});

app.listen(3000, () => console.log("Server Started"));
