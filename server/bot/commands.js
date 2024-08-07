const TelegramBot = require("node-telegram-bot-api");
const { telegramToken } = require("../config/configAPIs");

const bot = new TelegramBot(telegramToken, { polling: true });

bot.setMyCommands([
  { command: "/informes", description: "Mostrar informes" },
  { command: "/config_hours", description: "Configurar Open & Close Hours" },
  // { command: "/config_tz", description: "Configurar Zona Horaria" }
]);

module.exports = bot;
