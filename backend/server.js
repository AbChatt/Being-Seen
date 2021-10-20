import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import chalk from "chalk";

import mongoose from "mongoose";
import userRoute from "./routes/user.js";
import requestLogger from "./middleware/log/requestLogger.js";

import paypal from "@paypal/payouts-sdk";
// import client from "./payOutClient.js";

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

let clientId = "AQQ7olvuWvgRMgrd2Sc-HAua9GA6clPRTdqAQveM2hG1cmroBXu9I0ERzRTT1L-zn9xAYDB0Fy-oHN_A";
console.log(process.env.CLIENT_ID);
console.log(process.env.CLIENT_SECRET);
let clientSecret = "EIfVuEFKOlgzyXgOTXcS1beiJXCOJGYryVqYNUgZjaCddxFDfZCbHlyM9lnV89OEIUOpSl-QB1xwW4zO";
let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);

app.post("/checkout", async (req, res) => {
  let requestBody = {
    sender_batch_header: {
      recipient_type: "EMAIL",
      email_message: "SDK payouts test txn",
      note: "Enjoy your Payout!!",
      sender_batch_id: "Test_sdk_5",
      email_subject: "This is a test transaction from SDK",
    },
    items: [
      {
        note: "Your 10$ Payout!",
        amount: {
          currency: "CAD",
          value: "10.00",
        },
        receiver: "merchantId@utsc.com",
        sender_item_id: "Test_txn_1",
      },
    ],
  };
  // let requestBody = createPayoutBody(productInfo);

  // Construct a request object and set desired parameters
  // Here, PayoutsPostRequest() creates a POST request to /v1/payments/payouts
  let request = new paypal.payouts.PayoutsPostRequest();
  request.requestBody(requestBody);

  // Call API with your client and get a response for your call
  let createPayouts = async function () {
    let response = await client.execute(request);
    console.log(`Response: ${JSON.stringify(response)}`);
  };

  await createPayouts();
  res.send("");
});

app.listen(3000, () => console.log("Server Started"));