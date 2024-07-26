const axios = require("axios");

const {
  getToday,
  getTomorrow,
  getUnixStartOfDay,
  getUnixEndOfDay,
} = require("../utils/dates");
const {
  rapidApiKey,
  rapidApiTradingViewHost,
  rapidApiSeekingAlphaHost,
  rapidApiYahooFinance,
} = require("../config/configAPIs");
// Tradign View
const fetchEconomicCalendar = async (
  from = getToday(),
  to = getTomorrow(),
  indicatorFilter = [],
  minImportance = "1"
) => {
  const options = {
    method: "GET",
    url: "https://trading-view.p.rapidapi.com/calendars/get-economic-calendar",
    params: {
      from: from,
      to: to,
      countries: "US",
      lang: "en",
      minImportance: minImportance,
    },
    headers: {
      "x-rapidapi-key": rapidApiKey,
      "x-rapidapi-host": rapidApiTradingViewHost,
    },
  };
  try {
    const response = await axios.request(options);
    const { result } = response.data;
    const uniqueIndicators = [...new Set(result.map(item => item.indicator))];
    let filterData = result
    if (indicatorFilter.length > 0){
      filterData = result.filter(item => indicatorFilter.includes(item.indicator));
    }
    return {data: filterData, uniqueIndicators: uniqueIndicators};
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
};

const fetchEarningCalendar = async (from = getUnixStartOfDay(), to = getUnixEndOfDay() ) => {
  console.log(from, to)
  const options = {
    method: "GET",
    url: "https://trading-view.p.rapidapi.com/calendars/get-earning-calendar",
    params: {
      from: from,
      to: to,
      screenerName: "america",
      lang: "en",
    },
    headers: {
      "x-rapidapi-key": rapidApiKey,
      "x-rapidapi-host": rapidApiTradingViewHost,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching earning calendar data: ${error.message}`);
  }
};

// Seek Alpha
const fetchDayWath = async () => {
  const options = {
    method: "GET",
    url: "https://seeking-alpha.p.rapidapi.com/market/get-day-watch",
    headers: {
      "x-rapidapi-key": rapidApiKey,
      "x-rapidapi-host": rapidApiSeekingAlphaHost,
    },
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching day watch data: ${error.message}`);
  }
};

const marketOpen = async () => {
  const options = {
    method: "GET",
    url: "https://seeking-alpha.p.rapidapi.com/market/get-market-open",
    headers: {
      "x-rapidapi-key": rapidApiKey,
      "x-rapidapi-host": rapidApiSeekingAlphaHost,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching market open data: ${error.message}`);
  }
};

/* Yahoo Finance */
const fetchStockPrice = async (symbol) => {
  const options = {
    method: "POST",
    url: "https://yahoo-finance160.p.rapidapi.com/info",
    headers: {
      "x-rapidapi-key": "621ed88709msh98d154a956d1ac8p1048b4jsn33f22e7820db",
      "x-rapidapi-host": rapidApiYahooFinance,
      "Content-Type": "application/json",
    },
    data: { stock: symbol },
  };
  return axios.request(options);
};

module.exports = {
  fetchEconomicCalendar,
  fetchEarningCalendar,
  fetchDayWath,
  marketOpen,
  fetchStockPrice,
};
