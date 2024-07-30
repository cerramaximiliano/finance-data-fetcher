const cron = require("node-cron");
const bot = require("../bot/commands");
const { fetchAllStockPrices,  } = require("../utils/delay");
const { formatMarketData } = require("../utils/formatData");
const { fetchStockPrice } = require("../controllers/controllersAPIs");

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

const sendMessageToChatAndTopic = async (chatId, topicId, message) => {
    try {
      await bot.sendMessage(chatId, message, { message_thread_id: topicId });
      console.log(`Mensaje enviado a chatId: ${chatId}, topicId: ${topicId}`);
    } catch (error) {
      console.error(`Error enviando mensaje a chatId: ${chatId}, topicId: ${topicId}`, error);
    }
  };

  
  

const openMarketCron = cron.schedule("*/1 * * * *", async () => {
  console.log("Tarea de envío de mensaje programado ejecutada.");
  const delayTime = 1000;
  const openMarketData = await fetchAllStockPrices(fetchStockPrice, openSymbols, delayTime);
  const formattedMarketData = formatMarketData(openMarketData, openSymbols);
  console.log(formattedMarketData);
  sendMessageToChatAndTopic(process.env.CHAT_ID, process.env.TOPIC_INFORMES, "Mensaje apertura mercado\n")
}, {
  timezone: "America/New_York"
});

const closeMarketCron = cron.schedule("30 16 * * 1-5", () => {
    console.log("Tarea de envío de mensaje programado ejecutada.");
    sendMessageToChatAndTopic(process.env.CHAT_ID, process.env.TOPIC_INFORMES, "Mensaje cierre mercado")
}, {
  timezone: "America/New_York"
});

module.exports = { openMarketCron, closeMarketCron, sendMessageToChatAndTopic };
