const {
  fetchEconomicCalendar,
  fetchStockPricesRealTimeData,
  fetchDayWath
} = require("../controllers/controllersAPIs");

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
  try{
    let result = await fetchDayWath();
    res.json(result.data)
  }catch(err){
    throw new Error(err);
  }
}

module.exports = { calendarHandler, stockRealTimeHandler,dayWatchHandler };
