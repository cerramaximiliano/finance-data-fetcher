const MarketData = require("../models/marketData");

const saveMarketData = async ({data, time}) => {
  try {
    const marketDataDocument = new MarketData({
      date: new Date(),
      time: time,
      symbols: data.map((item) => ({
        symbol: item.underlyingSymbol,
        description: item.description,
        regularMarketPrice: item.regularMarketPrice,
        regularMarketPreviousClose: item.regularMarketPreviousClose,
      })),
    });

    await marketDataDocument.save();
    console.log("Datos de mercado guardados en la base de datos");
  } catch (error) {
    console.error(
      "Error al guardar datos de mercado en la base de datos:",
      error
    );
  }
};

const getLastMarketData = async (time) => {
  try {
    const lastMarketData = await MarketData.findOne({ time: time }).sort({ date: -1 }).exec();
    return lastMarketData;
  } catch (error) {
    console.error(
      "Error al obtener el último documento de datos de mercado:",
      error
    );
    throw error;
  }
};

module.exports = { saveMarketData, getLastMarketData };
