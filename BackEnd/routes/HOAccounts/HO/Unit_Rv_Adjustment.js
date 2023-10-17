const unitRV_Adjustment = require("express").Router();
// const cors = require('cors');
// const { dbco, dbco1, dbgetData, deleteUnitData, updateUnitData } = require("../../../helpers/dbconn")
const { setupQueryMod, misQuery } = require("../../../helpers/dbconn")


unitRV_Adjustment.get('/rvAdjustment', (req, res) => {
    const custcode = req.query.selectedCustCode;
    //  console.log("rvadjust custcode",custcode);
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
u.PRV_Status = 'Created' AND Unitname='Jigani'  AND Cust_code='${custcode}';`

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
u.PRV_Status = 'Created' AND Unitname='Jigani'  LIMIT 1000;`



    if (custcode) {
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
    else {
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


unitRV_Adjustment.get('/openInvoices', (req, res) => {
    const custcode = req.query.selectedCustCode;
    console.log("custcodeeeee", custcode);
    const sql = `SELECT *,
    DATE_FORMAT(Inv_Date, '%d-%m-%Y') AS Formatted_Inv_Date
    FROM magod_hq_mis.unit_invoices_list
    WHERE UnitName = 'Jigani'
      AND Cust_Code='${custcode}'
      AND ABS(GrandTotal - PymtAmtRecd) > 0
      AND DCStatus <> 'Closed'; `;
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








// unitRV_Adjustment.put('/invoiceUpdate', (req, res) => {
//     const { selectedDCInvNos, tableData } = req.body;

//     // Ensure that selectedDCInvNos and tableData are arrays
//     if (!Array.isArray(selectedDCInvNos) || !Array.isArray(tableData)) {
//         return res.status(400).json({ status: 'Invalid request data.' });
//     }

//     try {
//         console.log("hiiiiiii");
//         let updatedRowsCount = 0; // Keep track of the number of successfully updated rows

//         selectedDCInvNos.forEach((dcInvNo) => {
//             // Find the corresponding row in tableData for the current dcInvNo
//             const updatedRow = tableData.find((rowData) => rowData.DC_Inv_No === dcInvNo);

//             if (updatedRow) {
//                 // Construct your SQL query to update the database based on the updatedRow
//                 const sql = `
//                 UPDATE magod_hq_mis.unit_invoices_list u
//                 SET u.PymtAmtRecd = '${updatedRow.PymtAmtRecd}',
//                     u.DCStatus = IF(u.GrandTotal = u.PymtAmtRecd, 'Closed', 'Despatched')
//                 WHERE u.UnitName = 'Jigani' AND u.DC_Inv_No = '${dcInvNo}';
//               `;

//                 setupQueryMod(sql, (err, result) => {
//                     if (err) {
//                         console.log("err in query", err);
//                     }
//                     else {
//                         updatedRowsCount++; // Increment the count for successfully updated rows
//                         if (updatedRowsCount === selectedDCInvNos.length) {
//                             // Send the response only after all rows are updated
//                             console.log("updated susccesfuly");
//                             return res.json({ status: 'Update successful' });
//                         }
//                     }
//                 });


               
//             }
//         });
//     }
//     catch (err) {
//         console.log("errorrrrrr", err);
//     }
// });

unitRV_Adjustment.post('/invoiceInsert', (req,res)=>{
    const { selectedDCInvNos, tableData } = req.body;

    console.log("tabledata", tableData);
})




module.exports = unitRV_Adjustment;