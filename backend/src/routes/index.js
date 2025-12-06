const express = require("express");
const authRoutes = require("./authRoutes");
const carRoutes = require("./carRoutes");
const paymentRoutes = require("./paymentRoutes");
const rentalRoutes = require("./rentalRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/cars", carRoutes);
router.use("/payments", paymentRoutes);
router.use("/rentals", rentalRoutes);

module.exports = router;
