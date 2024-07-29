const moment = require("moment");
const fs = require("fs");
const path = require("path");

const {
  fetchEconomicCalendar,
  fetchEarningCalendar,
  fetchDayWath,
  fetchStockPrice,
  fetchMarketCapStocks,
  fetchMarketCap,
} = require("../controllers/controllersAPIs");
const bot = require("./commands");
const {
  formatData,
  formatDataEarnings,
  formatMarketData,
} = require("../utils/formatData");
const {
  delay,
  fetchStockPriceWithDelay,
  fetchAllStockPrices,
} = require("../utils/delay");


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

function sendMainMenu(chatId, messageId, topicId) {
  const options = {
    chat_id: chatId,
    message_id: messageId,
    text: "Menú Principal:",
    reply_markup: {
      inline_keyboard: [
        [{ text: "Informe Apertura", callback_data: "option1" }],
        [{ text: "Informe Cierre", callback_data: "option2" }],
        [{ text: "Earnings Calendar", callback_data: "option3" }],
        [{ text: "Economic Calendar", callback_data: "option4" }],
      ],
    },
    message_thread_id: topicId,
  };

  bot.editMessageText(options.text, options);
}

function sendSubMenu(chatId, messageId, menuTitle, options, topicId) {
  const keyboard = options.map((option) => [
    { text: option.text, callback_data: option.callback_data },
  ]);
  keyboard.push([{ text: "<< Volver Atrás", callback_data: "back" }]);

  const sendOptions = {
    chat_id: chatId,
    message_id: messageId,
    text: menuTitle,
    reply_markup: {
      inline_keyboard: keyboard,
    },
    message_thread_id: topicId,
  };

  bot.editMessageText(menuTitle, sendOptions);
}

async function sendTemporaryMessage(chatId, text, options, delay = 5000) {
  const message = await bot.sendMessage(chatId, text, options);
  setTimeout(() => {
    bot.deleteMessage(chatId, message.message_id);
  }, delay);
}

bot.onText(/\/informes/, (msg) => {
  const chatId = msg.chat.id;
  const topicId = msg.is_topic_message ? msg.message_thread_id : undefined;

  if (topicId) {
    const topicName = msg.reply_to_message.forum_topic_created.name;
    console.log(topicName);
    if (topicName === "Informes") {
      bot.sendMessage(chatId, "Menú Principal:", {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Informe Apertura", callback_data: "option1" }],
            [{ text: "Informe Cierre", callback_data: "option2" }],
            [{ text: "Earnings Calendar", callback_data: "option3" }],
            [{ text: "Economic Calendar", callback_data: "option4" }],
            [{ text: "Opción con errores", callback_data: "option5" }],
          ],
        },
        message_thread_id: topicId,
      });
    }
  }
});

bot.on("callback_query", async (callbackQuery) => {
  const message = callbackQuery.message;
  const data = callbackQuery.data;
  const topicId = message.is_topic_message
    ? message.message_thread_id
    : undefined;

  if (topicId) {
    const topicName = message.reply_to_message.forum_topic_created.name;
    if (topicName !== "Informes") {
      bot.answerCallbackQuery(callbackQuery.id, {
        text: "Este comando solo está disponible en el topic 'Menú test'.",
      });
      return;
    }
  } else {
    bot.answerCallbackQuery(callbackQuery.id, {
      text: "Este comando solo está disponible en el topic 'Menú test'.",
    });
    return;
  }

  try {
    switch (data) {
      case "option1":
        console.log("apertura");
        const delayTime = 1000; // 1 segundo de retraso entre las solicitudes
        const openMarketData = await fetchAllStockPrices(fetchStockPrice, openSymbols, delayTime);
        const formattedMarketData = formatMarketData(openMarketData, openSymbols);
        console.log(formattedMarketData);
        sendSubMenu(
          message.chat.id,
          message.message_id,
          `Informe Apertura ${moment().format(
            "DD-MM-YYYY"
          )}\nEste es el informe de apertura`,
          [],
          topicId
        );
        break;
      case "option2":
        sendSubMenu(
          message.chat.id,
          message.message_id,
          `Informe Cierre ${moment().format("DD-MM-YYYY")}\n`,
          [],
          topicId
        );
        break;
      case "option3":
        const marketCapData = await fetchMarketCap();
        const earningsCalendar = await fetchEarningCalendar();
        const filteredSymbols = earningsCalendar.filter((item) =>
          marketCapData.includes(item.symbol)
        );
        console.log(filteredSymbols);
        let earningsCalendarText = `Earnings Calendar ${moment().format(
          "DD-MM-YYYY"
        )}\n`;
        if (filteredSymbols && filteredSymbols.length > 0) {
          earningsCalendarText += formatDataEarnings(filteredSymbols);
        }
        sendSubMenu(
          message.chat.id,
          message.message_id,
          earningsCalendarText,
          [],
          topicId
        );
        break;
      case "option5":
        await sendTemporaryMessage(
          message.chat.id,
          "Opción no reconocida. Vuelve a intentarlo más tarde.",
          {
            ...(topicId && { message_thread_id: topicId }),
          },
          5000
        );
        break;
      case "option4":
        const economicCalendar = await fetchEconomicCalendar(
          ["Interest Rate", "Inflation Rate"],
          1
        );
        let economicCalendarText = `Economic Calendar ${moment().format(
          "DD-MM-YYYY"
        )}\n`;
        if (economicCalendar && economicCalendar.status === 200) {
          let formattedData = formatData(economicCalendar.data);
          economicCalendarText = economicCalendarText + formattedData;
        } else {
          economicCalendarText =
            economicCalendarText + "No hay eventos para la fecha";
        }
        sendSubMenu(
          message.chat.id,
          message.message_id,
          economicCalendarText,
          [],
          topicId
        );
        break;
      case "back":
        sendMainMenu(message.chat.id, message.message_id, topicId);
        break;
      default:
        await sendTemporaryMessage(
          message.chat.id,
          "Opción no reconocida. Vuelve a intentarlo más tarde.",
          {
            ...(topicId && { message_thread_id: topicId }),
          },
          5000
        );
    }
  } catch (err) {
    console.log(err);
    await sendTemporaryMessage(
      message.chat.id,
      "Opción no reconocida. Vuelve a intentarlo más tarde.",
      {
        ...(topicId && { message_thread_id: topicId }),
      },
      5000
    );
  }
  bot.answerCallbackQuery(callbackQuery.id); // Finaliza el callback query
});

module.exports = bot;
