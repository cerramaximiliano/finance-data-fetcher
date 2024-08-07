const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const marketOpenSchema = new Schema({
  marketOpen: {
    type: Boolean,
    required: true
  },
  nextMarketOpen: {
    type: Number,
    required: true
  },
  nextMarketClose: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  }
});

const MarketOpen = mongoose.model('MarketOpen', marketOpenSchema);

module.exports = MarketOpen;
