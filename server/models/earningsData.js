const mongoose = require('mongoose');

const earningsDataSchema = new mongoose.Schema({
  symbol: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  earnings_release_next_date: {
    type: Number,
  },
  earnings_per_share_forecast_next_fq: {
    type: Number,
    required: true
  },
  earnings_release_date: {
    type: Number,
  },
  earnings_per_share_forecast_fq: {
    type: Number,
    required: true
  }
});

const EarningsData = mongoose.model('EarningsData', earningsDataSchema);

module.exports = EarningsData;