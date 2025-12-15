const express = require("express");
const {
  getAllCars,
  getCarById,
  createCar,
  deleteCar,
} = require("../controllers/carController");
const { protect } = require("../middleware/auth");
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Wymagane uprawnienia administratora" });
  }
};
const router = express.Router();
router.get("/", getAllCars);
router.get("/:id", getCarById);
router.post("/", protect, adminOnly, createCar);
router.delete("/:id", protect, adminOnly, deleteCar);

module.exports = router;
