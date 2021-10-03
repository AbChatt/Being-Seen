import dotenv from "dotenv";
import express from "express";
import chalk from "chalk";

import requestLogger from "./middleware/requestLogger.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const API_VERSION = process.env.API_VERSION;

app.get(`api/${API_VERSION}/`, (req, res) => {
  res.send("Hello, World!");
});
app.use("/", requestLogger);

app.listen(PORT, () => {
  console.log(chalk.whiteBright(`Listening at http://localhost:${PORT}`));
});
