const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(bodyParser.json({ limit: "50mb" }));

const dailyReportRouter = require("./routes/HOAccounts/Unit/DailyReport");
const monthlyReportRouter = require("./routes/HOAccounts/Ho/MonthlyReportHO");
const createNewRouter = require("./routes/HOAccounts/Ho/HOprvCreateNew");

require("dotenv").config();

app.use(cors());

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hello");
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
  // logger.error(`Status Code : ${err.status}  - Error : ${err.message}`);
});

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
  //    logger.info('listening on port ' + process.env.PORT);
});

// const unitlist = require('./routes/unitAccounts/SetUp/UnitList');

const unitlist = require("./routes/HOAccounts/SetUp/UnitList");
app.use("/unitlist", unitlist);

const taxMaster = require("./routes/HOAccounts/SetUp/TaxMaster");
app.use("/taxMaster", taxMaster);

const billingDetails = require("./routes/HOAccounts/Invoice/Daily/Billing_Details");
app.use("/billingDetails", billingDetails);

const customerOutstanding = require("./routes/HOAccounts/Unit/Customer_OutStanding");
app.use("/customerOutstanding", customerOutstanding);

// const vendorList=require('./routes/HOAccounts/Unit/Purchase/Vendor_List')
// app.use('/vendorList', vendorList)

app.use("/dailyReport", dailyReportRouter);
app.use("/monthlyReportData", monthlyReportRouter);
app.use("/hoCreateNew", createNewRouter);

const unitRV_Adjustment = require("./routes/HOAccounts/HO/Unit_Rv_Adjustment");
app.use("/unitRV_Adjustment", unitRV_Adjustment);

const unitReceiptList = require("./routes/HOAccounts/HO/Unit_ReceiptList/Unit_Receiptlist");
app.use("/unitReceiptList", unitReceiptList);

const tally_Export = require("./routes/HOAccounts/HO/Tally_Export/TallyExport");
app.use("/tallyExport", tally_Export);

const sync_HO = require("./routes/HOAccounts/SetUp/Sync_HO");
app.use("/sync", sync_HO);

const accountSyncRouter = require("./routes/HOAccounts/Sync/AccountSync");
app.use("/accountSync", accountSyncRouter);

const fromUnitSyncRouter = require("./routes/HOAccounts/Sync/FromUnitSync");
app.use('/fromUnitSync', fromUnitSyncRouter)

const showSyncRouter = require("./routes/HOAccounts/Sync/ShowSyncStatus");
app.use('/showSyncStatus', showSyncRouter)
