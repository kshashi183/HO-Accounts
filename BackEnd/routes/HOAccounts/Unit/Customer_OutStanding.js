const customerOutstanding = require("express").Router();
// const cors = require('cors');
// const { dbco, dbco1, dbgetData, deleteUnitData, updateUnitData } = require("../../../helpers/dbconn")
const { setupQueryMod } = require("../../../helpers/dbconn");
var bodyParser = require("body-parser");

customerOutstanding.get("/unitOutstandingData", (req, res) => {
  const unitname = req.query.unitname;
  console.log("unit nameeeeeeeeeeee", unitname);

  // Both queries are same i make some changes based on my requriment

  const UnitNameQuery = `
    SELECT u.*, a.OutStandingInvoiceCount, a.OutStandingAmount
      FROM magod_hq_mis.unit_cust_data u
      INNER JOIN (
        SELECT COUNT(u.Cust_Code) AS OutStandingInvoiceCount, SUM(u.GrandTotal - u.PymtAmtRecd) AS OutStandingAmount, u.Cust_Code
        FROM magod_hq_mis.unit_invoices_list u
        WHERE u.GrandTotal - u.PymtAmtRecd > 0 AND u.DCStatus NOT LIKE 'Closed' AND u.Inv_No IS NOT NULL AND u.UnitName = '${unitname}'
        GROUP BY u.Cust_Code
      ) AS a ON a.Cust_Code = u.Cust_Code
      WHERE u.UnitName = '${unitname}'  
    
`;

  setupQueryMod(UnitNameQuery, (err, result) => {
    if (err) {
      console.log("err in query", err);
    } else {
      // console.log("success", result);
      return res.json({ Result: result });
    }
  });
});

customerOutstanding.get("/getCustomers", (req, res) => {
  const sql = `SELECT DISTINCT Cust_Code, Cust_name FROM magod_hq_mis.unit_cust_data `;

  setupQueryMod(sql, (err, result) => {
    if (err) {
      console.log("err in query", err);
    } else {
      // console.log("cust sql query 500 change", result);
      return res.json({ Result: result });
    }
  });
});

customerOutstanding.get("/getDataBasedOnCustomer", (req, res) => {
  const custcode = req.query.selectedCustCode;
  const selectedDCType = req.query.selectedDCType;
  const invoiceFor = req.query.flag;
  const unitname = req.query.unitname;

  console.log("dctype", selectedDCType, "invoiceFor", invoiceFor);

  const sql1 = `SELECT 
    u.PO_No,
    u.Inv_No,
   
    u.GrandTotal - u.PymtAmtRecd AS Balance,
    DATEDIFF(CURRENT_DATE(), u.Inv_Date) AS duedays,
    u.InvoiceFor,  
    u.DCStatus, 
    u.DC_InvType,
    u.Inv_Date, 
    u.GrandTotal,
    u.Cust_Name,
    u.PymtAmtRecd,u.PIN_Code,u.DC_Inv_No
    FROM magod_hq_mis.unit_invoices_list u
    WHERE  u.Cust_Code = '${custcode}'  AND  u.UnitName='${unitname}'`;

  const sql2 = `SELECT 
    u.PO_No,
    u.Inv_No,
  
    u.GrandTotal - u.PymtAmtRecd AS Balance,
    DATEDIFF(CURRENT_DATE(), u.Inv_Date) AS duedays,
    u.InvoiceFor,  
    u.DCStatus, 
    u.DC_InvType,
    u.Inv_Date, 
    u.GrandTotal,
    u.Cust_Name,
    u.PymtAmtRecd,u.PIN_Code,u.DC_Inv_No
    FROM magod_hq_mis.unit_invoices_list u
    WHERE  u.Cust_Code = '${custcode}' AND   u.DC_InvType='${selectedDCType}' AND  u.UnitName='${unitname}'`;

  const sql3 = `SELECT 
    u.PO_No,
    u.Inv_No,
  
    u.GrandTotal - u.PymtAmtRecd AS Balance,
    DATEDIFF(CURRENT_DATE(), u.Inv_Date) AS duedays,
    u.InvoiceFor,  
    u.DCStatus, 
    u.DC_InvType,
    u.Inv_Date, 
    u.GrandTotal,
    u.Cust_Name,
    u.PymtAmtRecd,u.PIN_Code,u.DC_Inv_No
    FROM magod_hq_mis.unit_invoices_list u
    WHERE  u.Cust_Code = '${custcode}' AND   u.DC_InvType='${selectedDCType}'  AND  u.UnitName='${unitname}' AND
    InvoiceFor='${invoiceFor}'`;

  const salesAndJobWork_Without_InvoiceFor = `SELECT 
    u.PO_No,
    u.Inv_No,
  
    u.GrandTotal - u.PymtAmtRecd AS Balance,
    DATEDIFF(CURRENT_DATE(), u.Inv_Date) AS duedays,
    u.InvoiceFor,  
    u.DCStatus, 
    u.DC_InvType,
    u.Inv_Date, 
    u.GrandTotal,
    u.Cust_Name,
    u.PymtAmtRecd,u.PIN_Code,u.DC_Inv_No
    FROM magod_hq_mis.unit_invoices_list u
    WHERE  u.Cust_Code = '${custcode}' AND   u.DC_InvType IN ('Sales', 'Job work')  AND  u.UnitName='${unitname}'`;

  const salesANDjobwork = `SELECT 
    u.PO_No,
    u.Inv_No,
  
    u.GrandTotal - u.PymtAmtRecd AS Balance,
    DATEDIFF(CURRENT_DATE(), u.Inv_Date) AS duedays,
    u.InvoiceFor,  
    u.DCStatus, 
    u.DC_InvType,
    u.Inv_Date, 
    u.GrandTotal,
    u.Cust_Name,
    u.PymtAmtRecd,u.PIN_Code,u.DC_Inv_No
    FROM magod_hq_mis.unit_invoices_list u
    WHERE  u.Cust_Code = '${custcode}' AND   u.DC_InvType IN ('Sales', 'Job work') AND InvoiceFor='${invoiceFor}' AND  u.UnitName='${unitname}'`;

  if (custcode === " " && (selectedDCType !== "" || invoiceFor !== "")) {
    return res.json({ Result: "customer err" });
  } else if (
    !unitname &&
    custcode !== " " &&
    (selectedDCType !== "" || invoiceFor !== "")
  ) {
    //return res.json({ Result: 'selectUnit' })
  }

  // setupQueryMod(sql1, (err, result)=>{
  //     if(err){
  //         console.log("err in query", err);
  //     }
  //     else{
  //     // console.log("cust code result", result);
  //         return res.json({Result:result});
  //     }
  // })

  if (selectedDCType !== "" && invoiceFor === "") {
    if (selectedDCType !== "ALL" && selectedDCType !== "Sales & Jobwork") {
      setupQueryMod(sql2, (err, result) => {
        if (err) {
          console.log("err in query", err);
        } else {
          console.log("unitname, dc type, cust code");
          return res.json({ Result: result });
        }
      });
    } else if (selectedDCType === "ALL") {
      setupQueryMod(sql1, (err, result) => {
        if (err) {
          console.log("err in query", err);
        } else {
          console.log("cust code for ALL", result.length);
          return res.json({ Result: result });
        }
      });
    } else if (selectedDCType === "Sales & Jobwork") {
      setupQueryMod(salesAndJobWork_Without_InvoiceFor, (err, result) => {
        if (err) {
          console.log("err in query", err);
        } else {
          console.log(
            "cust code result1111111 no data for this unit",
            result.length
          );
          return res.json({ Result: result });
        }
      });
    } else {
      setupQueryMod(sql3, (err, result) => {
        if (err) {
          console.log("err in query", err);
        } else {
          if (result.length === 0) {
            console.log("result length", result.length);
            return res.json({ Result: "error in invoice for" });
          } else {
            console.log("cust code result2222");
            return res.json({ Result: result });
          }
        }
      });
    }
  } else if (selectedDCType !== "" && invoiceFor !== "") {
    if (selectedDCType === "Sales & Jobwork") {
      console.log("sales and jobworkkkkkk");

      setupQueryMod(salesANDjobwork, (err, result) => {
        if (err) {
          console.log("sales nad jobwork error ", err);
          console.log("err in query", err);
        } else {
          if (result.length === 0) {
            console.log(
              "sales nad jobwork error  result length",
              result.length
            );
            return res.json({ Result: "error in invoice for" });
          } else {
            // console.log("cust code 4 sales and jobwork", result);
            return res.json({ Result: result });
          }
        }
      });
    } else {
      setupQueryMod(sql3, (err, result) => {
        if (err) {
          console.log("err in query", err);
        } else {
          if (result.length === 0) {
            return res.json({ Result: "error in invoice for" });
          } else {
            console.log("cust code result4444", result.length);
            return res.json({ Result: result });
          }
        }
      });
    }
  }
});

customerOutstanding.get("/getDataTable2", (req, res) => {
  const DC_Inv_No = req.query.selectedDCInvNo;
  console.log("DC_INV_NO", DC_Inv_No);

  const sql = ` SELECT CONCAT('HO/', h1.HORef) AS VrRef, h.Receive_Now, h1.TxnType, h1.Status AS VrStatus
        FROM magod_hq_mis.ho_paymentrv_details h
        INNER JOIN magod_hq_mis.ho_paymentrv_register h1 ON h.HOPrvId = h1.HOPrvId
        WHERE h.Unitname = @Unitname AND h.Dc_inv_no = '${DC_Inv_No}'
        UNION
        SELECT CONCAT(u.Unitname, ' /', u1.Recd_PVNo) AS VrRef, u.Receive_Now, u1.TxnType, u1.PRV_Status AS VrStatus
        FROM magod_hq_mis.unit_payment_recd_voucher_details u
        INNER JOIN magod_hq_mis.unit_payment_recd_voucher_register u1 ON u.PvrId = u1.Id
        WHERE u.Unitname = @Unitname AND u.Dc_inv_no = '${DC_Inv_No}';`;

  setupQueryMod(sql, (err, result) => {
    if (err) {
      console.log("err in query", err);
    } else {
      console.log("DC_Inv_no result", result.length);
      return res.json({ Result: result });
    }
  });
});

customerOutstanding.get("/getDCTypes", (req, res) => {
  const sql = `SELECT  DISTINCT DC_InvType FROM magod_hq_mis.unit_invoices_list `;
  setupQueryMod(sql, (err, result) => {
    if (err) {
      console.log("err in query", err);
    } else {
      //  console.log("DC_Inv_type", result);
      return res.json({ Result: result });
    }
  });
});

customerOutstanding.post("/getAddress", (req, res) => {
  const unit = req.body.unit;
  console.log("backend adresssssss", req.body);

  const sql = `SELECT   Unit_Address , RegistredOfficeAddress FROM magod_setup.magodlaser_units where UnitName='${unit}' `;
  setupQueryMod(sql, (err, result) => {
    if (err) {
      console.log("err in query", err);
    } else {
      // console.log(" unit adresssssss", result);
      return res.json({ Result: result });
    }
  });
});

module.exports = customerOutstanding;
