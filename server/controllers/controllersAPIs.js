const axios = require("axios");
const fs = require("fs");
const path = require("path");
const {
  getToday,
  getTomorrow,
  getUnixStartOfDay,
  getUnixEndOfDay,
  readableDate,
} = require("../utils/dates");
const {
  rapidApiKey,
  rapidApiTradingViewHost,
  rapidApiSeekingAlphaHost,
  rapidApiYahooFinance,
  rapidApiFinvizHost,
} = require("../config/configAPIs");
// Tradign View
const fetchEconomicCalendar = async (
  indicatorFilter = [],
  minImportance = "1",
  from = getToday(),
  to = getTomorrow()
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

    if( result ) {
      const uniqueIndicators = [...new Set(result.map((item) => item.indicator))];
      let filterData = result;
      if (indicatorFilter.length > 0) {
        filterData = result.filter((item) =>
          indicatorFilter.includes(item.indicator)
        );
      }
      return { status: 200, data: filterData, uniqueIndicators: uniqueIndicators };
    }
      return {status: 204, data: []}
  } catch (error) {
    throw new Error(`Error fetching economic calendar data: ${error.message}`);
  }
};

const fetchEarningCalendar = async (
  from = getUnixStartOfDay(),
  to = getUnixEndOfDay()
) => {
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
    const { data } = await axios.request(options);
    const readable = data.data.map((element) => {
      return { symbol: element.d[0], name: element.d[1], date: readableDate(element.d[4]) };
    });
    const filePath = path.join(
      __dirname,
      "../",
      "examples",
      "tradingView",
      "earningsCalendar.json"
    );
    fs.writeFileSync(filePath, JSON.stringify(data.data, null, 2));
    return readable;
  } catch (error) {
    throw new Error(`Error fetching earning calendar data: ${error.message}`);
  }
};

// Finviz
const fetchMarketCapStocks = async (marketCap = "cap_mega") => {
  const options = {
    method: "GET",
    url: "https://finviz-screener.p.rapidapi.com/table",
    params: {
      order: "ticker",
      desc: "false",
      filters: marketCap,
    },
    headers: {
      "x-rapidapi-key": rapidApiKey,
      "x-rapidapi-host": rapidApiFinvizHost,
    },
  };
  try {
    const { data } = await axios.request(options);
    const transformData = (data) => {
      const { headers, rows } = data;
      return rows.map((row) => {
        let obj = {};
        headers.forEach((header, index) => {
          obj[header] = row[index];
        });
        return obj;
      });
    };
    const transformedData = transformData(data);

    return transformedData;
  } catch (error) {
    throw new Error(`Error fetching marketcap data: ${error.message}`);
  }
};

// Seeking Alpha
const fetchMarketCap = async (marketCap = 100000000000) => {
  const options = {
    method: "POST",
    url: "https://seeking-alpha.p.rapidapi.com/screeners/get-results",
    params: {
      page: "1",
      per_page: "100",
      sort: "-marketcap_display",
      type: "stock",
    },
    headers: {
      "x-rapidapi-key": "39e1a575femsh942d5e7c3d32c79p190977jsnc12056c7c582",
      "x-rapidapi-host": "seeking-alpha.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    data: {
      marketcap_display: { gte: marketCap },
      country_id: { in: [213] },
    },
  };
  try {
    const { data } = await axios.request(options);

    const getNames = (data) => {
      return data.data.map((item) => item.attributes.name);
    };
    const names = getNames(data);
    return names;
  } catch (error) {
    throw new Error(`Error fetching marketcap data: ${error.message}`);
  }
};

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
      "x-rapidapi-key": rapidApiKey,
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
  fetchMarketCapStocks,
  fetchMarketCap,
};
