const express = require('express');
const router = express.Router();
const apiController = require('../controllers/controllersAPIs');

// Define las rutas y asigna los controladores correspondientes
router.get('/economic-calendar', apiController.fetchEconomicCalendar);
router.get('/earning-calendar', apiController.fetchEarningCalendar);
router.get('/day-watch', apiController.fetchDayWath);
router.post('/stock-price', apiController.fetchStockPrice);

module.exports = router;