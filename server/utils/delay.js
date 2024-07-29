const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const fetchStockPriceWithDelay = async (fetchStockPrice, symbol, delayTime) => {
  await delay(delayTime);
  return fetchStockPrice(symbol);
};

const fetchAllStockPrices = async (fetchStockPrice, symbols, delayTime) => {
  const results = [];
  for (let i = 0; i < symbols.length; i++) {
    const result = await fetchStockPriceWithDelay(fetchStockPrice, symbols[i].symbol, delayTime);
    results.push(result.data);
  }
  return results;
};

module.exports = { delay, fetchStockPriceWithDelay, fetchAllStockPrices };