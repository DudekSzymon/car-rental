const express = require("express");
const authRoutes = require("./authRoutes");

const router = express.Router();

// Mount routes
router.use("/auth", authRoutes);

// Future routes will be added here:
// router.use('/cars', carRoutes);
// router.use('/rentals', rentalRoutes);
// router.use('/payments', paymentRoutes);

module.exports = router;
