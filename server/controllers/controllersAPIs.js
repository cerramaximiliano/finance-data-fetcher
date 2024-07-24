const axios = require("axios");

const {
  getToday,
  getTomorrow,
  getUnixStartOfDay,
  getUnixEndOfDay,
} = require("../utils/dates");
const { rapidApiKey, rapidApiTradingViewHost, rapidApiSeekingAlphaHost } = require("../config/configAPIs");
console.log(rapidApiKey)
// Tradign View
const fetchEconomicCalendar = async () => {
  const today = getToday();
  const tomorrow = getTomorrow();

  const options = {
    method: "GET",
    url: "https://trading-view.p.rapidapi.com/calendars/get-economic-calendar",
    params: {
      from: today,
      to: tomorrow,
      countries: "US",
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
    throw new Error(`Error fetching data: ${error.message}`);
  }
};

const fetchEarningCalendar = async () => {
  const startOfDay = getUnixStartOfDay();
  const endOfDay = getUnixEndOfDay();
  console.log(startOfDay, endOfDay)
  const options = {
    method: "GET",
    url: "https://trading-view.p.rapidapi.com/calendars/get-earning-calendar",
    params: {
      from: startOfDay,
      to: endOfDay,
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
        method: 'GET',
        url: 'https://seeking-alpha.p.rapidapi.com/market/get-day-watch',
        headers: {
          'x-rapidapi-key': rapidApiKey,
          'x-rapidapi-host': rapidApiSeekingAlphaHost
        }
      };
      try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching day watch data: ${error.message}`);;
    }
}

const marketOpen = async () => {
    const options = {
        method: 'GET',
        url: 'https://seeking-alpha.p.rapidapi.com/market/get-market-open',
        headers: {
          'x-rapidapi-key': rapidApiKey,
          'x-rapidapi-host': rapidApiSeekingAlphaHost
        }
      };
      
      try {
          const response = await axios.request(options);
          return response.data
      } catch (error) {
        throw new Error(`Error fetching market open data: ${error.message}`);;
      }
}

module.exports = {
  fetchEconomicCalendar,
  fetchEarningCalendar,
  fetchDayWath,
  marketOpen
};
