const unitRV_Adjustment = require("express").Router();
// const cors = require('cors');
// const { dbco, dbco1, dbgetData, deleteUnitData, updateUnitData } = require("../../../helpers/dbconn")
const { setupQueryMod, misQuery } = require("../../../helpers/dbconn")


unitRV_Adjustment.get('/rvAdjustment', (req, res) => {
    const custcode=req.query.selectedCustCode;
    console.log(custcode);
    const sql1 = `SELECT
u.Id,
u.Unitname,
u.RecdPVID,
u.Recd_PVNo,
DATE_FORMAT(u.Recd_PV_Date, '%d-%m-%Y') AS Formatted_Recd_PV_Date,u.Cust_code,
u.CustName,u.TxnType,u.Amount,u.DocuNo,u.Description,u.On_account,u.PRV_Status AS ReceiptStatus
FROM
magod_hq_mis.unit_payment_recd_voucher_register u
WHERE
u.PRV_Status = 'Created' AND Unitname='Jigani'  AND Cust_code='${custcode}'LIMIT 10;`

const sql2 = `SELECT
u.Id,
u.Unitname,
u.RecdPVID,
u.Recd_PVNo,
DATE_FORMAT(u.Recd_PV_Date, '%d-%m-%Y') AS Formatted_Recd_PV_Date,u.Cust_code,
u.CustName,u.TxnType,u.Amount,u.DocuNo,u.Description,u.On_account,u.PRV_Status AS ReceiptStatus
FROM
magod_hq_mis.unit_payment_recd_voucher_register u
WHERE
u.PRV_Status = 'Created' AND Unitname='Jigani'  LIMIT 10;`



if(custcode){
    setupQueryMod(sql1, (err, result) => {
        if (err) {
            console.log("errin query", err);
        }
        else {
           //  console.log("res c", result);
            return res.json({ Status: 'Success', Result: result });
        }
    })
}
else{
    setupQueryMod(sql2, (err, result) => {
        if (err) {
            console.log("errin query", err);
        }
        else {
           //  console.log("res", result);
            return res.json({ Status: 'Success', Result: result });
        }
    })
}

})



unitRV_Adjustment.get('/getCustomers', (req, res) => {
    const sql = `SELECT DISTINCT Cust_Code, Cust_name FROM magodmis.cust_data `;
    //  const sql=`
    // SELECT DISTINCT Cust_Code , Cust_Name FROM magodmis.draft_dc_inv_register `;
    setupQueryMod(sql, (err, result) => {
        if (err) {
            console.log("err in query", err);
        }
        else {
            //console.log("cust sql query 500 change", result);
            return res.json({ Result: result });
        }
    })
})

module.exports = unitRV_Adjustment;