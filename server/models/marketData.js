const mongoose = require("mongoose");

const marketSymbolSchema = new mongoose.Schema(
  {
    symbol: String,
    description: String,
    regularMarketPrice: Number,
    regularMarketPreviousClose: Number,
  },
  { _id: false }
);

const marketDataSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  time: { type: String },
  symbols: [marketSymbolSchema],
});

const MarketData = mongoose.model("MarketData", marketDataSchema);

module.exports = MarketData;