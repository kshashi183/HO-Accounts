const unitRV_Adjustment = require("express").Router();
// const cors = require('cors');
// const { dbco, dbco1, dbgetData, deleteUnitData, updateUnitData } = require("../../../helpers/dbconn")
const { setupQueryMod, misQuery } = require("../../../helpers/dbconn");
const { logger } = require("../../../helpers/logger");

unitRV_Adjustment.get("/rvAdjustment", (req, res) => {
  const custcode = req.query.selectedCustCode;

  const unitObject = req.query.selectedUnitName;
  const unit =
    unitObject && unitObject.length > 0 ? unitObject[0].UnitName : null;
  console.log("unitt", unit);
  const sql1 = `SELECT
u.Id,
u.Unitname,
u.RecdPVID,
u.Recd_PVNo,
u.HOPrvId,
u.Unit_UId, u.fixedOnaccount,
DATE_FORMAT(u.Recd_PV_Date, '%d-%m-%Y') AS Formatted_Recd_PV_Date,u.Cust_code,
u.CustName,u.TxnType,u.Amount,u.DocuNo,u.Description,u.On_account,u.PRV_Status AS ReceiptStatus
FROM
magod_hq_mis.unit_payment_recd_voucher_register u
WHERE
u.PRV_Status = 'Created' AND Unitname='${unit}'  AND Cust_code='${custcode}';`;

console.log("sql1", sql1);
  const sql2 = `SELECT
u.Id,
u.Unitname,
u.RecdPVID,
u.Recd_PVNo,
u.HOPrvId,
u.Unit_UId,
DATE_FORMAT(u.Recd_PV_Date, '%d-%m-%Y') AS Formatted_Recd_PV_Date,u.Cust_code,
u.CustName,u.TxnType,u.Amount,u.DocuNo,u.Description,u.On_account,u.PRV_Status AS ReceiptStatus
FROM
magod_hq_mis.unit_payment_recd_voucher_register u
WHERE
u.PRV_Status = 'Created' AND Unitname='${unit}'  ;`;

  if (custcode) {
    setupQueryMod(sql1, (err, result) => {
      if (err) {
        logger.error(
          "Unable to fetch data from magod_hq_mis.unit_payment_recd_voucher_register due to Wrong SQL query"
        );
      } else {
        console.log("unit rv adjustment ", result);
        return res.json({ Status: "Success", Result: result });
      }
    });
  } else {
    setupQueryMod(sql2, (err, result) => {
      if (err) {
        console.log("need to add fixed on account column");
        
        // logger.error(
        //   "Unable to fetch data from magod_hq_mis.unit_payment_recd_voucher_register due to Wrong SQL query"
        // );
      } else {
        
        return res.json({ Status: "Success", Result: result });
      }
    });
  }
});

unitRV_Adjustment.get("/getCustomers", (req, res) => {
  const sql = `SELECT DISTINCT Cust_Code, Cust_name FROM magod_hq_mis.unit_cust_data `;
  //  const sql=`
  // SELECT DISTINCT Cust_Code , Cust_Name FROM .draft_dc_inv_register `;
  setupQueryMod(sql, (err, result) => {
    if (err) {
      logger.error(
        "Unable to fetch  Cust_Code, Cust_name FROM magod_hq_mis.unit_cust_data due to Wrong SQL query"
      );
    } else {
      console.log(
        "cust sql query 500 change  customerss in unit rv",
        result.length
      );
      return res.json({ Result: result });
    }
  });
});

unitRV_Adjustment.get("/openInvoices", (req, res) => {
  const custcode = req.query.selectedCustCode;

  const sql = `SELECT *,
    DATE_FORMAT(Inv_Date, '%d-%m-%Y') AS Formatted_Inv_Date
    FROM magod_hq_mis.unit_invoices_list
    WHERE UnitName = 'Jigani'
      AND Cust_Code='${custcode}'
      AND ABS(GrandTotal - PymtAmtRecd) > 0
      AND DCStatus <> 'Closed'; `;
  //  const sql=`
  // SELECT DISTINCT Cust_Code , Cust_Name FROM .draft_dc_inv_register `;
  setupQueryMod(sql, (err, result) => {
    if (err) {
      logger.error(
        "Unable to fetch data from magod_hq_mis.unit_invoices_list due to Wrong SQL query"
      );
    } else {
      //console.log("cust sql query 500 change", result);
      return res.json({ Result: result });
    }
  });
});


//update fixed on account value
unitRV_Adjustment.post("/updateFixedOnAccount", (req, res) => {
  console.log(" Successf  fixed onaccount")
  const sql = `UPDATE magod_hq_mis.unit_payment_recd_voucher_register 
               SET fixedOnaccount = On_account`;

  setupQueryMod(sql, (err, result) => {
    if (err) {
      logger.error(" Error updating fixedOnaccount values:", err);
      return res.status(500).json({ Status: "Error", Message: "Failed to update records" });
    } else {
      console.log(`Successfully updated ${result.affectedRows} rows.`);
      return res.json({ Status: "Success", Message: `Updated ${result.affectedRows} rows.` });
    }
  });
});




module.exports = unitRV_Adjustment;
