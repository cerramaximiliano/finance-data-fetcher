const mongoose = require('mongoose');

const EconomicEventSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  country: { type: String, required: true },
  indicator: { type: String, required: true },
  ticker: { type: String, required: true },
  comment: { type: String },
  category: { type: String },
  period: { type: String },
  source: { type: String },
  source_url: { type: String },
  actual: { type: Number },
  previous: { type: Number },
  forecast: { type: Number },
  actualRaw: { type: Number },
  previousRaw: { type: Number },
  forecastRaw: { type: Number },
  currency: { type: String },
  unit: { type: String },
  importance: { type: Number },
  date: { type: Date, required: true }
});

const EconomicEvent = mongoose.model('EconomicEvent', EconomicEventSchema);

module.exports = EconomicEvent;
