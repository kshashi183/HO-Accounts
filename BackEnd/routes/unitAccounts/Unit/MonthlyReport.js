const monthlyReportRouter = require("express").Router();
const { dailyReportQuery, setupQuery } = require("../../../helpers/dbconn");
var bodyParser = require("body-parser");

monthlyReportRouter.post('/monthlyTaxSummary', async (req, res, next) => {
    const month = req.body.month
    const year = req.body.year
  try {
      dailyReportQuery(`SELECT IF(d.DC_InvType='Job Work' AND d.taxamount>0,'Excise Job Work',d.dc_invtype) AS InvType,
      t.dc_invTaxId,t.Dc_inv_No, t.DcTaxID, t.Tax_Name, t.TaxableAmount,t.TaxPercent, t.TaxAmt,
      t1.AcctHead, m.UnitName,t.dc_invTaxId AS Unit_UId,t.Sync_HOId  AS UpDated 
      FROM magodmis.draft_dc_inv_register d , magodmis.dc_inv_taxtable t, magodmis.taxdb t1, magod_setup.magodlaser_units m  
       WHERE  d.DC_Inv_No=t.dc_inv_no AND t.TaxID=t1.TaxID AND m.Current 
       AND MONTH(d.Inv_Date)='${month}}'  AND YEAR(d.Inv_Date)='${year}';`, (err,data) => {
          res.send(data)
      })
  } catch (error) {
      next(error)
  }
});

monthlyReportRouter.post('/monthlyInvSummaryNames', async (req, res, next) => {
    const month = req.body.month
    const year = req.body.year
  try {
      dailyReportQuery(`SELECT DISTINCT Cust_Name FROM magodmis.draft_dc_inv_register;`, (err,data) => {
          res.send(data)
      })
  } catch (error) {
      next(error)
  }
});

monthlyReportRouter.post('/monthlyInvSummary', async (req, res, next) => {
    const month = req.body.month
    const year = req.body.year
    const name = req.body.getName
  try {
      dailyReportQuery(`SELECT d.*, IF(d.DC_InvType='Service','Service','Sales') AS InvType,m.UnitName,d.Dc_Inv_No AS Unit_UId,d.Sync_HOId  AS UpDated,
      SUM(d1.JW_Rate*d1.Qty) AS JwValue , SUM(d1.Mtrl_rate*d1.Qty) AS MaterialValue 
      FROM magodmis.draft_dc_inv_register d, magod_setup.magodlaser_units m,magodmis.draft_dc_inv_details d1
      WHERE m.Current AND  d.Inv_no IS NOT NULL AND  d.Dc_Inv_No= d1.Dc_Inv_No
      AND Cust_Name = '${name}'
      AND MONTH(d.Inv_Date)='${month}' 
      AND YEAR(d.Inv_Date)='${year}' GROUP BY d.Dc_Inv_No, m.UnitName ORDER BY d.Inv_no;`, (err,data) => {
          res.send(data)
      })
  } catch (error) {
      next(error)
  }
});

//AND Cust_Name = 'BHARAT ELECTRONICS LIMITED'

module.exports = monthlyReportRouter;