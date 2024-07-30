const dotenv = require("dotenv");
dotenv.config();
const bot = require("./server/bot/handlers");
const mongoose = require("mongoose");
const URL_DB = process.env.MONGO_URI;
const cron = require("node-cron");

mongoose
  .connect(URL_DB)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error al conectar a MongoDB", err));

const {
  openMarketCron,
  closeMarketCron,
  sendMessageToChatAndTopic
} = require("./server/schedule/cronJobs");


