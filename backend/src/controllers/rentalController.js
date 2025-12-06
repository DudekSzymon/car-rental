const Rental = require("../models/Rental");

const createRental = async (req, res) => {
  try {
    const { carId, startDate, endDate, totalPrice, driverDetails } = req.body;

    const rental = await Rental.create({
      user: req.user.id,
      car: carId,
      startDate,
      endDate,
      totalPrice,
      driverDetails,
      status: "confirmed",
    });

    res.status(201).json({ success: true, data: rental });
  } catch (error) {
    console.error("Create rental error:", error);
    res
      .status(500)
      .json({ success: false, message: "Could not create rental" });
  }
};

const getMyRentals = async (req, res) => {
  try {
    const rentals = await Rental.find({ user: req.user.id })
      .populate("car")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: rentals });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Could not fetch rentals" });
  }
};

module.exports = { createRental, getMyRentals };
