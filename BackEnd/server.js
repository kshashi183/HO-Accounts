const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(bodyParser.json({ limit: "50mb" }));

const dailyReportRouter = require("./routes/HOAccounts/Unit/DailyReport");
const monthlyReportRouter = require("./routes/HOAccounts/Ho/MonthlyReportHO");

require("dotenv").config();

app.use(cors());

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hello hi ho accounts");
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

// const billingDetails = require("./routes/HOAccounts/Invoice/Daily/Billing_Details");
// app.use("/billingDetails", billingDetails);

const customerOutstanding = require("./routes/HOAccounts/Unit/Customer_OutStanding");
app.use("/customerOutstanding", customerOutstanding);

// const vendorList=require('./routes/HOAccounts/Unit/Purchase/Vendor_List')
// app.use('/vendorList', vendorList)

app.use("/dailyReport", dailyReportRouter);
app.use("/monthlyReportData", monthlyReportRouter);

const unitRV_Adjustment = require("./routes/HOAccounts/HO/Unit_Rv_Adjustment");
app.use("/unitRV_Adjustment", unitRV_Adjustment);

const unitReceiptList = require("./routes/HOAccounts/HO/Unit_ReceiptList/Unit_Receiptlist");
app.use("/unitReceiptList", unitReceiptList);

const tally_Export = require("./routes/HOAccounts/HO/Tally_Export/TallyExport");
app.use("/tallyExport", tally_Export);

const accountSyncRouter = require("./routes/HOAccounts/Sync/AccountSync");
app.use("/accountSync", accountSyncRouter);

const fromUnitSyncRouter = require("./routes/HOAccounts/Sync/FromUnitSync");
app.use("/fromUnitSync", fromUnitSyncRouter);

const showSyncRouter = require("./routes/HOAccounts/Sync/ShowSyncStatus");
app.use("/showSyncStatus", showSyncRouter);

const sync_HO = require("./routes/HOAccounts/SetUp/Sync_HO");
app.use("/sync", sync_HO);

const prvListdata = require("./routes/HOAccounts/HO/PRV_Onaccount_Draft/PRV_List.Data");
app.use("/prvListdata", prvListdata);

const createnew = require("./routes/HOAccounts/HO/HO_PaymentVoucher/Create_new");
app.use("/createnew", createnew);

const fromUnitUpdateSyncRouter = require("./routes/HOAccounts/Sync/FromUnitUpdate");
app.use("/fromUnitUpdate", fromUnitUpdateSyncRouter);

const userRouter = require("./routes/user");
app.use("/user", userRouter);

const createNewRouter = require("./routes/HOAccounts/HO/HOprvCreateNew");
app.use("/hoCreateNew", createNewRouter);

const mailRouter = require("./routes/HOAccounts/mailer");
app.use("/mailer", mailRouter);

const savePDF = require("./routes/HOAccounts/savePDFServer/savePDFServer");

app.use("/PDF", savePDF);
