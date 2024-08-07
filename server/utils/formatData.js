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
const formatMarketData = (data, symbols, type) => {
  return data.map(item => {
    const matchingSymbol = symbols.find(sym => sym.symbol === item.underlyingSymbol || sym.symbol === item.symbol );
    const description = matchingSymbol ? matchingSymbol.description : 'N/A';

    let price;
    if (type === "close") {
      if ( item.close  ){
        price = item.close.toFixed(2);
      }else if ( item.currentPrice ){
        price = item.currentPrice.toFixed(2)
      }else{
        price = "N/A"
      }
    }else{
      price = item.open != null ? item.open.toFixed(2) : 'N/A';
    }

    let percent_change;
    if ((item.close != null && item.previousClose != null) || (item.currentPrice && item.previousClose)) {
      if (item.close) {
        percent_change = (((item.close - item.previousClose) / item.previousClose) * 100).toFixed(2);
      } else if (item.currentPrice) {
        percent_change = (((item.currentPrice - item.previousClose) / item.previousClose) * 100).toFixed(2);
      }

      if (percent_change > 0) {
        percent_change = `+${percent_change}`;
      }
    } else {
      percent_change = null;
    }

    return `${description}\n${item.currency || ""} ${price} ${percent_change ? "(" + percent_change + "%)" : ""}\n`;
  }).join('\n');
};

module.exports = { formatData, formatDataEarnings, formatMarketData };
