const TelegramBot = require("node-telegram-bot-api");
const { telegramToken } = require("../config/configAPIs");

const bot = new TelegramBot(telegramToken, { polling: true });

bot.setMyCommands([{ command: "/informes", description: "Mostrar informes" }]);

module.exports = bot;
