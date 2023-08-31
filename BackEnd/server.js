const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const dailyReportRouter = require("./routes/unitAccounts/Unit/DailyReport");


require('dotenv').config();

const dailyReport = require('./helpers/dbconn.js');
const monthlyReportRouter = require("./routes/unitAccounts/Unit/MonthlyReport");


app.use(cors())

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("hello");
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        }
    })
    // logger.error(`Status Code : ${err.status}  - Error : ${err.message}`);
})



app.listen(process.env.PORT, () => {
    console.log('listening on port ' + process.env.PORT);
//    logger.info('listening on port ' + process.env.PORT);
});


// const unitlist = require('./routes/unitAccounts/SetUp/UnitList');

const unitlist = require('./routes/unitAccounts/SetUp/UnitList')
app.use('/unitlist', unitlist)

 

const taxMaster=require('./routes/unitAccounts/SetUp/TaxMaster')
app.use('/taxMaster', taxMaster)

 

const billingDetails= require('./routes/unitAccounts/Invoice/Daily/Billing_Details')
app.use('/billingDetails', billingDetails)

 

const customerOutstanding=require('./routes/unitAccounts/Unit/Customer_OutStanding')
app.use('/customerOutstanding',customerOutstanding)

 

 

const vendorList=require('./routes/unitAccounts/Unit/Purchase/Vendor_List')
app.use('/vendorList', vendorList)

app.use('/dailyReport', dailyReportRouter)
app.use('/monthlyReportData', monthlyReportRouter)
