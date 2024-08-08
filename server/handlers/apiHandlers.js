const {
  fetchEconomicCalendar,
  fetchStockPricesRealTimeData,
  fetchDayWath,
  marketOpen,
  fecthGainersOrLosers,
} = require("../controllers/controllersAPIs");
const { transformData } = require("../utils/formatData");

const calendarHandler = async (req, res) => {
  try {
    let result = await fetchEconomicCalendar();
    res.json(result);
  } catch (err) {
    throw new Error(err);
  }
};

const stockRealTimeHandler = async (req, res) => {
  try {
    let result = await fetchStockPricesRealTimeData();
    res.json(result.data);
  } catch (err) {
    throw new Error(err);
  }
};

const dayWatchHandler = async (req, res) => {
  try {
    let result = await fetchDayWath();
    res.json(result.data);
  } catch (err) {
    throw new Error(err);
  }
};

const marketOpenHandler = async (req, res) => {
  try {
    let result = await marketOpen();
    console.log(result);
    res.json(result.data);
  } catch (err) {
    throw new Error(err);
  }
};

const gainersLosersHandler = async (req, res) => {
  let { filter } = req.query;
  try {
    let result = await fecthGainersOrLosers(filter);

    if (result && result.data) {
      let transformedData = transformData(result.data.headers, result.data.rows);
      res.json(transformedData);
    } else {
      res.json({ ok: false, data: [] });
    }
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  calendarHandler,
  stockRealTimeHandler,
  dayWatchHandler,
  marketOpenHandler,
  gainersLosersHandler,
};
