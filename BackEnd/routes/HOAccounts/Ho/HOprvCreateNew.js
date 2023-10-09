const createNewRouter = require("express").Router();
const {
  dailyReportQuery,
  setupQuery,
  hqQuery,
} = require("../../../helpers/dbconn");
var bodyParser = require("body-parser");

//Unit Names 
createNewRouter.post("/unitNames", async (req, res, next) => {
  try {
    setupQuery(`SELECT DISTINCT UnitName FROM magod_setup.magodlaser_units;`,
      (err, data) => {
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});

//Customer Names
createNewRouter.post("/customerNames", async (req, res, next) => {
  try {
    setupQuery(`SELECT DISTINCT Cust_Code, Cust_Name FROM magod_hq_mis.unit_cust_data;`,
      (err, data) => {
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});


module.exports = createNewRouter;
