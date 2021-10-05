import express from "express";

const router = express.Router();

router.get("/", () => {
  res.send("Merchant endpoints here");
});

export default router;
