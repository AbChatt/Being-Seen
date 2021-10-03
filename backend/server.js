import dotenv from "dotenv";
import express from "express";
import chalk from "chalk";

import userRoute from "./routes/user.js";
import requestLogger from "./middleware/requestLogger.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const API_VERSION = process.env.API_VERSION;

app.use("/", requestLogger);
app.use(`/api/${API_VERSION}/user`, userRoute);

app.listen(PORT, () => {
  console.log(chalk.whiteBright(`Listening at http://localhost:${PORT}`));
});
