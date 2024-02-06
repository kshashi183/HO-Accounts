const fromUnitUpdateSyncRouter = require("express").Router();
const { hqQuery, setupQuery } = require("../../../helpers/dbconn");
var bodyParser = require("body-parser");

fromUnitUpdateSyncRouter.post("/updateSyncInfo", async (req, res, next) => {
  try {
    const {
      ho_paymentrv_register_data,
      ho_paymentrv_details_data,
      Unit_Vendor_Data_data,
      unit_purchase_invoice_list,
      unit_purchase_inv_taxes,
      canceled_vouchers_list_data,
      unit_pur_inv_payment_vrlist_data,
      unit_pur_payment_details_data,
    } = req.body;

    let updatedData = [];

    // Update Inv registered with HO

    if (ho_paymentrv_register_data && ho_paymentrv_register_data.length > 0) {
      for (let i = 0; i < ho_paymentrv_register_data.length; i++) {
        await hqQuery(
          `UPDATE magod_hq_mis.ho_paymentrv_register 
            SET Unit_UId = '${ho_paymentrv_register_data[i].Unit_UId}' 
            WHERE HOPrvId = '${ho_paymentrv_register_data[i].HO_Uid}';`
        );
        updatedData.push(ho_paymentrv_register_data[i]);
      }
    }

    // Update Inv Tax
    if (ho_paymentrv_details_data && ho_paymentrv_details_data.length > 0) {
      for (let i = 0; i < ho_paymentrv_details_data.length; i++) {
        await hqQuery(
          `UPDATE magod_hq_mis.ho_paymentrv_details 
            SET Sync_UnitID = '${ho_paymentrv_details_data[i].Unit_UId}' 
            WHERE Id = '${ho_paymentrv_details_data[i].HO_Uid}';`
        );
        updatedData.push(ho_paymentrv_details_data[i]);
      }
    }

    // Upadte UID for Venodors

    if (Unit_Vendor_Data_data && Unit_Vendor_Data_data.length > 0) {
      for (let i = 0; i < Unit_Vendor_Data_data.length; i++) {
        await hqQuery(
          `UPDATE magod_hq_mis.unit_vendor_list u  
            SET u.Unit_Id = '${Unit_Vendor_Data_data[i].Unit_Uid}' 
            WHERE u.Id= '${Unit_Vendor_Data_data[i].HO_Uid}';`
        );
        updatedData.push(Unit_Vendor_Data_data[i]);
      }
    }

    // Upadate UID for Purchase Invoices

    if (unit_purchase_invoice_list && unit_purchase_invoice_list.length > 0) {
      for (let i = 0; i < unit_purchase_invoice_list.length; i++) {
        await hqQuery(
          `UPDATE magod_hq_mis.unit_purchase_invoice_list u  
            SET u.Unit_ID= '${unit_purchase_invoice_list[i].Unit_Uid}' 
            WHERE u.PI_Id= '${unit_purchase_invoice_list[i].HO_Uid}';`
        );
        updatedData.push(unit_purchase_invoice_list[i]);
      }
    }

    // Upadate UID for Purchase Invoices taxes

    if (unit_purchase_inv_taxes && unit_purchase_inv_taxes.length > 0) {
      for (let i = 0; i < unit_purchase_inv_taxes.length; i++) {
        await hqQuery(
          `UPDATE magod_hq_mis.unit_purchase_inv_taxes u  
            SET u.Unit_Uid= '${unit_purchase_inv_taxes[i].Unit_UId}' 
            WHERE u.PurInTaxID= '${unit_purchase_inv_taxes[i].HO_UId}';`
        );
        updatedData.push(unit_purchase_inv_taxes[i]);
      }
    }

    // Update UID for Cancel Voucher

    if (canceled_vouchers_list_data && canceled_vouchers_list_data.length > 0) {
      for (let i = 0; i < canceled_vouchers_list_data.length; i++) {
        await hqQuery(
          `UPDATE magod_hq_mis.canceled_vouchers_list c
            SET c.Unit_Uid = '${canceled_vouchers_list_data[i].Unit_Uid}' 
            WHERE c.UUID = '${canceled_vouchers_list_data[i].UUID}';`
        );
        updatedData.push(canceled_vouchers_list_data[i]);
      }
    }

    // Upadte UID for Purchase Payment Voucher

    if (
      unit_pur_inv_payment_vrlist_data &&
      unit_pur_inv_payment_vrlist_data.length > 0
    ) {
      for (let i = 0; i < unit_pur_inv_payment_vrlist_data.length; i++) {
        await hqQuery(
          `UPDATE magod_hq_mis.unit_pur_inv_payment_vrlist u
            SET u.Unit_Uid= '${unit_pur_inv_payment_vrlist_data[i].Unit_Uid}' 
            WHERE u.UUID= '${unit_pur_inv_payment_vrlist_data[i].UUID}'
            OR u.HO_Uid= '${unit_pur_inv_payment_vrlist_data[i].HO_UId}';`
        );
        updatedData.push(unit_pur_inv_payment_vrlist_data[i]);
      }
    }

    // Upadte Unit_Id for Pur Payment Voucher Invoice Details

    if (
      unit_pur_payment_details_data &&
      unit_pur_payment_details_data.length > 0
    ) {
      for (let i = 0; i < unit_pur_payment_details_data.length; i++) {
        await hqQuery(
          `UPDATE magod_hq_mis.unit_pur_payment_details u
            SET u.Unit_Uid = '${unit_pur_payment_details_data[i].Unit_Uid}' 
            WHERE u.HO_Uid = '${unit_pur_payment_details_data[i].HO_UId}'
            AND u.UUID = '${unit_pur_payment_details_data[i].UUID}';`
        );
        updatedData.push(unit_pur_payment_details_data[i]);
      }
    }

    return res.json({
      Status: "Success",
      result: "Updated successfully",
      updatedData: updatedData,
    });
  } catch (error) {
    console.error(error);
    return res.json({ Status: "Error", result: "Failed to update data" });
  }
});

module.exports = fromUnitUpdateSyncRouter;
