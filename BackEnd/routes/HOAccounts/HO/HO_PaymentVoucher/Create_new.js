const createnew = require("express").Router();

const { setupQueryMod, misQuery } = require("../../../../helpers/dbconn")




createnew.get('/ho_openInvoices', (req, res) => {
    const custcode = req.query.customercode;
    console.log("HO INV custcodeeeee", custcode);
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
        console.log("HO open invoice", result);
        return res.json({ Result: result });
      }
    })
  })



  createnew.get('/getFormData', (req, res) => {
  const receipt_id = req.query.receipt_id
  //const receipt_id = 245

    
    console.log("custcodeeeee", receipt_id);
    const sql = `SELECT * from magod_hq_mis.ho_paymentrv_register  WHERE HOPrvId='${receipt_id}' `;
    //  const sql=`
    // SELECT DISTINCT Cust_Code , Cust_Name FROM magodmis.draft_dc_inv_register `;
    setupQueryMod(sql, (err, result) => {
      if (err) {
        console.log("err in query", err);
      }
      else {
        console.log("form data", result);
        return res.json({ Result: result });
      }
    })
  })



  createnew.get('/getleftTable', (req, res) => {
     const receipt_id = req.query.receipt_id
   // const receipt_id=1
    console.log("custcodeeeee", receipt_id);
    const sql = `SELECT * FROM magod_hq_mis.ho_paymentrv_details   WHERE HOPrvId='${receipt_id}' `;
    //  const sql=`
    // SELECT DISTINCT Cust_Code , Cust_Name FROM magodmis.draft_dc_inv_register `;
    setupQueryMod(sql, (err, result) => {
      if (err) {
        console.log("err in query", err);
      }
      else {
       // console.log("left table", result);
        return res.json({ Result: result });
      }
    })
  })
module.exports = createnew;