import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import chalk from "chalk";

import mongoose from "mongoose";
import userRoute from "./routes/user.js";
import requestLogger from "./middleware/log/requestLogger.js";

//import paypal from 'paypal-rest-sdk'
import paypal from "@paypal/checkout-server-sdk";

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
/*
app.listen(PORT, () => {
  console.log(chalk.whiteBright(`Listening at http://localhost:${PORT}`));
});
*/

app.set("view engine", "ejs");
app.get("/", (req, res) => res.render("index"));

/*
//paypal V1
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AXidlZhw-HrSH88Cl7DZnDKHKXICHElpSTshdoog9mSJORngN52503ugVpsUQNrJUfUDSp2jgAHoav6K',
  'client_secret': 'EJ9y6s2j3fRWhtIKQjlF8PIFQ6F3g8umkkbwoqDK-LIMytgc5z7IbSUQrxOPsvIs2SF7Yx0iYCI0qNYe'
});


app.post('/pay', (req, res) => {
  const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:3000/success", //redirect after the payment success
        "cancel_url": "http://localhost:3000/cancel"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "Donate Homeless 50",
                "sku": "001",
                "price": "50.00",
                "currency": "CAD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "CAD",
            "total": "50.00"
        },
        "description": "Donation to Kevin Bacon"
    }]
};

paypal.payment.create(create_payment_json, function (error, payment) {
  if (error) {
      throw error;
  } else {
      for(let i = 0;i < payment.links.length;i++){
        console.log(payment);
        if(payment.links[i].rel === 'approval_url'){
          res.redirect(payment.links[i].href);
        }
      }
  }
});

});

app.get('/success', (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
        "amount": {
            "currency": "CAD",
            "total": "50.00"
        }
    }]
  };

  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
        console.log(error.response);
        throw error;
    } else {
        console.log(JSON.stringify(payment));
        res.send('Success');
    }
  });
});

app.get('/cancel', (req, res) => res.send('Cancelled'));
*/
app.listen(3000, () => console.log("Server Started"));

//paypal v2
app.post("/pay", (req, res) => {
  let clientId =
    "<<AXidlZhw-HrSH88Cl7DZnDKHKXICHElpSTshdoog9mSJORngN52503ugVpsUQNrJUfUDSp2jgAHoav6K>>";
  let clientSecret =
    "<<EJ9y6s2j3fRWhtIKQjlF8PIFQ6F3g8umkkbwoqDK-LIMytgc5z7IbSUQrxOPsvIs2SF7Yx0iYCI0qNYe>>";

  let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
  let client = new paypal.core.PayPalHttpClient(environment);

  // Construct a request object and set desired parameters
  // Here, OrdersCreateRequest() creates a POST request to /v2/checkout/orders
  let request = new paypal.orders.OrdersCreateRequest();
  request.requestBody({
    intent: "CAPTURE",
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
  let createOrder = async function () {
    let response = await client.execute(request);
    console.log(`Response: ${JSON.stringify(response)}`);

    // If call returns body in response, you can get the deserialized version from the result attribute of the response.
    console.log(`Order: ${JSON.stringify(response.result)}`);
  };

  createOrder();
});
