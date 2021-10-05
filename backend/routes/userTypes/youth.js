import express from "express";

const router = express.Router();

router.get("/", () => {
  res.send("Youth endpoints here");
});

export default router;
