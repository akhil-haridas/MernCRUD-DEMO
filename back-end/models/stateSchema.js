const mongoose = require("mongoose");

// Define the schema for State
const stateSchema = new mongoose.Schema(
  {
    Name: String,
    Country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
    },
  },
  {
    timestamps: true,
  }
);

const State = mongoose.model("State", stateSchema);

module.exports = State;