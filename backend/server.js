import dotenv from "dotenv";
import express from "express";
import chalk from "chalk";

import mongoose from "mongoose";
import userRoute from "./routes/user.js";
import requestLogger from "./middleware/requestLogger.js";

dotenv.config();
const app = express();

//body-parser from express
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const PORT = process.env.PORT;
const API_VERSION = process.env.API_VERSION;

app.use("/", requestLogger);
app.use(`/api/${API_VERSION}/user`, userRoute);


//Connected To DB
mongoose.connect(process.env.MONGO_CONN_STR, { useNewUrlParser: true }, () =>
  console.log("connected to DB!")
);


app.listen(PORT, () => {
  console.log(chalk.whiteBright(`Listening at http://localhost:${PORT}`));
});
