const sync_HO = require("express").Router();
// const cors = require('cors');
// const { dbco, dbco1, dbgetData, deleteUnitData, updateUnitData } = require("../../../helpers/dbconn")
const { setupQueryMod } = require("../../../helpers/dbconn")
var bodyParser = require('body-parser')


sync_HO.get('/getUnits', (req,res)=>{
    const sql=`SELECT DISTINCT UnitName FROM magod_hq_mis.unit_cust_data;`
   
    setupQueryMod(sql,(err, result)=>{
        if (err) {
            console.log("err in query", err);
        }
        else {
       
            return res.json({ Status: 'Success', Result: result });
        }
    })
})

sync_HO.get('/openInvoice', (req,res)=>{
    const selectedUnit = req.query.selectedUnit;
    console.log("unit", selectedUnit);
    const sql=`SELECT u.*
    FROM magod_hq_mis.unit_invoices_list u
    WHERE u.UnitName = '${selectedUnit}'
      AND u.DCStatus NOT LIKE 'Closed'
      AND u.DCStatus NOT LIKE 'Cancelled' LIMIT 100
    `
   
    setupQueryMod(sql,(err, result)=>{
        if (err) {
            console.log("err in query", err);
        }
        else {
      // console.log("invcv", result);
            return res.json({ Status: 'Success', Result: result });
        }
    })
})

sync_HO.get('/getReceipts', (req,res)=>{
    const selectedUnit = req.query.selectedUnit;
    const sql=`SELECT u.PRV_Status AS ReceiptStatus, u.*
    FROM magod_hq_mis.unit_payment_recd_voucher_register u
    WHERE u.Unitname = '${selectedUnit}' AND u.PRV_Status NOT LIKE 'Closed' LIMIT 100;
    `
   
    setupQueryMod(sql,(err, result)=>{
        if (err) {
            console.log("err in query", err);
        }
        else {
       
            return res.json({ Status: 'Success', Result: result });
        }
    })
})

module.exports = sync_HO;