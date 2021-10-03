import dotenv from "dotenv";
import express from "express";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const API_VERSION = process.env.API_VERSION;

app.get(`api/${API_VERSION}/`, (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
