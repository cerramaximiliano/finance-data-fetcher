const dotenv = require("dotenv");
  dotenv.config();

  const bot = require("./server/bot/handlers");

const fs = require("fs");
const path = require("path");

/*
(async () => {
  const openSymbols = [
    { description: "Futuros Bonos US 10 años", symbol: "ZN=F" },
    { description: "Futuros Soja", symbol: "ZS=F" },
    { description: "Futuros Oro", symbol: "GC=F" },
    { description: "Futuros Plata", symbol: "SI=F" },
    { description: "Futuros Petróleo", symbol: "CL=F" },
    { description: "Futuros S&P 500", symbol: "ES=F" },
    { description: "Futuros NASDAQ 100", symbol: "NQ=F" },
    { description: "Futuros Dow Jones", symbol: "YM=F" },
    { description: "Futuros Russell 2000", symbol: "RTY=F" },
    { description: "Futuros Dólar Îndex", symbol: "DX=F" },
    { description: "Bitcoin/USD", symbol: "BTC-USD" },
    { description: "Etherum/USD", symbol: "ETH-USD" },
  ];

  const closeSymbols = [
    { description: "S&P 500", symbol: "^SPX" },
    { description: "Nasdaq", symbol: "^IXIC" },
    { description: "Dow Jones", symbol: "^DJI" },
    { description: "Russell 2000", symbol: "^RUT" },
    { description: "Tasa Bonos US 10 años ", symbol: "^TNX" },
    { description: "DAX", symbol: "^GDAXI", country: "Germany" },
    { description: "SSE", symbol: "000001.SS", country: "China" },
    { description: "Nikkei", symbol: "^N225" },
    { description: "Bovespa", symbol: "^BVSP" },
    { description: "Merval", symbol: "^MERV" },
    { description: "US Dólar Index", symbol: "DX-Y.NYB" },
    { description: "Futuros Soja", symbol: "ZS=F" },
    { description: "Futuros Oro", symbol: "GC=F" },
    { description: "Futuros Plata", symbol: "SI=F" },
    { description: "Futuros Petróleo", symbol: "CL=F" },
    { description: "Bitcoin/USD", symbol: "BTC-USD" },
    { description: "Etherum/USD", symbol: "ETH-USD" },
  ];

  try {

    const economicCalendar = await fetchEconomicCalendar( ["Interest Rate","Inflation Rate"], 1);
    
    const marketCapData = await fetchMarketCap();
    const earningsCalendar = await fetchEarningCalendar();
    const filteredSymbols = earningsCalendar.filter(item => marketCapData.includes(item.symbol));
    
    const openMarketPromises = openSymbols.map((symbols) => {
      return fetchStockPrice(symbols.symbol);
    });
    const openMarketResults = await Promise.all(openMarketPromises);
    const openMarketData = openMarketResults.map((result) => result.data);

    const closeMarketPromises = closeSymbols.map((symbols) => {
      return fetchStockPrice(symbols.symbol);
    });
    const closeMarketResults = await Promise.all(closeMarketPromises);
    const closeMarketData = closeMarketResults.map((result) => result.data);

    /*     const filePath = path.join(
      __dirname,
      "server",
      "examples",
      "yahooFinance",
      "openMarketData.json"
    );
    fs.writeFileSync(filePath, JSON.stringify(openMarketData, null, 2)); */


/*     const filePathClose = path.join(
      __dirname,
      "server",
      "examples",
      "yahooFinance",
      "closeMarketData.json"
    );
    fs.writeFileSync(filePathClose, JSON.stringify(closeMarketData, null, 2)); */

    /*     const filePath = path.join(
      __dirname,
      "server",
      "examples",
      "investing",
      "earningsCalendar.json"
    );
    fs.writeFileSync(filePath, JSON.stringify(earningsCalendar, null, 2)); */
/*     const filePath = path.join(
      __dirname,
      "server",
      "examples",
      "investing",
      "economicCalendar.json"
    );
    fs.writeFileSync(filePath, JSON.stringify(economicCalendar, null, 2)); 

  } catch (error) {
    console.error(`error: ${error.message}`);
  }
  })(); 
  */