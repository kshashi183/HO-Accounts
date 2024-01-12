const showSyncRouter = require("express").Router();
const { hqQuery, setupQuery } = require("../../../helpers/dbconn");
var bodyParser = require("body-parser");

//Magod Unit names
showSyncRouter.get("/hoUnitNames", async (req, res, next) => {
  try {
    setupQuery(
      `SELECT DISTINCT UnitName FROM magod_setup.magodlaser_units;`,
      (err, data) => {
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});

module.exports = showSyncRouter;
