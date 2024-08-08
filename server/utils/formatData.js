const formatData = (data) => {
  return data
    .slice(0, 4)
    .map((item) => {
      const date = new Date(item.date).toLocaleString("en-US", {
        timeZone: "UTC",
      });
      return `Date: ${date}\nTitle: ${item.title}\nIndicator: ${item.indicator}\nURL: ${item.source_url}\n`;
    })
    .join("\n");
};

const formatDataEarnings = (data) => {
  return data
    .map((item) => {
      return `Symbol: ${item.symbol}\nDate: ${item.date}\n`;
    })
    .join("\n");
};

const formatMarketData = (data, symbols, type) => {
  return data
    .map((item) => {
      const matchingSymbol = symbols.find(
        (sym) =>
          sym.symbol === item.underlyingSymbol || sym.symbol === item.symbol
      );
      const description = matchingSymbol ? matchingSymbol.description : "N/A";

      let price;
      if (type === "close") {
        if (item.close !== undefined && item.close !== null) {
          price = item.close.toFixed(2);
        } else if (
          item.currentPrice !== undefined &&
          item.currentPrice !== null
        ) {
          price = item.currentPrice.toFixed(2);
        } else {
          price = "N/A";
        }
      } else {
        price =
          item.open !== undefined && item.open !== null
            ? item.open.toFixed(2)
            : "N/A";
      }

      // Omitir si description o price es 'N/A', undefined o null
      if (
        description === "N/A" ||
        description === undefined ||
        description === null ||
        price === "N/A" ||
        price === undefined ||
        price === null
      ) {
        return null;
      }

      let percent_change;
      if (
        (item.close !== undefined &&
          item.close !== null &&
          item.previousClose !== undefined &&
          item.previousClose !== null) ||
        (item.currentPrice !== undefined &&
          item.currentPrice !== null &&
          item.previousClose !== undefined &&
          item.previousClose !== null)
      ) {
        if (item.close !== undefined && item.close !== null) {
          percent_change = (
            ((item.close - item.previousClose) / item.previousClose) *
            100
          ).toFixed(2);
        } else if (
          item.currentPrice !== undefined &&
          item.currentPrice !== null
        ) {
          percent_change = (
            ((item.currentPrice - item.previousClose) / item.previousClose) *
            100
          ).toFixed(2);
        }

        if (percent_change > 0) {
          percent_change = `+${percent_change}`;
        }
      } else {
        percent_change = null;
      }

      return `${description}\n${item.currency || ""} ${price} ${
        percent_change ? "(" + percent_change + "%)" : ""
      }\n`;
    })
    .filter((item) => item !== null)
    .join("\n");
};

function formatDayWatch(data, itemsPerLine) {
  let message = "";
  const limitedData = data.slice(0, 5); // Take only the first 5 elements

  for (let i = 0; i < limitedData.length; i++) {
    if (i > 0 && i % itemsPerLine === 0) {
      message += "\n"; // Add a newline after the specified number of elements
    }
    message += `${limitedData[i].name} (${limitedData[i].slug})\n`;
  }

  return message;
}

function getIdsString(dataArray) {
  return dataArray.map((item) => item.id).join(",");
}

function transformData(headers, rows) {
  return rows.map((row) => {
    let transformedObject = {};
    headers.forEach((header, index) => {
      let key = header.replace("No.", "position").toLowerCase();
      transformedObject[key] = row[index];
    });
    return transformedObject;
  });
}

function formatGainersLosersData(data, limit = 5) {
  return data.slice(0, limit).map(item => {
    const company = item.company;
    const ticker = item.ticker;
    const change = item.change.startsWith('-') ? item.change : `+${item.change}`;
    return `${company} (${ticker}) ${change}`;
  }).join('\n');
}

module.exports = {
  formatData,
  formatDataEarnings,
  formatMarketData,
  formatDayWatch,
  getIdsString,
  transformData,
  formatGainersLosersData,
};
