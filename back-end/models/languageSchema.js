const mongoose = require("mongoose");

// Define the schema for Languages
const languageSchema = new mongoose.Schema({
  Name: String,
},{
    timestamps: true
});

const Language = mongoose.model("Language", languageSchema);

module.exports = Language;