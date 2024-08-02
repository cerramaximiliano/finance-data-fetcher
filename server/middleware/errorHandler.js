const TelegramBot = require('node-telegram-bot-api');

const telegramErrorHandler = (err, req, res, next) => {
  if (err instanceof TelegramBot.errors.ApiError) {
    // Manejo de errores específicos de Telegram
    if (err.response && err.response.statusCode === 400 && err.response.body.description.includes('message is not modified')) {
      console.warn('El mensaje no se ha modificado, error manejado.');
      return; // Ignorar el error ya que no requiere acción adicional
    }
  }
  
  // Pasar el error a los siguientes middlewares
  next(err);
};

module.exports = telegramErrorHandler;
