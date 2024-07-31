const { fetchEconomicCalendar } = require("../controllers/controllersAPIs")



const calendarHandler = async (req, res) => {
    try{
        let result = await fetchEconomicCalendar()
        res.json(result)
    }catch(err){
        res.json(err)
    }
}


module.exports = {calendarHandler}