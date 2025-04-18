const dailyReportRouter = require("express").Router();
const { dailyReportQuery, setupQuery } = require("../../../helpers/dbconn");
var bodyParser = require("body-parser");

//payment receipt voucher List

dailyReportRouter.post("/dailyReportdata", async (req, res, next) => {
  const date = req.body.date;
  try {
    dailyReportQuery(
      `SELECT p.*,p.RecdPVID as Unit_UId,p.Sync_HOId  as UpDated,DATE_FORMAT(p.Recd_PV_Date, "%d/%m/%Y") as date,
      m.UnitName FROM magodmis.payment_recd_voucher_register p, magod_setup.magodlaser_units m  
      WHERE(p.Recd_PV_Date = '${date}' And p.Recd_PVNo <> 'Draft') AND m.Current
      ORDER by p.recd_pvno;`,
      (err, data) => {
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});

//payment voucher details

dailyReportRouter.post("/paymentVoucherDetails", async (req, res, next) => {
  const date = req.body.date;
  const id = req.body.id;
  try {
    dailyReportQuery(
      `SELECT p.* ,  m.UnitName,p.PVSrlID  as Unit_UId,p.Sync_HOId  as UpDated, DATE_FORMAT(p.Inv_date, "%d/%m/%Y") as date  
      FROM magodmis.payment_recd_voucher_details p, magodmis.payment_recd_voucher_register r, magod_setup.magodlaser_units m
      where(r.recd_pv_date ='${date}' And r.Recd_PVNo <> 'Draft' And p.RecdPVID = '${id}') 
      and p.dc_inv_no <> 0    and p.receive_now>0      AND r.RecdPVID=p.RecdPVID  AND m.Current;`,
      (err, data) => {
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});

//Ho details

dailyReportRouter.post("/hoReceiptDetails", async (req, res, next) => {
  const date = req.body.date;
  try {
    dailyReportQuery(
      `SELECT * FROM magodmis.ho_paymentrv_details
      WHERE Inv_date='${date}';`,
      (err, data) => {
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});

//Ho receipt

dailyReportRouter.post("/hoReceipt", async (req, res, next) => {
  const date = req.body.date;
  try {
    dailyReportQuery(
      `SELECT * FROM magodmis.payment_recd_voucher_register
      WHERE Recd_PV_Date = '${date}';
      ;`,
      (err, data) => {
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});

//Tax Summary

dailyReportRouter.post("/taxSummary", async (req, res, next) => {
  const date = req.body.date;
  try {
    dailyReportQuery(
      `SELECT d1.DC_InvType AS InvoiceType,IF( d1.TaxAmount>0,1,0) AS WithTax, d.Tax_Name AS TaxName,
      d.TaxPercent AS TaxPercent,SUM(d.TaxableAmount) AS  TaxableAmount,  IF( SUM(d.TaxAmt) IS NULL,0, SUM(d.TaxAmt)) AS TaxAmount, SUM(d1.Net_Total) AS InvoiceValue 
      FROM magodmis.draft_dc_inv_register d1 LEFT JOIN magodmis.dc_inv_taxtable d 
      ON d.Dc_inv_No=d1.Dc_inv_No WHERE d1.Inv_Date='${date}'
      GROUP BY d1.DC_InvType,WithTax, d.Tax_Name, d.TaxPercent;`,
      (err, data) => {
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});

//production summary

dailyReportRouter.post("/productionSummary", async (req, res, next) => {
  const date = req.body.date;
  try {
    dailyReportQuery(
      `SELECT d1.DC_InvType as InvoiceType,if( d1.TaxAmount >0,1,0) as WithTax, d1.ExNotNo as Ex_Not_no,
      d.Material, d.Excise_CL_no,Sum( d.TotQty) as TotalQty, sum(d.TotAmount) as TotalValue,
      sum(d.SrlWt) as TotalWeight FROM magodmis.draft_dc_inv_register d1 left join magodmis.dc_inv_summary d 
      ON d.Dc_inv_No=d1.Dc_inv_No WHERE d1.Inv_Date= '${date}'
      GROUP BY d1.DC_InvType,WithTax,d1.ExNotNo, d.Material, d.Excise_CL_no;`,
      (err, data) => {
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});

//sales invoice 1st table

dailyReportRouter.post("/salesInvoice", async (req, res, next) => {
  const date = req.body.date;
  try {
    dailyReportQuery(
      `SELECT d.*, m.UnitName,d.Dc_Inv_No as Unit_UId,d.Sync_HOId  as UpDated, DATE_FORMAT(d.Dc_inv_Date, "%d/%m/%Y") as date,
      SUM(d1.JW_Rate*d1.Qty) as JwValue , Sum(d1.Mtrl_rate*d1.Qty) as MaterialValue
      FROM magodmis.draft_dc_inv_register d, magod_setup.magodlaser_units m,magodmis.draft_dc_inv_details d1
      WHERE m.Current AND  d.Dc_Inv_No= d1.Dc_Inv_No AND d.Inv_Date='${date}' GROUP BY  m.UnitName, d.Dc_Inv_No ORDER BY d.Inv_no;`,
      (err, data) => {
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});

//Sales Invoice 2nd table

dailyReportRouter.post("/salesInvoiceDetails", async (req, res, next) => {
  const date = req.body.date;
  const id = req.body.id;
  // console.log("idddd", id);
  // console.log("date", date);

  try {
    dailyReportQuery(
      `SELECT IF(d.DC_InvType='Job Work' AND d.taxamount>0, 'Excise Job Work', d.dc_invtype) AS InvType, 
      t.dc_invTaxId, t.Dc_inv_No, t.DcTaxID, t.Tax_Name, t.TaxableAmount, t.TaxPercent, t.TaxAmt, t1.AcctHead, m.UnitName, t.dc_invTaxId AS Unit_UId, t.Sync_HOId AS UpDated 
      FROM magodmis.draft_dc_inv_register d 
      JOIN magodmis.dc_inv_taxtable t ON d.DC_Inv_No = t.Dc_inv_No
      JOIN magodmis.taxdb t1 ON t.TaxID = t1.TaxID 
      JOIN magod_setup.magodlaser_units m ON d.Cust_Place = m.Place 
      WHERE d.Inv_Date='${date}' AND d.DC_Inv_No='${id}' AND m.Current;`,
      (err, data) => {
        // console.log("data", data)
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});

//Clearance Summary Details

dailyReportRouter.post("/clearanceDetails", async (req, res, next) => {
  const date = req.body.date;
  const id = req.body.id;

  try {
    dailyReportQuery(
      `SELECT d1.*, d1.Id AS Unit_UId, m.UnitName, d1.Sync_HOId AS UpDated
  FROM magodmis.draft_dc_inv_register d
  JOIN magodmis.dc_inv_summary d1 ON d.DC_Inv_No = d1.DC_Inv_No
  JOIN magod_setup.magodlaser_units m ON d.Cust_Place = m.Place
  WHERE d.Inv_No IS NOT NULL AND d.Inv_No NOT LIKE 'c%' AND d.Inv_Date = '${date}'
  AND d.DC_Inv_No = '${id}' AND m.Current;`,
      (err, data) => {
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});

//Report Summary

dailyReportRouter.post("/receiptReportSummary", async (req, res, next) => {
  const date = req.body.date;
  try {
    dailyReportQuery(
      `SELECT
      TxnType,
      COUNT(*)  AS receiptCount,
      SUM(Amount) AS Total
  FROM
      magodmis.payment_recd_voucher_register
      WHERE Recd_PV_Date = '${date}'
  
  GROUP BY
      TxnType;`,
      (err, data) => {
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});

//Report Summary Receipt table

dailyReportRouter.post("/reportSummary", async (req, res, next) => {
  const date = req.body.date;
  try {
    dailyReportQuery(
      `SELECT CASE 
      WHEN DC_InvType = 'Service' THEN 'Service'
      WHEN DC_InvType = 'Combined' THEN 'Combined'
      ELSE 'Excise'
        END AS  InvType, COUNT(*) AS invCount, SUM(GrandTotal) AS Total
        FROM magodmis.draft_dc_inv_register
        WHERE DCStatus <> 'Cancelled' AND Inv_Date = '${date}'
        GROUP BY InvType ORDER BY InvType DESC;`,
      (err, data) => {
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});

//Report summary second table

// dailyReportRouter.post('/reportTaxDetails', async (req, res, next) => {
//     const date = req.body.date
//   try {
//       dailyReportQuery(`SELECT
//       'Receipt' AS Column1,
//       TxnType,
//       COUNT(*)  AS receiptCount,
//       SUM(Amount) AS Total
//   FROM
//       magodmis.payment_recd_voucher_register
//       WHERE Recd_PV_Date = '${date}'

//   GROUP BY
//       TxnType;`, (err,data) => {
//           res.send(data)
//       })
//   } catch (error) {
//       next(error)
//   }
// });

dailyReportRouter.post("/reportTaxDetails", async (req, res, next) => {
  const date = req.body.date;
  try {
    dailyReportQuery(
      `SELECT 
      TxnType,  
      Recd_PVNO,
      Amount
  FROM 
      magodmis.payment_recd_voucher_register
  WHERE Recd_PV_Date = '${date}';`,
      (err, data) => {
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});

//Report sumary job work second table

dailyReportRouter.post("/reportSummaryDetails", async (req, res, next) => {
  const date = req.body.date;
  try {
    dailyReportQuery(
      `SELECT
      'Invoice' AS col1,
      DC_InvType AS invoice_type,
      COUNT(*) AS count_no,
      SUM(GrandTotal) AS total,
      SUM(Net_Total) AS net,
      SUM(TaxAmount) AS tax
     -- SUM(JwValue) AS col8,
     -- SUM(MaterialValue) AS col9
  FROM
     magodmis.draft_dc_inv_register
  WHERE Inv_Date = '${date}'   
  GROUP BY
      DC_InvType ORDER BY Dc_InvType DESC;`,
      (err, data) => {
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});

//Report Summary Expand table

dailyReportRouter.post("/reportSummaryExpand", async (req, res, next) => {
  const date = req.body.date;
  const getData = req.body.getData;
  console.log("getData", getData);
  try {
    dailyReportQuery(
      `SELECT
      Inv_No,
      DC_InvType, 
      GrandTotal
  FROM
     magodmis.draft_dc_inv_register
  WHERE 
      Inv_Date = '${date}' AND  
      DC_InvType IN ('${getData}');`,
      (err, data) => {
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});

//Report summary second Expand table

dailyReportRouter.post("/reportSummaryTaxExpand", async (req, res, next) => {
  const date = req.body.date;
  try {
    dailyReportQuery(
      `SELECT
      Recd_PVNo,
      Amount
  FROM
      magodmis.payment_recd_voucher_register
      WHERE Recd_PV_Date = '${date}'  AND  TxnType IN ('Cash');`,
      (err, data) => {
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});

module.exports = dailyReportRouter;
