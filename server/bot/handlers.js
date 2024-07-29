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
const { formatData, formatDataEarnings } = require("../utils/formatData");

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
        console.log(earningsCalendar)

        const filePath = path.join(
            __dirname,
            "server",
            "examples",
            "tradingView",
            "earningsCalendar.json"
          );
          fs.writeFileSync(filePath, JSON.stringify(earningsCalendar, null, 2));

        const filteredSymbols = earningsCalendar.filter((item) =>
          marketCapData.includes(item.symbol)
        );
        console.log(filteredSymbols)
        let earningsCalendarText = `Earnings Calendar ${moment().format(
          "DD-MM-YYYY"
        )}\n`;
        if ( filteredSymbols && filteredSymbols.length > 0){
            earningsCalendarText += formatDataEarnings(filteredSymbols)
        }
        sendSubMenu(
          message.chat.id,
          message.message_id,
          earningsCalendarText,
          [],
          topicId
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
        bot.sendMessage(
          message.chat.id,
          "Opción no reconocida. Vuelve a intentar.",
          {
            ...(topicId && { message_thread_id: topicId }),
          }
        );
    }
  } catch (err) {
    console.log(err);
    bot.sendMessage(
      message.chat.id,
      "Opción no reconocida. Vuelve a intentar.",
      {
        ...(topicId && { message_thread_id: topicId }),
      }
    );
  }
  bot.answerCallbackQuery(callbackQuery.id); // Finaliza el callback query
});

module.exports = bot;
