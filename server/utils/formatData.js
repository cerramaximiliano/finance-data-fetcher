const formatData = (data) => {
  return data.slice(0, 4).map(item => {
    const date = new Date(item.date).toLocaleString('en-US', { timeZone: 'UTC' });
    return `Date: ${date}\nTitle: ${item.title}\nIndicator: ${item.indicator}\nURL: ${item.source_url}\n`;
  }).join('\n');
};

const formatDataEarnings = (data) => {
  return data.map(item => {
    return `Symbol: ${item.symbol}\nDate: ${item.date}\n`;
  }).join('\n');
};

const formatMarketData = (data, symbols) => {
  return data.map(item => {
    const matchingSymbol = symbols.find(sym => sym.symbol === item.underlyingSymbol || sym.symbol === item.symbol);
    const description = matchingSymbol ? matchingSymbol.description : 'N/A';
    const price = item.regularMarketPrice || item.regularMarketPreviousClose;
    return `${description}\nUSD ${price}\n`;
  }).join('\n');
};

module.exports = { formatData, formatDataEarnings, formatMarketData };
