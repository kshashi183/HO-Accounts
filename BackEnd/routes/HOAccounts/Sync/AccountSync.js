const accountSyncRouter = require("express").Router();
const { hqQuery, setupQuery } = require("../../../helpers/dbconn");
var bodyParser = require("body-parser");

//Magod Unit names
accountSyncRouter.get("/hoUnitNames", async (req, res, next) => {
  try {
    setupQuery(
      `SELECT DISTINCT UnitName FROM magod_setup.magodlaser_units;`,
      (err, data) => {
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});

//HO Payment Vouchers
accountSyncRouter.get("/hoPaymentRvRegister", async (req, res, next) => {
    const selectedValue = req.query.selectedValue;
  try {
    hqQuery(
      `SELECT h.*, h.HOPrvId AS HO_Uid
        FROM magod_hq_mis.ho_paymentrv_register h
        WHERE h.Unit_UId = 0 AND h.UnitName = '${selectedValue}' AND h.Status NOT LIKE 'Draft';`,
      (err, data) => {
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});

accountSyncRouter.get("/hoPaymentRvDetails", async (req, res, next) => {
    const selectedValue = req.query.selectedValue;
  try {
    hqQuery(
      `SELECT h1.*, h1.Id AS HO_UId
      FROM magod_hq_mis.ho_paymentrv_register h
      JOIN magod_hq_mis.ho_paymentrv_details h1 ON h1.HOPrvId = h.HOPrvId
      WHERE h.Unit_UId = 0 AND h.Status NOT LIKE 'Draft' AND h.UnitName = '${selectedValue}';`,
      (err, data) => {
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});

//HO Vendor List
accountSyncRouter.get("/unitVendorData", async (req, res, next) => {
    const selectedValue = req.query.selectedValue;
  try {
    hqQuery(
      `SELECT u.*, u.Id AS Sync_HOId
        FROM magod_hq_mis.unit_vendor_list u
        WHERE u.Unit_Id = 0 AND u.UnitName = '${selectedValue}';
        `,
      (err, data) => {
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});

//HO Purchase Invoice List
accountSyncRouter.get("/unitPurchaseInvoiceList", async (req, res, next) => {
    const selectedValue = req.query.selectedValue;
  try {
    hqQuery(
      `SELECT u.*, u.PI_Id AS HO_SyncId
        FROM magod_hq_mis.unit_purchase_invoice_list u
        WHERE u.UnitName = '${selectedValue}' AND u.Unit_ID = 0 AND u.Purchase_Receipt_no NOT LIKE 'Draft';`,
      (err, data) => {
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});

accountSyncRouter.get("/unitPurchaseInvTaxes", async (req, res, next) => {
  const selectedValue = req.query.selectedValue;
  try {
    hqQuery(
      `SELECT u1.*, u1.PurInTaxID AS HO_Uid, u.Unit_ID AS Unit_Uid
        FROM magod_hq_mis.unit_purchase_invoice_list u
        JOIN magod_hq_mis.unit_purchase_inv_taxes u1 ON u1.PI_Id = u.PI_Id
        WHERE u.UnitName = '${selectedValue}' AND u.Unit_ID = 0 AND u.Purchase_Receipt_no NOT LIKE 'Draft';`,
      (err, data) => {
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});

//HO Purchase Invoice Payment Details List
accountSyncRouter.get("/unitPurInvPaymentVrList", async (req, res, next) => {
    const selectedValue = req.query.selectedValue;
  try {
    hqQuery(
      `SELECT u.*
        FROM magod_hq_mis.unit_pur_inv_payment_vrlist u
        WHERE u.Unit_Uid = 0 AND u.UnitName = '${selectedValue}' AND u.Status <> 'Draft';`,
      (err, data) => {
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});

accountSyncRouter.get("/unitPurPaymentDetails", async (req, res, next) => {
    const selectedValue = req.query.selectedValue;
  try {
    hqQuery(
      `SELECT u1.*
        FROM magod_hq_mis.unit_pur_payment_details u1
        JOIN magod_hq_mis.unit_pur_inv_payment_vrlist u ON u1.PVId = u.VrId
        WHERE u.Unit_Uid = 0 AND u.UnitName = '${selectedValue}' AND u.Status <> 'Draft' AND u1.PVId=u.VrId;`,
      (err, data) => {
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});

//HO Cancelled Voucher Not yet Synced with Unit
accountSyncRouter.get("/canceledVouchersList", async (req, res, next) => {
    const selectedValue = req.query.selectedValue;
  try {
    hqQuery(
      `SELECT c.*
        FROM magod_hq_mis.canceled_vouchers_list c
        WHERE c.Unit_Uid = 0 AND c.UnitName = '${selectedValue}';`,
      (err, data) => {
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});

module.exports = accountSyncRouter;
