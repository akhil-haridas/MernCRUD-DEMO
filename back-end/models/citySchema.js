const mongoose = require("mongoose");

const citySchema = new mongoose.Schema(
  {
    Name: String,
    State: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
    },
  },
  {
    timestamps: true,
  }
);

const City = mongoose.model("City", citySchema);

module.exports = City;