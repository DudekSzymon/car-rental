const Car = require("../models/Car");

const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: cars });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car)
      return res.status(404).json({ success: false, message: "Car not found" });
    res.status(200).json({ success: true, data: car });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car)
      return res
        .status(404)
        .json({ success: false, message: "Nie znaleziono pojazdu" });
    res.status(200).json({ success: true, message: "Pojazd usunięty" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ success: true, data: car });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCar = async (req, res) => {
  try {
    const car = await Car.create(req.body);
    res
      .status(201)
      .json({ success: true, data: car, message: "Pojazd dodany" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAllCars, getCarById, deleteCar, updateCar, createCar };
