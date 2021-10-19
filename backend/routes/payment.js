import express from "express";
import donationsRoute from "./donation.js";

const router = express.Router();

router.use("/donation", donationsRoute);

export default router;
