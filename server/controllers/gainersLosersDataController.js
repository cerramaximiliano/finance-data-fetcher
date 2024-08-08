const GainersLosersData = require("../models/gainersLosersData");

const saveGainersOrLosersData = async (type, data) => {
  if (!type || !data) {
    return res.status(400).json({ error: "Type and data are required" });
  }

  try {
    const newData = new GainersLosersData({ type, data });
    await newData.save();
    return newData;
  } catch (error) {
    throw new Error(error);
  }
};

const findLatestByType = async (type) => {
  if (!type) {
    return res.status(400).json({ error: "Type is required" });
  }

  try {
    const latestData = await DataModel.findOne({ type }).sort({ date: -1 });
    if (!latestData) {
      return res.status(404).json({ error: "No data found" });
    }
    return latestData;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { saveGainersOrLosersData, findLatestByType };
