const sync_HO = require("express").Router();
// const cors = require('cors');
// const { dbco, dbco1, dbgetData, deleteUnitData, updateUnitData } = require("../../../helpers/dbconn")
const { setupQueryMod,misQuery } = require("../../../helpers/dbconn")
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
      AND u.DCStatus NOT LIKE 'Cancelled'
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
    WHERE u.Unitname = '${selectedUnit}' AND u.PRV_Status NOT LIKE 'Closed' ;
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

// sync_HO.post('/postData',  (req, res) => {
//     try {
//         console.log(req.body);

//         if (req.body.open_inv.length > 0) {
//             for (let i = 0; i < req.body.open_inv.length; i++) {
//                 console.log(i)
//                  setupQueryMod(`Update magodmis.draft_dc_inv_register set PymtAmtRecd='${req.body.open_inv[i].HO_PymtAmtRecd}', GrandTotal='${req.body.open_inv[i].HO_GrandTotal}', DCStatus='${req.body.open_inv[i].HO_DCStatus}' where DC_Inv_No='${req.body.open_inv[i].DC_Inv_No}';`);
//             }
//         }

//         // if (req.body.open_rec.length > 0) {
//         //     for (let i = 0; i < req.body.open_rec.length; i++) {
//         //         await setupQueryMod(`Update magodmis.payment_recd_voucher_register set On_account='${req.body.open_rec[i].HO_On_account}', ReceiptStatus='${req.body.open_rec[i].HO_ReceiptStatus}' where RecdPVID='${req.body.open_rec[i].RecdPVID}';`);
//         //     }
//         // }

//         return res.json({ Status: 'Success', result: 'updated successfully' });
//     } catch (error) {
//         console.error(error);
//         return res.json({ Status: 'Error', result: 'failed to update data' });
//     }
// });

sync_HO.put('/postData', (req,res)=>{
    try {
        console.log("hiiiii",req.body);
      

        if (req.body.open_inv.length > 0) {
            for (let i = 0; i < req.body.open_inv.length; i++) {
                console.log(i)
                misQuery(`Update magodmis.draft_dc_inv_register set PymtAmtRecd='${req.body.open_inv[i].HO_PymtAmtRecd}', GrandTotal='${req.body.open_inv[i].HO_GrandTotal}', DCStatus='${req.body.open_inv[i].HO_DCStatus}' where DC_Inv_No='${req.body.open_inv[i].DC_Inv_No}';`);
            }
        }

        // if (req.body.open_rec.length > 0) {
        //     for (let i = 0; i < req.body.open_rec.length; i++) {
        //         await setupQueryMod(`Update magodmis.payment_recd_voucher_register set On_account='${req.body.open_rec[i].HO_On_account}', ReceiptStatus='${req.body.open_rec[i].HO_ReceiptStatus}' where RecdPVID='${req.body.open_rec[i].RecdPVID}';`);
        //     }
        // }

        return res.json({ Status: 'Success', result: 'updated successfully' });
    } catch (error) {
        console.error(error);
        return res.json({ Status: 'Error', result: 'failed to update data' });
    }
})
module.exports = sync_HO;