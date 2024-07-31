const logger = require("../utils/logger");
const MarketData = require("../models/marketData");

const saveMarketData = async ({ data, time }) => {
  try {
    const marketDataDocument = new MarketData({
      date: new Date(),
      time: time,
      symbols: data.map((item) => ({
        symbol: item.symbol,
        underlyingSymbol: item.symbol,
        currency: item.currency,
        description: item.description,
        regularMarketPrice: item.regularMarketPrice,
        regularMarketPreviousClose: item.regularMarketPreviousClose,
        open: item.open,
        close: item.close,
        bid: item.bid,
        ask: item.ask,
      })),
    });

    await marketDataDocument.save();
    logger.info("Market data saved successfully.");
  } catch (error) {
    logger.error(`Error saving market data: ${error.message}`);
    throw error;
  }
};

const getLastMarketData = async (time) => {
  try {
    return await MarketData.findOne({ time }).sort({ date: -1 }).exec();
  } catch (error) {
    logger.error(`Error fetching last market data: ${error.message}`);
    throw error;
  }
};

module.exports = { saveMarketData, getLastMarketData };
