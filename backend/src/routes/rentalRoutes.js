const express = require("express");
const {
  createRental,
  getMyRentals,
} = require("../controllers/rentalController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/", protect, createRental);
router.get("/my-rentals", protect, getMyRentals);

module.exports = router;
