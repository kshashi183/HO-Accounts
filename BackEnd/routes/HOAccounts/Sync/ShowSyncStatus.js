const showSyncRouter = require("express").Router();
const { hqQuery, setupQuery } = require("../../../helpers/dbconn");
var bodyParser = require("body-parser");

//Magod Unit names
showSyncRouter.get("/hoUnitNames", async (req, res, next) => {
  try {
    setupQuery(
      `SELECT DISTINCT UnitName FROM magod_setup.magodlaser_units;`,
      (err, data) => {
      //  console.log("unit name show sync status", data);
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});


// common updateUnitInvoicePaymentStatus
showSyncRouter.put("/updateHOInvoicePaymentStatus/:getName",async (req, res, next) => {
  const getName = req.params.getName;
 // console.log("updateUnitInvoicePaymentStatus1111", getName);

  const unit='Jigani';
    try {
      hqQuery(
        `
        UPDATE magod_hq_mis.unit_invoices_list d
        JOIN (
            SELECT
                b.UnitName,
                b.\`DC_Inv_No\`,
                COALESCE(SUM(b.\`Receive_Now\`), 0) AS Receive_Now
            FROM (
                SELECT
                    d.UnitName,
                    d.\`DC_Inv_No\`,
                    SUM(h.\`Receive_Now\`) AS Receive_Now,
                    d.\`PymtAmtRecd\`,
                    d.\`DCStatus\`
                FROM
                    magod_hq_mis.ho_paymentrv_details h USE INDEX(Index_UnitDcId),
                    magod_hq_mis.ho_paymentrv_register h1,
                    magod_hq_mis.unit_invoices_list d USE INDEX(Index_UnitDcId)
                WHERE
                    h1.\`HOPrvId\` = h.\`HOPrvId\`
                    AND NOT (h1.\`Status\` = 'Cancelled' OR h1.\`Status\` = 'Draft')
                    AND d.\`DC_Inv_No\` = h.\`Dc_inv_no\`
                    AND d.\`UnitName\` = h.\`UnitName\`
                    AND d.UnitName = '${getName}'
                    AND (d.\`DCStatus\` LIKE 'Despatched' OR d.\`DCStatus\` LIKE 'OverPaid')
                GROUP BY d.\`DC_Inv_No\`
    
                UNION ALL
    
                SELECT
                    d.UnitName,
                    d.\`DC_Inv_No\`,
                    SUM(h.\`Receive_Now\`) AS Receive_Now,
                    d.\`PymtAmtRecd\`,
                    d.\`DCStatus\`
                FROM
                    magod_hq_mis.unit_payment_recd_voucher_details h USE INDEX(Index_UnitDcId),
                    magod_hq_mis.unit_payment_recd_voucher_register h1,
                    magod_hq_mis.unit_invoices_list d USE INDEX(Index_UnitDcId)
                WHERE
                    h1.\`Id\` = h.\`PvrId\`
                    AND NOT (h1.\`PRV_Status\` = 'Cancelled' OR h1.\`PRV_Status\` = 'Draft')
                    AND d.\`DC_Inv_No\` = h.\`Dc_inv_no\`
                    AND d.\`UnitName\` = h.\`UnitName\`
                    AND d.UnitName = '${getName}'
                    AND (d.\`DCStatus\` LIKE 'Despatched' OR d.\`DCStatus\` LIKE 'OverPaid')
                GROUP BY d.\`DC_Inv_No\`
            ) AS b
            GROUP BY b.DC_Inv_No, b.UnitName
            ORDER BY b.DC_Inv_No
        ) AS a ON d.Dc_Inv_No = a.Dc_Inv_No AND d.UnitName = a.UnitName
        SET
            d.PymtAmtRecd = a.Receive_Now,
            d.DcStatus = CASE
                WHEN d.GrandTotal = a.Receive_Now THEN 'Closed'
                WHEN d.GrandTotal < a.Receive_Now THEN 'OverPaid'
                ELSE 'Despatched'
            END;
      `,
        (err, data) => {
          res.send(data);
        }
      );
    } catch (error) {
      next(error);
    }
  }
);

//getHoOpenInvAndReceipts
showSyncRouter.get(
  "/getHoOpenInvAndReceipts/:getName",
  async (req, res, next) => {
     const getName = req.params.getName;
    // console.log("getHoOpenInvAndReceipts2222", getName);
   

    const responseData = [];
    try {
      const cmdHoInvList = await hqQuery(
        `SELECT u.*
        FROM magod_hq_mis.unit_invoices_list u
        WHERE u.UnitName = '${getName}' AND NOT (u.DCStatus = 'Closed' OR u.DCStatus = 'Cancelled');
        `
      );

      const cmdHoInvPaymentVrList = await hqQuery(
        `SELECT
        u.UnitName,
        u.DC_Inv_No,
        u1.Receive_Now,
        u2.Recd_PVNo AS VoucherNo,
        u2.TxnType,
        u2.PRV_Status AS VoucherStatus
    FROM
        magod_hq_mis.unit_invoices_list u
        JOIN magod_hq_mis.unit_payment_recd_voucher_details u1 ON u1.Dc_inv_no = u.DC_Inv_No AND u1.Unitname = u.UnitName
        JOIN magod_hq_mis.unit_payment_recd_voucher_register u2 ON u2.Id = u1.PvrId
    WHERE
        u.UnitName = '${getName}' AND NOT (u.DCStatus LIKE 'Closed' OR u.DCStatus LIKE 'Cancelled')
    
    UNION ALL
    
    SELECT
        u.UnitName,
        u.DC_Inv_No,
        u1.Receive_Now,
        u2.HORef AS VoucherNo,
        u2.TxnType,
        u2.Status AS VoucherStatus
    FROM
        magod_hq_mis.unit_invoices_list u
        JOIN magod_hq_mis.ho_paymentrv_details u1 ON u1.Dc_inv_no = u.DC_Inv_No AND u1.Unitname = u.UnitName
        JOIN magod_hq_mis.ho_paymentrv_register u2 ON u2.HOPrvId = u1.HOPrvId
    WHERE
        u.UnitName = '${getName}' AND NOT (u.DCStatus LIKE 'Closed' OR u.DCStatus LIKE 'Cancelled');`
      );

      responseData.push({
        cmdHoInvList: cmdHoInvList,
        cmdHoInvPaymentVrList: cmdHoInvPaymentVrList,
      });
      // console.log("HO DATA", responseData);

      res.send(responseData);
    } catch (error) {
      next(error);
    }
  }
);






//getUnitOpenInvAndReceipts
showSyncRouter.get( "/getUnitOpenInvAndReceipts/:getName", async (req, res, next) => {
    const getName = req.params.getName;
 //   console.log("getUnitOpenInvAndReceipts333", getName);

    
    const responseData = [];
    try {
      const cmdInvList = await hqQuery(
        `SELECT '${getName}' AS unitName,d.*, d.Dc_Inv_No AS Unit_Uid FROM magodmis.draft_dc_inv_register d
          WHERE d.Inv_No IS NOT NULL  AND NOT (d.DCStatus='Closed' OR d.DCStatus='Cancelled') AND NOT d.IsDC;`
      );

      const cmdInvPaymentVrList = await hqQuery(
        `SELECT
            '${getName}' AS unitName,
            d.dc_inv_no,
            p.Receive_Now,
            p1.Recd_PVNo AS VoucherNo,
            p1.ReceiptStatus AS VoucherStatus,
            TxnType
        FROM
            magodmis.draft_dc_inv_register d
        JOIN
            magodmis.payment_recd_voucher_details p ON p.Dc_Inv_no = d.dc_Inv_no
        JOIN
            magodmis.payment_recd_voucher_register p1 ON p1.RecdPVID = p.RecdPVID
        WHERE
            d.Inv_No IS NOT NULL
            AND NOT (d.DCStatus = 'Closed' OR d.DCStatus = 'Cancelled')
            AND NOT d.IsDC
            AND p1.ReceiptStatus <> 'Draft'
        
        UNION ALL
        
        SELECT
            '${getName}' AS unitName,
            d.dc_inv_no,
            p.Receive_Now,
            p1.HORef AS VoucherNo,
            p1.Status AS VoucherStatus,
            TxnType
        FROM
            magodmis.draft_dc_inv_register d
        JOIN
            magodmis.ho_paymentrv_details p ON p.Dc_Inv_no = d.dc_Inv_no
        JOIN
            magodmis.ho_paymentrv_register p1 ON p1.Id = p.UnitID
        WHERE
            d.Inv_No IS NOT NULL
            AND NOT (d.DCStatus = 'Closed' OR d.DCStatus = 'Cancelled')
            AND NOT d.IsDC;`
      );

      responseData.push({
        cmdInvList: cmdInvList,
        cmdInvPaymentVrList: cmdInvPaymentVrList,
      });

      // for (let i = 0; i < responseData.length; i++) {
      //   const cmdInvPaymentVrList = responseData[i].cmdInvPaymentVrList;
      //   console.log("cmdInvPaymentVrList:", cmdInvPaymentVrList);


      // }

      //console.log("respond data show sync", responseData);

      res.send(responseData);
    } catch (error) {
      next(error);
    }
  }
);



showSyncRouter.put(
  "/updateUnmatchedRowsOfUnit",
  async (req, res, next) => {
    const { getName, dcInvNo } = req.body;
   

    // console.log("44444444444",getName, 'and', dcInvNo);

    try {
      hqQuery(
        `UPDATE magod_hq_mis.unit_invoices_list d
        JOIN (
            SELECT
                CASE
                    WHEN SUM(a.Receive_Now) IS NULL THEN 0
                    ELSE SUM(a.Receive_Now)
                END AS Receive_now
            FROM (
                SELECT p.Receive_Now, p1.Recd_PvNo AS VrNo
                FROM magod_hq_mis.unit_payment_recd_voucher_details p
                JOIN magod_hq_mis.unit_payment_recd_voucher_register p1 ON p1.RecdPVID = p.RecdPVID
                WHERE p1.Unitname = '${getName}' AND p.Dc_inv_no = '${dcInvNo}'
                    AND NOT (p1.PRV_Status LIKE 'Cancelled' OR p1.PRV_Status LIKE 'Draft')
                UNION
                SELECT p.Receive_Now, p1.HORef AS VrNo
                FROM magod_hq_mis.ho_paymentrv_details p
                JOIN magod_hq_mis.ho_paymentrv_register p1 ON p1.HOPrvId = p.HOPrvId
                WHERE p1.Unitname = '${getName}' AND p.Dc_inv_no = '${dcInvNo}'
                    AND NOT (p1.Status LIKE 'Cancelled' OR p1.Status LIKE 'Draft')
            ) AS A
        ) AS B ON 1=1
        SET
            d.PymtAmtRecd = B.Receive_now,
            d.DCStatus = CASE
                WHEN d.grandTotal - B.Receive_now = 0 THEN 'Closed'
                WHEN d.grandTotal - B.Receive_now > 0 THEN 'Despatched'
                ELSE 'OverPaid'
            END
        WHERE
            d.Unitname = '${getName}' AND d.Dc_inv_no = '${dcInvNo}';
        `,
        (err, data) => {
          res.send(data);
        }
      );
    } catch (error) {
      next(error);
    }
  }
);


showSyncRouter.put(
  "/updateUnmatchedRowsOfHO/",
  async (req, res, next) => {
    const dcInvNo = req.body.dcInvNo;

    // console.log("and", dcInvNo);
    const sql= `UPDATE magodmis.draft_dc_inv_register d
    JOIN (
        SELECT
            CASE
                WHEN SUM(a.Receive_Now) IS NULL THEN 0
                ELSE SUM(a.Receive_Now)
            END AS Receive_now
        FROM (
            SELECT p.Receive_Now
            FROM magodmis.payment_recd_voucher_details p
            JOIN magodmis.payment_recd_voucher_register p1 ON p1.RecdPVID = p.RecdPVID
            WHERE p.Dc_inv_no = '${dcInvNo}'
                AND NOT (p1.ReceiptStatus LIKE 'Cancelled' OR p1.ReceiptStatus LIKE 'Draft')
            UNION
            SELECT p.Receive_Now
            FROM magodmis.ho_paymentrv_details p
            JOIN magodmis.ho_paymentrv_register p1 ON p1.Id = p.HOPrvId
            WHERE p.Dc_inv_no = '${dcInvNo}'
                AND NOT (p1.Status LIKE 'Cancelled' OR p1.Status LIKE 'Draft')
        ) AS A
    ) AS B ON 1=1
    SET
        d.PymtAmtRecd = B.Receive_now,
        d.DCStatus = CASE
            WHEN d.grandTotal - B.Receive_now = 0 THEN 'Closed'
            WHEN d.grandTotal - B.Receive_now > 0 THEN 'Despatched'
            ELSE 'OverPaid'
        END
    WHERE d.Dc_inv_no = '${dcInvNo}';`

    try {
      hqQuery(sql
       ,
        (err, data) => {
          console.log("hq query ", sql);
          res.send(data);
        }
      );
    } catch (error) {
      next(error);
    }
  }
);


//Export Open invoices XML file
showSyncRouter.get(
  "/getUnitOpenInvAndReceiptsForExport/:getName",
  async (req, res, next) => {
   const getName = req.params.getName;
    //const getName = 'Jigani'
   // console.log("55555", getName);
    const responseData = [];
    try {
      const cmdInvList = await hqQuery(
      `SELECT '${getName}' AS unitName, u.*
      FROM magod_hq_mis.unit_invoices_list u
      WHERE u.UnitName ='${getName}'  AND NOT (u.DCStatus = 'Closed' OR u.DCStatus = 'Cancelled');
      `
      );

      const cmdInvPaymentVrList = await hqQuery(
       `SELECT u.UnitName, u.DC_Inv_No, u1.Receive_Now, u2.Recd_PVNo AS VoucherNo, 
       u2.TxnType, u2.PRV_Status AS VoucherStatus
FROM magod_hq_mis.unit_invoices_list u
JOIN magod_hq_mis.unit_payment_recd_voucher_details u1 ON u1.Dc_inv_no = u.DC_Inv_No
JOIN magod_hq_mis.unit_payment_recd_voucher_register u2 ON u1.PvrId = u2.Id
WHERE u.UnitName ='${getName}' AND NOT (u.DCStatus LIKE 'Closed' OR u.DCStatus LIKE 'Cancelled')

UNION ALL

SELECT u.UnitName, u.DC_Inv_No, u1.Receive_Now, u2.HORef AS VoucherNo, 
       u2.TxnType, u2.Status AS VoucherStatus
FROM magod_hq_mis.unit_invoices_list u
JOIN magod_hq_mis.ho_paymentrv_details u1 ON u1.Dc_inv_no = u.DC_Inv_No
JOIN magod_hq_mis.ho_paymentrv_register u2 ON u1.HOPrvId = u2.HOPrvId
WHERE u.UnitName = '${getName}' AND NOT (u.DCStatus LIKE 'Closed' OR u.DCStatus LIKE 'Cancelled');
`
      );
      responseData.push({
        cmdInvList: cmdInvList,
        cmdInvPaymentVrList: cmdInvPaymentVrList,
      });

   //   console.log("export data",responseData);
      res.send(responseData);
    } catch (error) {
      next(error);
    }
  }
);
module.exports = showSyncRouter;
