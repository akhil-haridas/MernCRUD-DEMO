const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema(
  {
    Name: String,
  },
  {
    timestamps: true,
  }
);

const Country = mongoose.model("Country", countrySchema);

module.exports = Country;