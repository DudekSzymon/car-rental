const Rental = require("../models/Rental");

const createRental = async (req, res) => {
  try {
    const { carId, startDate, endDate, totalPrice, driverDetails } = req.body;

    const overlappingRental = await Rental.findOne({
      car: carId,
      status: { $ne: "cancelled" },
      $or: [
        {
          startDate: { $lte: new Date(endDate) },
          endDate: { $gte: new Date(startDate) },
        },
      ],
    });

    if (overlappingRental) {
      return res.status(400).json({
        success: false,
        message: "Samochód jest już zarezerwowany w tym terminie.",
      });
    }

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

const getAllRentals = async (req, res) => {
  try {
    const rentals = await Rental.find()
      .populate("user", "firstName lastName email")
      .populate("car", "brand name image")
      .populate("lastModifiedBy", "firstName lastName")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: rentals });
  } catch (error) {
    console.error("Get all rentals error:", error);
    res
      .status(500)
      .json({ success: false, message: "Could not fetch rentals" });
  }
};

const getCarRentals = async (req, res) => {
  try {
    const rentals = await Rental.find({
      car: req.params.carId,
      status: { $ne: "cancelled" },
    }).select("startDate endDate");

    res.status(200).json({ success: true, data: rentals });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Błąd podczas sprawdzania dostępności",
    });
  }
};

const updateRentalStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const rental = await Rental.findByIdAndUpdate(
      req.params.id,
      {
        status,
        lastModifiedBy: req.user.id,
      },
      { new: true },
    ).populate("lastModifiedBy", "firstName lastName");

    if (!rental) {
      return res
        .status(404)
        .json({ success: false, message: "Rental not found" });
    }

    res.status(200).json({ success: true, data: rental });
  } catch (error) {
    console.error("Update status error:", error);
    res
      .status(500)
      .json({ success: false, message: "Could not update status" });
  }
};

module.exports = {
  createRental,
  getMyRentals,
  getAllRentals,
  getCarRentals,
  updateRentalStatus,
};
