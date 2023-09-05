const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const userSchema = new mongoose.Schema(
  {
    FullName: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
    Country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    },
    State: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
      required: true,
    },
    City: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      required: true,
    },
    Languages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Language",
      },
    ],
    IsActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(mongoosePaginate);

const User = mongoose.model("User", userSchema);

module.exports = User;
