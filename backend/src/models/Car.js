const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    year: { type: Number, required: true },
    pricePerDay: { type: Number, required: true },
    fuelType: { type: String, required: true },
    seats: { type: Number, required: true },
    transmission: { type: String, required: true },
    image: { type: String, required: true },
    available: { type: Boolean, default: true },
    description: { type: String },
    features: [{ type: String }],
    enginePower: { type: String },
    fuelConsumption: { type: String },

    deposit: { type: Number },
    dailyLimit: { type: Number },
    extraKmFee: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", carSchema);
