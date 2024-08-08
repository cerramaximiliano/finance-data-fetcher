const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['gainers', 'losers'],
    required: true
  },
  data: {
    type: Array,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const GainersLosersData = mongoose.model('Data', DataSchema);

module.exports = GainersLosersData;
