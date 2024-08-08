const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hoursSchema = new Schema({
  hour: {
    type: String,
    required: true,
  },
  dates: {
    type: [String],
    required: true,
  },
  timezone: {
    type: String,
    required: true,
  },
});

const configSchema = new Schema({
  date: { type: Date, default: Date.now },
  closeHours: {
    type: hoursSchema,
    required: true,
  },
  openHours: {
    type: hoursSchema,
    required: true,
  },
  openSymbols: {
    type: [String],
    required: true,
  },
  closeSymbols: {
    type: [String],
    required: true,
  },
});

const Config = mongoose.model("Config", configSchema);

module.exports = Config;
