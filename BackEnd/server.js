const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const dailyReportRouter = require("./routes/HOAccounts/Unit/DailyReport");
const monthlyReportRouter = require("./routes/HOAccounts/Ho/MonthlyReportHO");
const createNewRouter = require("./routes/HOAccounts/Ho/HOprvCreateNew");


require('dotenv').config();



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

// const unitlist = require('./routes/HOAccounts/SetUp/UnitList')
// app.use('/unitlist', unitlist)

 

// const taxMaster=require('./routes/HOAccounts/SetUp/TaxMaster')
// app.use('/taxMaster', taxMaster)

 

// const billingDetails= require('./routes/HOAccounts/Invoice/Daily/Billing_Details')
// app.use('/billingDetails', billingDetails)

 

// const customerOutstanding=require('./routes/HOAccounts/Unit/Customer_OutStanding')
// app.use('/customerOutstanding',customerOutstanding)

 

 

// const vendorList=require('./routes/HOAccounts/Unit/Purchase/Vendor_List')
// app.use('/vendorList', vendorList)

app.use('/dailyReport', dailyReportRouter)
app.use('/monthlyReportData', monthlyReportRouter)
app.use('/hoCreateNew', createNewRouter)
