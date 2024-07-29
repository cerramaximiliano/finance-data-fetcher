const moment = require('moment');

const getToday = () => moment().format("YYYY-MM-DD");
const getTomorrow = () => moment().add(1, 'days').format("YYYY-MM-DD");
const getUnixStartOfDay = (dateStr = null) => {
  const date = dateStr ? moment(dateStr, "DD-MM-YYYY") : moment();
  return date.startOf('day').unix();
};

const getUnixEndOfDay = (dateStr = null) => {
  const date = dateStr ? moment(dateStr, "DD-MM-YYYY") : moment();
  return date.endOf('day').unix();
};

const readableDate = (unixTimestamp) => moment.unix(unixTimestamp).format('YYYY-MM-DD HH:mm:ss');

module.exports = {
  getToday,
  getTomorrow,
  getUnixStartOfDay,
  getUnixEndOfDay,
  readableDate
};