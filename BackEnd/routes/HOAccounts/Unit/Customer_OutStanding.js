const customerOutstanding = require("express").Router();
// const cors = require('cors');
// const { dbco, dbco1, dbgetData, deleteUnitData, updateUnitData } = require("../../../helpers/dbconn")
const { setupQueryMod } = require("../../../helpers/dbconn")
var bodyParser = require('body-parser')



customerOutstanding.get('/unitOutstandingData', (req, res) => {

    const sqlQ = `
        SELECT @UnitName AS UnitName, u.*, a.OutStandingInvoiceCount, a.OutStandingAmount
        FROM magodmis.cust_data u
        INNER JOIN (
            SELECT
                COUNT(u.\`Cust_Code\`) AS OutStandingInvoiceCount,
                SUM(u.\`GrandTotal\` - u.\`PymtAmtRecd\`) AS OutStandingAmount,
                u.\`Cust_Code\`
            FROM magodmis.draft_Dc_Inv_Register u
            WHERE u.\`GrandTotal\` - u.\`PymtAmtRecd\` > 0
                AND u.\`DCStatus\` NOT LIKE 'Closed'
                AND u.\`Inv_No\` IS NOT NULL 
                AND u.\`Inv_Date\` <'2018-02-04'    
            GROUP BY u.\`Cust_Code\`
        ) AS a ON a.\`Cust_Code\` = u.\`Cust_Code\` ;
    `;

    // Both queries are same i make some changes based on my requriment

    const UnitNameQuery = `
    SELECT u.*, a.OutStandingInvoiceCount, a.OutStandingAmount
      FROM magod_hq_mis.unit_cust_data u
      INNER JOIN (
        SELECT COUNT(u.Cust_Code) AS OutStandingInvoiceCount, SUM(u.GrandTotal - u.PymtAmtRecd) AS OutStandingAmount, u.Cust_Code
        FROM magod_hq_mis.unit_invoices_list u
        WHERE u.GrandTotal - u.PymtAmtRecd > 0 AND u.DCStatus NOT LIKE 'Closed' AND u.Inv_No IS NOT NULL AND u.UnitName = 'Jigani'
        GROUP BY u.Cust_Code
      ) AS a ON a.Cust_Code = u.Cust_Code
      WHERE u.UnitName = 'Jigani'  
    
`;

    setupQueryMod(UnitNameQuery, (err, result) => {
        if (err) {
            console.log("err in query", err);
        }
        else {
            // console.log("success", result);
            return res.json({ Result: result });
        }
    })
});




customerOutstanding.get('/getCustomers', (req, res) => {
    const sql = `SELECT DISTINCT Cust_Code, Cust_name FROM magodmis.cust_data `;
    //  const sql=`
    // SELECT DISTINCT Cust_Code , Cust_Name FROM magodmis.draft_dc_inv_register `;
    setupQueryMod(sql, (err, result) => {
        if (err) {
            console.log("err in query", err);
        }
        else {
            // console.log("cust sql query 500 change", result);
            return res.json({ Result: result });
        }
    })
})

// customerOutstanding.get('/getDataBasedOnCustomer', (req,res)=>{
//     const custcode=req.query.selectedCustCode;
//    // console.log("cust_code backend 33333333333 ", custcode);
//     const sql=`     SELECT *,
//     GrandTotal-  PymtAmtRecd AS Balance, DATEDIFF(CURRENT_DATE(),inv_date) AS duedays,
//     IF(LENGTH(DC_Date) = 8, DATE_FORMAT(STR_TO_DATE(DC_Date, '%Y-%m-%d'), '%d-%m-%Y'), DATE_FORMAT(STR_TO_DATE(DC_Date, '%Y-%m-%d'), '%d-%m-%Y')) AS Formatted_DC_Date,
//       IF(LENGTH(Inv_Date) = 8, DATE_FORMAT(STR_TO_DATE(Inv_Date, '%Y-%m-%d'), '%d-%m-%Y'), DATE_FORMAT(STR_TO_DATE(Inv_Date, '%Y-%m-%d'), '%d-%m-%Y')) AS Formatted_Inv_Date,
//         IF(LENGTH(DespatchDate) = 8, DATE_FORMAT(STR_TO_DATE(DespatchDate, '%Y-%m-%d'), '%d-%m-%Y'), DATE_FORMAT(STR_TO_DATE(DespatchDate, '%Y-%m-%d'), '%d-%m-%Y')) AS Formatted_DespatchDate,
//     IF(TIME(OrderDate) = '00:00:00', DATE_FORMAT(STR_TO_DATE(OrderDate, '%Y-%m-%d %H:%i:%s'), '%d-%m-%Y %H:%i:%s'), DATE_FORMAT(STR_TO_DATE(OrderDate, '%Y-%m-%d %H:%i:%s'), '%d-%m-%Y %H:%i:%s')) AS Formatted_OrderDate,
//       IF(TIME(PaymentDate) = '00:00:00', DATE_FORMAT(STR_TO_DATE(PaymentDate, '%Y-%m-%d %H:%i:%s'), '%d-%m-%Y %H:%i:%s'), DATE_FORMAT(STR_TO_DATE(PaymentDate, '%Y-%m-%d %H:%i:%s'), '%d-%m-%Y %H:%i:%s')) AS Formatted_PaymentDate
// FROM magod_hq_mis.unit_invoices_list
// WHERE UnitName = 'Jigani' AND Cust_Code = '${custcode}';`;



//     setupQueryMod(sql, (err, result)=>{
//         if(err){
//             console.log("err in query", err);
//         }
//         else{
//         // console.log("cust code result", result);
//             return res.json({Result:result});
//         }
//     })
//     })

customerOutstanding.get('/getDataBasedOnCustomer', (req, res) => {
    const custcode = req.query.selectedCustCode;
    const selectedDCType = req.query.selectedDCType;
    const invoiceFor = req.query.flag;
    console.log("custcode, ", custcode,);
    console.log("dctype", selectedDCType);
    console.log("invoiceFor, ", invoiceFor,);



    const sql1 = `SELECT 
    u.PO_No,
    u.Inv_No,
    @UnitName AS UnitName,
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
    WHERE  u.Cust_Code = '${custcode}'`

    const sql2 = `SELECT 
    u.PO_No,
    u.Inv_No,
    @UnitName AS UnitName,
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
    WHERE  u.Cust_Code = '${custcode}' AND   u.DC_InvType='${selectedDCType}'`

    const sql3 = `SELECT 
    u.PO_No,
    u.Inv_No,
    @UnitName AS UnitName,
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
    WHERE  u.Cust_Code = '${custcode}' AND   u.DC_InvType='${selectedDCType}' AND InvoiceFor='${invoiceFor}'`;

    const salesANDjobwork = `SELECT 
    u.PO_No,
    u.Inv_No,
    @UnitName AS UnitName,
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
    WHERE  u.Cust_Code = '${custcode}' AND   u.DC_InvType IN ('Sales', 'Job work') AND InvoiceFor='${invoiceFor}'`;

    if (custcode === ' ' && (selectedDCType !== '' || invoiceFor !== '')) {
        return res.json({ Result: "customer err" });
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

    if (selectedDCType !== '' && invoiceFor === '') {


        if (selectedDCType === 'ALL') {



            setupQueryMod(sql1, (err, result) => {
                if (err) {
                    console.log("err in query", err);
                }
                else {
                     console.log("cust code result1111111", result);
                    return res.json({ Result: result });
                }
            })
        }





        else {





            setupQueryMod(sql2, (err, result) => {
                if (err) {
                    console.log("err in query", err);
                }
                else {
                    if (result.length === 0) {
                        return res.json({ Result: "select dc type" });
                    }
                    else {
                        //  console.log("cust code result2222", result);
                        return res.json({ Result: result });
                    }
                }
            })
        }

    }



    else if (selectedDCType !== '' && invoiceFor !== '') {



        if (selectedDCType === 'Sales & Jobwork') {


console.log("sales and jobworkkkkkk");



            setupQueryMod(salesANDjobwork, (err, result) => {
                if (err) {
                    console.log("sales nad jobwork error ",err );
                    console.log("err in query", err);
                }
                else {

                    if (result.length === 0) {
                        console.log("sales nad jobwork error  result length",result.length );
                        return res.json({ Result: "error in invoice for" });
                    }
                    else {
                          console.log("cust code 4 sales and jobwork", result);
                        return res.json({ Result: result });
                    }

                }
            })
        }



        else {


            setupQueryMod(sql3, (err, result) => {
                if (err) {
                    console.log("err in query", err);
                }
                else {

                    if (result.length === 0) {
                        return res.json({ Result: "error in invoice for" });
                    }
                    else {
                        // console.log("cust code result4444", selectedDCType, );
                        return res.json({ Result: result });
                    }
                }
            })

        }

    }

})



customerOutstanding.get('/getDataTable2', (req, res) => {
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
        WHERE u.Unitname = @Unitname AND u.Dc_inv_no = '${DC_Inv_No}';`

    setupQueryMod(sql, (err, result) => {
        if (err) {
            console.log("err in query", err);
        }
        else {
            // console.log("DC_Inv_no result", result);
            return res.json({ Result: result });
        }
    })
})


customerOutstanding.get('/getDCTypes', (req, res) => {


    const sql = `SELECT  DISTINCT DC_InvType FROM magod_hq_mis.unit_invoices_list `
    setupQueryMod(sql, (err, result) => {
        if (err) {
            console.log("err in query", err);
        }
        else {
          //  console.log("DC_Inv_type", result);
            return res.json({ Result: result });
        }
    })
})

module.exports = customerOutstanding;