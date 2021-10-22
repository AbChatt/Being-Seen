import express from "express";
import purchaseRoute from "./buyProduct.js";

const router = express.Router();

// api/v1/payment/purchase
router.use("/purchase", purchaseRoute);

export default router;
