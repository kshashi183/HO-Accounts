const monthlyReportRouter = require("express").Router();
const { hqQuery } = require("../../../helpers/dbconn");
var bodyParser = require("body-parser");

//Cust Names
monthlyReportRouter.post("/custNames", async (req, res, next) => {
  const date = req.body.date;
  try {
    hqQuery(
      `SELECT DISTINCT UnitName FROM magod_hq_mis.unit_cust_data;`,
      (err, data) => {
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});

//Invoice Summary
monthlyReportRouter.post("/monthlyInvoiceSummary", async (req, res, next) => {
  const name = req.body.getName;
  const month = req.body.month;
  const year = req.body.year;
  try {
    hqQuery(
      `SELECT A.InvoiceType, A.WithTax, A.GrandTotal, A.Round_Off, A.InvTotal, A.TaxAmount, A.Discount, A.PymtAmtRecd,
        A.Del_Chg, A.TptCharges, B.ValueAdded, B.MaterialValue
 FROM
   (SELECT d.DC_InvType AS InvoiceType,
           IF(d.TaxAmount > 0, 1, 0) AS WithTax,
           SUM(d.GrandTotal) AS GrandTotal,
           SUM(PymtAmtRecd) AS PymtAmtRecd,
           IF(c.IsBranch <> 0, 'Branch', '') AS BranchSale,
           SUM(d.Round_Off) AS Round_Off,
           SUM(d.Net_Total) AS InvTotal,
           SUM(d.TaxAmount) AS TaxAmount,
           SUM(d.Discount) AS Discount,
           SUM(d.Del_Chg) AS Del_Chg,
           SUM(d.TptCharges) AS TptCharges
    FROM magod_hq_mis.unit_invoices_list d, magod_hq_mis.unit_cust_data c
    WHERE d.DCStatus NOT LIKE 'Cancelled'
      AND d.Inv_No IS NOT NULL
      AND d.UnitName = '${name}'
      AND c.Cust_Code = d.Cust_Code
      AND c.UnitName = '${name}'
      AND YEAR(d.Inv_Date) = '${year}'
      AND MONTH(d.Inv_Date) = '${month}'
    GROUP BY InvoiceType, WithTax, BranchSale) AS A,
   (SELECT d.DC_InvType AS InvoiceType,
           IF(d.TaxAmount > 0, 1, 0) AS WithTax,
           IF(c.IsBranch <> 0, 'Branch', '') AS BranchSale,
           SUM(d1.Mtrl_Amount) AS MaterialValue,
           SUM(d1.Jw_Amount) AS ValueAdded
    FROM magod_hq_mis.unit_invoices_list d, magod_hq_mis.unit_inv_summary d1, magod_hq_mis.unit_cust_data c
    WHERE d.DCStatus NOT LIKE 'Cancelled'
      AND d.Inv_No IS NOT NULL
      AND d.UnitName = '${name}'
      AND YEAR(d.Inv_Date) = '${year}'
      AND MONTH(d.Inv_Date) = '${month}'
      AND c.Cust_Code = d.Cust_Code
      AND c.UnitName = '${name}'
      AND d1.DC_Inv_No = d.DC_Inv_No
    GROUP BY InvoiceType, WithTax, BranchSale) AS B
 WHERE A.InvoiceType = B.InvoiceType
   AND A.WithTax = B.WithTax
   AND A.BranchSale = B.BranchSale;`,
      (err, data) => {
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});

//Tax Summary
monthlyReportRouter.post("/monthlyTaxSummary", async (req, res, next) => {
  const name = req.body.getName;
  const month = req.body.month;
  const year = req.body.year;
  try {
    hqQuery(
      `SELECT
      d.DC_InvType AS InvoiceType,
      u.Tax_Name AS TaxName,
      SUM(u.TaxableAmount) AS TaxableAmount,
      u.TaxPercent,
      SUM(u.TaxAmt) AS TaxAmount
  FROM
      magod_hq_mis.unit_inv_taxtable u
  INNER JOIN
      magod_hq_mis.unit_invoices_list d ON u.UnitName = d.UnitName AND u.Dc_inv_No = d.DC_Inv_No
  WHERE
      d.DCStatus NOT LIKE 'Cancelled'
      AND d.Inv_No IS NOT NULL
      AND d.UnitName = '${name}'
      AND YEAR(d.Inv_Date) = '${year}'
      AND MONTH(d.Inv_Date) = '${month}'
  GROUP BY
      u.Tax_Name,
      u.TaxPercent,
      InvoiceType
  ORDER BY
      InvoiceType,
      u.Tax_Name,
      u.TaxPercent;`,
      (err, data) => {
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});

//Clearance Summary
monthlyReportRouter.post("/monthlyClearanceSummary", async (req, res, next) => {
  const name = req.body.getName;
  const month = req.body.month;
  const year = req.body.year;
  try {
    hqQuery(
      `SELECT
    d.DC_InvType AS InvoiceType,
    IF(d.TaxAmount > 0, 1, 0) AS WithTax,
    u.Material,
    u.Excise_CL_no,
    SUM(u.TotQty) AS TotalQty,
    SUM(u.TotAmount) AS TotalValue,
    d.ExNotNo AS Ex_Not_No,
    SUM(u.SrlWt) AS TotalWeight
FROM
    magod_hq_mis.unit_invoices_list d
LEFT JOIN
    magod_hq_mis.unit_inv_summary u ON u.UnitName = d.UnitName AND d.DC_Inv_No = u.DC_Inv_No
WHERE
    d.DCStatus NOT LIKE 'Cancelled'
    AND d.Inv_No IS NOT NULL
    AND d.UnitName = '${name}'
    AND YEAR(d.Inv_Date) = '${year}'
    AND MONTH(d.Inv_Date) = '${month}'
GROUP BY
    InvoiceType,
    WithTax,
    u.Material,
    u.Excise_CL_no,
    d.ExNotNo;`,
      (err, data) => {
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});

//Collection Summary
monthlyReportRouter.post(
  "/monthlyCollectionSummary",
  async (req, res, next) => {
    const name = req.body.getName;
    const month = req.body.month;
    const year = req.body.year;
    try {
      hqQuery(
        `SELECT UnitName, TxnType, SUM(Amount) AS Amount
      FROM (
          SELECT UnitName, TxnType, Amount
          FROM magod_hq_mis.unit_payment_recd_voucher_register
          WHERE UnitName = '${name}' AND YEAR(Recd_PV_Date) = '${year}' AND MONTH(Recd_PV_Date) = '${month}'
          UNION ALL
          SELECT UnitName, TxnType, Amount
          FROM magod_hq_mis.ho_paymentrv_register
          WHERE UnitName = '${name}' AND YEAR(horefdate) = '${year}' AND MONTH(horefdate) = '${month}'
      ) AS CombinedData
      GROUP BY UnitName, TxnType;`,
        (err, data) => {
          res.send(data);
        }
      );
    } catch (error) {
      next(error);
    }
  }
);

//Customer Value Addition
monthlyReportRouter.post("/monthlyCutomerAddition", async (req, res, next) => {
  const name = req.body.getName;
  const month = req.body.month;
  const year = req.body.year;
  try {
    hqQuery(
      `SELECT
      UnitName,
      Cust_Code,
      Cust_Name,
      SUM(totalBilling) AS totalBilling,
      SUM(AmountReceived) AS AmountReceived,
      SUM(ValueAdded) AS ValueAdded,
      SUM(MaterialValue) AS MaterialValue
  FROM (
      SELECT
          d.UnitName,
          d.Cust_Code,
          d.Cust_Name,
          SUM(d.GrandTotal) AS totalBilling,
          SUM(PymtAmtRecd) AS AmountReceived,
          0 AS ValueAdded,
          0 AS MaterialValue
      FROM magod_hq_mis.unit_invoices_list d
      WHERE d.DCStatus NOT LIKE 'Cancelled'
          AND d.Inv_No IS NOT NULL
          AND YEAR(d.Inv_Date) = '${year}'
          AND MONTH(d.Inv_Date) = '${month}'
          AND d.UnitName = '${name}'
      GROUP BY d.UnitName, d.Cust_Code, d.Cust_Name
      UNION ALL
      SELECT
          d.UnitName,
          'Nil' AS Cust_Code,
          'Others' AS Cust_Name,
          0 AS totalBilling,
          0 AS AmountReceived,
          SUM(d1.Jw_Amount) AS ValueAdded,
          SUM(d1.Mtrl_Amount) AS MaterialValue
      FROM magod_hq_mis.unit_invoices_list d
      JOIN magod_hq_mis.unit_inv_summary d1 ON d1.DC_Inv_No = d.DC_Inv_No AND d1.UnitName = d.Unitname
      WHERE d.DCStatus NOT LIKE 'Cancelled'
          AND d.Inv_No IS NOT NULL
          AND YEAR(d.Inv_Date) = '${year}'
          AND MONTH(d.Inv_Date) = '${month}'
          AND d.UnitName = '${name}'
      GROUP BY d.UnitName
  ) AS subquery
  GROUP BY UnitName, Cust_Code, Cust_Name
  ORDER BY ValueAdded DESC;`,
      (err, data) => {
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});

//All OutStanding Bills
monthlyReportRouter.post("/allOutStandingBills", async (req, res, next) => {
  const month = req.body.month;
  const year = req.body.year;
  try {
    hqQuery(
      `SELECT
      @UnitName AS UnitName,
      SUM(d.GrandTotal) AS totalBilling,
      SUM(d.PymtAmtRecd) AS AmountReceived,
      d.Cust_Code,
      d.Cust_Name,
      SUM(d.GrandTotal - d.PymtAmtRecd) AS Outstanding
  FROM
      magod_hq_mis.unit_invoices_list d
  WHERE
      YEAR(d.Inv_Date) = '${year}'
      AND MONTH(d.Inv_Date) = '${month}'
  GROUP BY
      d.Cust_Code, d.Cust_Name
  HAVING
      totalBilling > AmountReceived
  ORDER BY
      Outstanding DESC;`,
      (err, data) => {
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});

//Sales OutStanding Bills
monthlyReportRouter.post("/salesOutStandingBills", async (req, res, next) => {
  const month = req.body.month;
  const year = req.body.year;
  try {
    hqQuery(
      `SELECT
      @UnitName AS UnitName,
      SUM(d.GrandTotal) AS totalBilling,
      SUM(d.PymtAmtRecd) AS AmountReceived,
      d.Cust_Code,
      d.Cust_Name,
      SUM(d.GrandTotal - d.PymtAmtRecd) AS Outstanding
  FROM
      magod_hq_mis.unit_invoices_list d
  WHERE
      YEAR(d.Inv_Date) = '${year}'
      AND MONTH(d.Inv_Date) = '${month}'
      AND d.DC_InvType = 'Sales'
  GROUP BY
      d.Cust_Code, d.Cust_Name
  HAVING
      totalBilling > AmountReceived
  ORDER BY
      Outstanding DESC;`,
      (err, data) => {
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});

module.exports = monthlyReportRouter;
