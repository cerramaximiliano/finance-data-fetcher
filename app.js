const { fetchEconomicCalendar, fetchEarningCalendar, fetchDayWath } = require("./server/controllers/controllersAPIs");


(async () => {
  try {
    //const economicCalendar = await fetchEconomicCalendar();
    //console.log(economicCalendar);
    //const earningCalendar = await fetchEarningCalendar();
    //console.log(earningCalendar.data)
    const dayWatch = await fetchDayWath();
    console.log(dayWatch)
  } catch (error) {
    console.error(error.message);
  }
})();
