const express = require('express');
const router = express.Router();
const apiController = require('../controllers/controllersAPIs');
const { calendarHandler, stockRealTimeHandler, dayWatchHandler } = require('../handlers/apiHandlers');

// Define las rutas y asigna los controladores correspondientes
router.get('/economic-calendar', calendarHandler);
router.get('/day-watch', dayWatchHandler);
router.get('/realtime-stocks', stockRealTimeHandler);

module.exports = router;