const EarningsData = require("../models/earningsData");
const { getUnixStartOfDay, getUnixEndOfDay } = require("../utils/dates");

const transformData = (element) => {
  if (!element.d[0]) {
    console.error('Símbolo nulo o indefinido encontrado:', element);
    return null; // Omitir este documento
  }
  return {
    updateOne: {
      filter: { symbol: element.d[0] },
      update: {
        symbol: element.d[0],
        name: element.d[1],
        earnings_release_next_date: element.d[2],
        earnings_per_share_forecast_next_fq: element.d[3],
        earnings_release_date: element.d[4],
        earnings_per_share_forecast_fq: element.d[5],
      },
      upsert: true,
    },
  };
};

const saveOrUpdateData = async (data) => {
  const operations = data.map(transformData);
  try {
    const result = await EarningsData.bulkWrite(operations);
    return result;
  } catch (error) {
    console.error(
      "Error al guardar o actualizar datos de mercado en la base de datos:",
      error
    );
    throw new Error(error);
  }
};

const findStockDataByDateRange = async (
  from = getUnixStartOfDay(),
  to = getUnixEndOfDay()
) => {
  try {
    const results = await EarningsData.find({
      $or: [
        {
          earnings_release_next_date: {
            $gte: from,
            $lte: to,
          },
        },
        {
          earnings_release_date: {
            $gte: from,
            $lte: to,
          },
        },
      ],
    });
    return results;
  } catch (error) {
    console.error(
      "Error al buscar datos de mercado por rango de fechas:",
      error
    );
    throw error;
  }
};

module.exports = { saveOrUpdateData, findStockDataByDateRange };
