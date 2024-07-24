const moment = require('moment');

const getToday = () => moment().format("YYYY-MM-DD");
const getTomorrow = () => moment().add(1, 'days').format("YYYY-MM-DD");
const getUnixStartOfDay = () => moment().startOf('day').unix();
const getUnixEndOfDay = () => moment().endOf('day').unix();

module.exports = {
  getToday,
  getTomorrow,
  getUnixStartOfDay,
  getUnixEndOfDay
};