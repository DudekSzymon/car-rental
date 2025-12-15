const express = require("express");
const {
  createRental,
  getMyRentals,
  getAllRentals,
  updateRentalStatus,
} = require("../controllers/rentalController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/", protect, createRental);
router.get("/my-rentals", protect, getMyRentals);
router.get("/all", protect, getAllRentals);
router.put("/:id/status", protect, updateRentalStatus);

module.exports = router;
