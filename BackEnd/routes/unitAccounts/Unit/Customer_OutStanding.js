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

    const UnitNameQuery=`
    SELECT 'Jigani' AS UnitName, u.*, a.OutStandingInvoiceCount, a.OutStandingAmount
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
              
        GROUP BY u.\`Cust_Code\`
    ) AS a ON a.\`Cust_Code\` = u.\`Cust_Code\` 
    WHERE   'Jigani' = (SELECT UnitName FROM magod_setup.magodlaser_units WHERE UnitName = 'Jigani');
    
`;

    setupQueryMod(UnitNameQuery, (err, result)=>{
        if(err){
            console.log("err in query", err);
        }
        else{
           // console.log("success", result);
            return res.json({Result:result});
        }
    })
});




customerOutstanding.get('/getCustomers', (req,res)=>{
const sql=`SELECT DISTINCT Cust_Code, Cust_name FROM magodmis.cust_data `;
//  const sql=`
// SELECT DISTINCT Cust_Code , Cust_Name FROM magodmis.draft_dc_inv_register `;
setupQueryMod(sql, (err, result)=>{
    if(err){
        console.log("err in query", err);
    }
    else{
    // console.log("cust sql query 500 change", result);
        return res.json({Result:result});
    }
})
})

customerOutstanding.get('/getDataBasedOnCustomer', (req,res)=>{
    const custcode=req.query.selectedCustCode;
   // console.log("cust_code backend 33333333333 ", custcode);
    const sql=`SELECT
    u.dc_Inv_No AS Id,
    @UnitName AS UnitName,
    u.*,
    u.GrandTotal - u.PymtAmtRecd AS Balance,
    DATEDIFF(CURRENT_DATE(), u.inv_date) AS duedays
FROM magodmis.draft_dc_inv_register u
WHERE
    u.Cust_Code = '${custcode}'
    AND u.Inv_No IS NOT NULL
    AND u.dcstatus NOT LIKE 'Closed';`;

    const sql2=`SELECT
    u.dc_Inv_No AS Id,
    @UnitName AS UnitName,
    u.*,
    u.GrandTotal - u.PymtAmtRecd AS Balance,
    DATEDIFF(CURRENT_DATE(), u.inv_date) AS duedays,
    DATE_FORMAT(DATE(u.DC_inv_Date), '%d-%m-%Y') AS Formatted_DC_inv_Date,
    DATE_FORMAT(DATE(u.OrderDate), '%d-%m-%Y') AS Formatted_OrderDate,
    DATE_FORMAT(DATE(u.DC_Date), '%d-%m-%Y') AS Formatted_DC_Date,
    DATE_FORMAT(DATE(u.Inv_Date), '%d-%m-%Y') AS Formatted_Inv_Date,
    DATE_FORMAT(DATE(u.PaymentDate), '%d-%m-%Y') AS Formatted_PaymentDate,
    DATE_FORMAT(DATE(u.DespatchDate), '%d-%m-%Y') AS Formatted_DespatchDate,
    DATE_FORMAT(DATE(u.PO_Date), '%d-%m-%Y') AS Formatted_PO_Date,
    DATE_FORMAT(DATE(u.DespatchTime), '%d-%m-%Y') AS Formatted_DespatchTime,
    (SELECT SUM(GrandTotal) FROM magodmis.draft_dc_inv_register WHERE Cust_Code = '${custcode}' AND Inv_No IS NOT NULL AND dcstatus NOT LIKE 'Closed') AS Amount_Due
FROM magodmis.draft_dc_inv_register u
WHERE
    u.Cust_Code = '${custcode}'
    AND u.Inv_No IS NOT NULL
    AND u.dcstatus NOT LIKE 'Closed';

`
    
    setupQueryMod(sql2, (err, result)=>{
        if(err){
            console.log("err in query", err);
        }
        else{
        //  console.log("cust code result", result);
            return res.json({Result:result});
        }
    })
    })


    customerOutstanding.get('/getDataTable2', (req,res)=>{
        const DC_Inv_No=req.query.selectedDCInvNo;
        console.log("DC_INV_NO", DC_Inv_No);
        const sql=`SELECT CONCAT('HO/', h1.HORef) AS VrRef, h.Receive_Now, h1.TxnType, h1.Status AS VrStatus
        FROM magodmis.ho_paymentrv_details h
        JOIN magodmis.ho_paymentrv_register h1 ON h.HOPrvId = h1.HOPrvId
        WHERE h.Dc_inv_no = '${DC_Inv_No}'
        UNION
        SELECT u1.Recd_PVNo AS VrRef, u.Receive_Now, u1.TxnType, u1.ReceiptStatus AS VrStatus
        FROM magodmis.payment_recd_voucher_details u
        JOIN magodmis.payment_recd_voucher_register u1 ON u1.RecdPVID = u.RecdPVID
        WHERE u.Dc_inv_no = '${DC_Inv_No}';
        `;
        
        setupQueryMod(sql, (err, result)=>{
            if(err){
                console.log("err in query", err);
            }
            else{
            //  console.log("DC_Inv_no result", result);
                return res.json({Result:result});
            }
        })
        })

module.exports = customerOutstanding;