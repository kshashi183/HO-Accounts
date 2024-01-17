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
u.HOPrvId,
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
  //console.log("custcodeeeee", custcode);
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















// unitRV_Adjustment.post("/addToVoucher", async (req, res, next) => {
//   try {
//     const { selectedRows, HOPrvId } = req.body;
//     console.log("req body", HOPrvId);
//     const insertResults = [];
//     let existingDraftIds = [];

//     const checkRecdPvSrlQuery = `SELECT MAX(RecdPvSrl) AS maxRecdPvSrl FROM magod_hq_mis.ho_paymentrv_details  WHERE HOPrvId=${HOPrvId};`;

//     const checkRecdPvSrlData = await new Promise((resolve, reject) => {
//       setupQueryMod(checkRecdPvSrlQuery, (err, data) => {
//         if (err) {
//           console.log("err1", err);
//           reject(err);
//         } else {
//           console.log("11",data );
//           resolve(data);
//         }
//       });
//     });

//     const maxRecdPvSrl = checkRecdPvSrlData[0].maxRecdPvSrl;

//     const selectQuery = `SELECT * FROM magod_hq_mis.ho_paymentrv_details  WHERE HOPrvId=${HOPrvId};`;

//     const selectData = await new Promise((resolve, reject) => {
//       setupQueryMod(selectQuery, (err, data) => {
//         if (err) {
//           console.log("err2", err);
//           reject(err);
//         } else {
//           console.log("hopvrd", data);
//           resolve(data);
//         }
//       });
//     });

//     console.log("eeeeRROR1",);
//     const Unitname = 'Jigani'
//     existingDraftIds = selectData.map((row) => row.Dc_inv_no);

//     let recdPvSrlToInsert = maxRecdPvSrl !== null ? maxRecdPvSrl : 0;

//     for (const row of selectedRows) {
//       const { DC_Inv_No } = row;
//       if (DC_Inv_No === undefined) {
//         throw new Error("One or more IDs are not present.");
//       }

//       if (!existingDraftIds.includes(DC_Inv_No)) {
//         const recdPvSrlToInsertIncremented = ++recdPvSrlToInsert;

//         const insertQuery = `
//         INSERT INTO magod_hq_mis.ho_paymentrv_details  (
//           HOPrvId,
//           Unitname,
//           RecdPvSrl,
//           DC_inv_no,
//           Inv_No,
//           Inv_Type,
//           Inv_Amount,
//           Amt_received,
//           Receive_Now,
//           Inv_Date,
//           RefNo
//         )
//         VALUES (
//           '${HOPrvId}',
//          '${Unitname}',
//           ${recdPvSrlToInsertIncremented},
//           '${row.DC_Inv_No}',
//           '${row.Inv_No}',
//           '${row.DC_InvType}',
//           ${row.GrandTotal},
//           ${row.PymtAmtRecd},
//           ${row.Balance},
//           '${row.Inv_Date}',
//           '${row.Inv_No} / ${row.Inv_Fin_Year}'
//         )`;


//         await new Promise((resolve, reject) => {
//           console.log("eeeeRROR22",);
//           setupQueryMod(insertQuery, (err, data) => {
//             if (err) {
//               console.log("errrere", err);
//               insertResults.push({
//                 id: DC_Inv_No,
//                 error: "Insert failed.",
//               });
//               reject(err);
//             } else {
//               insertResults.push({
//                 id: DC_Inv_No,
//                 success: true,
//               });
//               resolve();
//             }
//           });
//         });
//       } else {
//         insertResults.push({
//           id: DC_Inv_No,
//           error: "DC_Inv_No already exists in the firstTable.",
//         });
//       }
//     }

//     const finalSelectQuery = `SELECT * FROM magod_hq_mis.ho_paymentrv_details  WHERE HOPrvId=${HOPrvId};`;


//     const finalSelectData = await new Promise((resolve, reject) => {
//       setupQueryMod(finalSelectQuery, (err, data) => {
//         if (err) {
//           console.log("err4", err);
//           reject(err);
//         } else {
//           resolve(data);
//         }
//       });
//     });

//     res.json(finalSelectData);
//   } catch (error) {
//     console.log("Error:", error.message);
//     next(error);
//   }
// });




module.exports = unitRV_Adjustment;