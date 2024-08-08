const express = require('express');
const router = express.Router();
const apiController = require('../controllers/controllersAPIs');
const { calendarHandler, stockRealTimeHandler, dayWatchHandler, marketOpenHandler, gainersLosersHandler } = require('../handlers/apiHandlers');

// Define las rutas y asigna los controladores correspondientes
router.get('/economic-calendar', calendarHandler);
router.get('/day-watch', dayWatchHandler);
router.get('/realtime-stocks', stockRealTimeHandler);
router.get('/market', marketOpenHandler);
router.get('/gainersorloser', gainersLosersHandler)

module.exports = router;