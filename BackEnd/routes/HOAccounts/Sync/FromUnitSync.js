const fromUnitSyncRouter = require("express").Router();
const { hqQuery, setupQuery } = require("../../../helpers/dbconn");
var bodyParser = require("body-parser");

const formatDateForDatabase = (isoDateString) => {
  if (!isoDateString) return null; // Handle null or undefined input

  const date = new Date(isoDateString);

  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date value: ${isoDateString}`);
  }

  // Format as 'YYYY-MM-DD HH:MM:SS'
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

//Save All Customer  sent by Units into CUst data

fromUnitSyncRouter.post("/saveCustDataIntoHoDB", async (req, res, next) => {
  const { unit_cust_data } = req.body;
  console.log("custtttttt");
  const CustData = "saveCustData";
  try {
    const insertedData = [];

    if (unit_cust_data.length > 0) {
      await Promise.all(
        unit_cust_data.map(async (custItem, i) => {
          try {
            const isGovtOrgValue = custItem.IsGovtOrg ? 1 : 0;
            const isForiegnValue = custItem.IsForiegn ? 1 : 0;
            const currentValue = custItem.CURRENT ? 1 : 0;
            const isBranchValue = custItem.IsBranch ? 1 : 0;

            const sqlCustQuery = `INSERT INTO magod_hq_mis.unit_cust_data (UnitName, Cust_Code, Cust_name,
     Branch, Address, City, State, StateID,IsGovtOrg, IsForiegn, GSTNo, Country, Pin_Code, 
     CreditTerms, CreditLimit,CURRENT, LastBilling, FirstBilling, PAN_No, CustStatus, IsBranch, 
     Unit_UId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE Branch = ?, Address = ?, City = ?, State = ?, StateID = ?, 
     IsGovtOrg = ?, IsForiegn = ?, GSTNo = ?, Country = ?, Pin_Code = ?, CreditTerms = ?, 
     CreditLimit = ?,CURRENT = ?, LastBilling = IFNULL(?, NULL), FirstBilling = IFNULL(?, NULL),
     PAN_No = ?, CustStatus = ?, IsBranch = ?, Unit_UId = ?;`;

            const selectQuery = `SELECT Id AS Sync_HOId, Cust_Code, UnitName FROM magod_hq_mis.unit_cust_data
     WHERE UnitName = '${custItem.UnitName}' AND Cust_Code = '${custItem.Cust_Code}';`;

            const values = [
              custItem.UnitName || "",
              custItem.Cust_Code || "",
              custItem.Cust_name || "Enter Customer Name",
              custItem.Branch || 0,
              custItem.Address,
              custItem.City,
              custItem.State,
              custItem.StateId || 0,
              isGovtOrgValue || 0,
              isForiegnValue || 0,
              custItem.GSTNo || "NotRegistered",
              custItem.Country,
              custItem.Pin_Code,
              custItem.CreditTerms || "Against Delivery",
              custItem.CreditLimit || 0.0,
              currentValue || 0,
              custItem.LastBilling || null,
              custItem.FirstBilling || null,
              custItem.PAN_No,
              custItem.CustStatus || "OK",
              isBranchValue || 0,
              custItem.Unit_UId || 0,
              // For the ON DUPLICATE KEY UPDATE part
              custItem.Branch || 0,
              custItem.Address,
              custItem.City,
              custItem.State,
              custItem.StateId || 0,
              isGovtOrgValue || 0,
              isForiegnValue || 0,
              custItem.GSTNo || "NotRegistered",
              custItem.Country,
              custItem.Pin_Code,
              custItem.CreditTerms || "Against Delivery",
              custItem.CreditLimit || 0.0,
              currentValue || 0,
              custItem.LastBilling || null,
              custItem.FirstBilling || null,
              custItem.PAN_No,
              custItem.CustStatus || "ok",
              isBranchValue || 0,
              custItem.Unit_UId || 0,
            ];

            // Insert or update the data
            const data = await hqQuery(sqlCustQuery, values);

            // Retrieve Sync_HOId
            const [Sync_HOId] = await hqQuery(selectQuery);

            // Add the customer details to the insertedData array
            insertedData.push({
              // ...data,
              Sync_HOId: Sync_HOId && Sync_HOId.Sync_HOId,
              UnitName: Sync_HOId && Sync_HOId.UnitName,
              Cust_Code: Sync_HOId && Sync_HOId.Cust_Code,
            });
          } catch (error) {
            console.error(`Error in iteration ${i}: ${error.message}`);
            insertedData.push({
              error: `Error in iteration ${i}: ${error.message}`,
            });
          }
        })
      );

      res.status(200).json({ insertedData });
    } else {
      console.log("No customer data values found");
      res.status(400).json({ error: "No customer data values found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// fromUnitSyncRouter.post("/saveCustDataIntoHoDB", async (req, res, next) => {
//   const { unit_cust_data } = req.body;
//   console.log("custtttttt");
//   const CustData = "saveCustData";
//   try {
//     const responseData = [];

//     if (unit_cust_data.length > 0) {
//       const custResponseData = await Promise.all(
//         unit_cust_data.map(async (custItem, i) => {
//           try {
//             const isGovtOrgValue = custItem.IsGovtOrg ? 1 : 0;
//             const isForiegnValue = custItem.IsForiegn ? 1 : 0;
//             const currentValue = custItem.CURRENT ? 1 : 0;
//             const isBranchValue = custItem.IsBranch ? 1 : 0;

//             const sqlCustQuery = `INSERT INTO magod_hq_mis.unit_cust_data (UnitName, Cust_Code, Cust_name,
//                  Branch, Address, City, State, StateID,IsGovtOrg, IsForiegn, GSTNo, Country, Pin_Code,
//                  CreditTerms, CreditLimit,CURRENT, LastBilling, FirstBilling, PAN_No, CustStatus, IsBranch,
//                  Unit_UId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//                  ON DUPLICATE KEY UPDATE Branch = ?, Address = ?, City = ?, State = ?, StateID = ?,
//                  IsGovtOrg = ?, IsForiegn = ?, GSTNo = ?, Country = ?, Pin_Code = ?, CreditTerms = ?,
//                  CreditLimit = ?,CURRENT = ?, LastBilling = IFNULL(?, NULL), FirstBilling = IFNULL(?, NULL),
//                  PAN_No = ?, CustStatus = ?, IsBranch = ?, Unit_UId = ?;`;

//                     const selectQuery = `SELECT Id AS Sync_HOId , Unit_UId, UnitName FROM magod_hq_mis.unit_cust_data
//              WHERE UnitName = '${custItem.UnitName}' AND Cust_Code = '${custItem.Cust_Code}';`;

//             const values = [
//               custItem.UnitName || "",
//               custItem.Cust_Code || "",
//               custItem.Cust_name || "Enter Customer Name",
//               custItem.Branch || 0,
//               custItem.Address,
//               custItem.City,
//               custItem.State,
//               custItem.StateId || 0,
//               isGovtOrgValue || 0,
//               isForiegnValue || 0,
//               custItem.GSTNo || "NotRegistered",
//               custItem.Country,
//               custItem.Pin_Code,
//               custItem.CreditTerms || "Against Delivery",
//               custItem.CreditLimit || 0.0,
//               currentValue || 0,
//               custItem.LastBilling || null,
//               custItem.FirstBilling || null,
//               custItem.PAN_No,
//               custItem.CustStatus || "OK",
//               isBranchValue || 0,
//               custItem.Unit_UId || 0,
//               // For the ON DUPLICATE KEY UPDATE part
//               custItem.Branch || 0,
//               custItem.Address,
//               custItem.City,
//               custItem.State,
//               custItem.StateId || 0,
//               isGovtOrgValue || 0,
//               isForiegnValue || 0,
//               custItem.GSTNo || "NotRegistered",
//               custItem.Country,
//               custItem.Pin_Code,
//               custItem.CreditTerms || "Against Delivery",
//               custItem.CreditLimit || 0.0,
//               currentValue || 0,
//               custItem.LastBilling || null,
//               custItem.FirstBilling || null,
//               custItem.PAN_No,
//               custItem.CustStatus || "ok",
//               isBranchValue || 0,
//               custItem.Unit_UId || 0,
//             ];
//             // const selectQuery = `SELECT * FROM magod_hq_mis.unit_cust_data
//             //   WHERE UnitName = '${custItem.UnitName}' AND Cust_Code = '${custItem.Cust_Code}';`;

//             // Insert or update the data
//             const data = await hqQuery(sqlCustQuery, values);

//             // Retrieve all columns for the specified condition
//             const [CustAllData] = await hqQuery(selectQuery);

//             return {  CustAllData };
//           } catch (error) {
//             console.error(`Error in iteration ${i}: ${error.message}`);
//             return { error: `Error in iteration ${i}: ${error.message}` };
//           }
//         })
//       );

//       responseData.push(...custResponseData);
//     //  console.log("res", responseData);

//       res.status(200).json({ responseData , CustData});
//     } else {
//       console.log("No customer data values found");
//       res.status(400).json({ error: "No customer data values found" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

//Saving Invoices to HO Mysql DB, Ignore if already exists
fromUnitSyncRouter.post("/saveInvDataIntoHoDB", async (req, res, next) => {
  const { unit_inv_list } = req.body;
  const unit_inv = "unit_inv";
  try {
    const invResponseData = [];

    if (unit_inv_list.length > 0) {
      const invoicesResponseData = await Promise.all(
        unit_inv_list.map(async (invItem, i) => {
          const correctedDate = formatDateForDatabase(invItem.OrderDate);
          invItem.OrderDate = correctedDate;

          const DcDate = formatDateForDatabase(invItem.DC_Date);
          invItem.DC_Date = DcDate;

          const InvDate = formatDateForDatabase(invItem.Inv_Date);
          invItem.Inv_Date = InvDate;

          const PaymentDate = formatDateForDatabase(invItem.PaymentDate);
          invItem.PaymentDate = PaymentDate;

          const DespatchDate = formatDateForDatabase(invItem.DespatchDate);
          invItem.DespatchDate = DespatchDate;

          const DespatchTime = formatDateForDatabase(invItem.DespatchTime);
          invItem.DespatchTime = DespatchTime;

          try {
            const summaryInvoiceValue = invItem.SummaryInvoice ? 1 : 0;
            // const isForiegnValue = custItem.IsForiegn ? 1 : 0;
            // const currentValue = custItem.CURRENT ? 1 : 0;
            // const isBranchValue = custItem.IsBranch ? 1 : 0;

            const sqlInvQuery = `INSERT INTO magod_hq_mis.unit_invoices_list
              (UnitName, DC_Inv_No, DC_InvType, OrderNo, OrderScheduleNo, OrderDate, 
              DC_No, DC_Date, DC_Fin_Year, Inv_No, Inv_Date, Inv_Fin_Year, PaymentDate, 
              PymtAmtRecd, Cust_Code, Cust_Name, Cust_Address, Cust_Place, Cust_State, 
              PIN_Code, Del_Address, PO_No, Net_Total, Discount, MtrlChg, AssessableValue, TaxAmount, 
              Del_Chg, InvTotal, Round_Off, GrandTotal, Total_Wt, ScarpWt, DespatchDate, DespatchTime, 
              TptMode, VehNo, ExChapterHead, ExNotNo, InspBy, PackedBy, Com_inv_Id, Remarks, JwValue, 
              MaterialValue, DCStatus, ScheduleId, InvoiceFor, PaymentMode, PaymentReceiptDetails, TptCharges, 
              PN_PkngLevel, Pgm_Dft_Chg, Del_responsibility, PaymentTerms, SummaryInvoice, BillType, Unit_UId)
          VALUES
              (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
              ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE Unit_UId = ?;`;

            const selectInvQuery = `SELECT Id, Id AS Sync_HOId, UnitName, DC_Inv_No, Unit_UId
            FROM magod_hq_mis.unit_invoices_list
            WHERE UnitName = ? AND Unit_UId = ?;`;

            const values = [
              invItem.UnitName || "",
              invItem.DC_Inv_No || 0,
              invItem.DC_InvType,
              invItem.OrderNo,
              invItem.OrderScheduleNo,
              invItem.OrderDate,
              invItem.DC_No,
              invItem.DC_Date,
              invItem.DC_Fin_Year,
              invItem.Inv_No,
              invItem.Inv_Date,
              invItem.Inv_Fin_Year,
              invItem.PaymentDate,
              invItem.PymtAmtRecd || 0.0,
              invItem.Cust_Code,
              invItem.Cust_Name,
              invItem.Cust_Address,
              invItem.Cust_Place,
              invItem.Cust_State,
              invItem.PIN_Code,
              invItem.Del_Address,
              invItem.PO_No,
              invItem.Net_Total || 0.0,
              invItem.Discount || 0.0,
              invItem.MtrlChg || 0.0,
              invItem.AssessableValue || 0.0,
              invItem.TaxAmount || 0.0,
              invItem.Del_Chg || 0.0,
              invItem.InvTotal || 0.0,
              invItem.Round_Off || 0.0,
              invItem.GrandTotal || 0.0,
              invItem.Total_Wt || 0,
              invItem.ScarpWt || 0,
              invItem.DespatchDate,
              invItem.DespatchTime,
              invItem.TptMode,
              invItem.VehNo,
              invItem.ExChapterHead,
              invItem.ExNotNo,
              invItem.InspBy,
              invItem.PackedBy,
              invItem.Com_inv_id,
              invItem.Remarks,
              invItem.JwValue || 0.0,
              invItem.MaterialValue || 0.0,
              invItem.DCStatus || "Despatched",
              invItem.ScheduleId || 0,
              invItem.InvoiceFor,
              invItem.PaymentMode,
              invItem.PaymentReceiptDetails,
              invItem.TptCharges || 0.0,
              invItem.PN_PkngLevel || "Pkng1",
              invItem.Pgm_Dft_Chg || 0.0,
              invItem.Del_responsibility || "Customer",
              invItem.PaymentTerms || "Cash on Delivery",
              summaryInvoiceValue || 0,
              invItem.BillType || "Cash",
              invItem.Unit_UId,
              // For the ON DUPLICATE KEY UPDATE part
              invItem.Unit_UId || 0,
            ];

            // Insert or update the data
            const data = await hqQuery(sqlInvQuery, values);

            // Retrieve Sync_HOId
            const [Sync_HOId] = await hqQuery(selectInvQuery, [
              invItem.UnitName,
              invItem.Unit_UId || 0,
            ]);

            // console.log(Sync_HOId);

            invResponseData.push({
              // ...data,
              Sync_HOId: Sync_HOId && Sync_HOId.Sync_HOId,
              UnitName: Sync_HOId && Sync_HOId.UnitName,
              DC_Inv_No: Sync_HOId && Sync_HOId.DC_Inv_No,
              Unit_UId: Sync_HOId && Sync_HOId.Unit_UId,
            });
          } catch (error) {
            console.error(`Error in iteration ${i}: ${error.message}`);
            return { error: `Error in iteration ${i}: ${error.message}` };
          }
        })
      );

      res.status(200).json({ invResponseData });
    } else {
      console.log("No customer data values found");
      res.status(400).json({ error: "No customer data values found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Saving InvTaxes to HO Mysql DB, Ignore if already exists
fromUnitSyncRouter.post("/saveInvTaxesDataIntoHoDB", async (req, res, next) => {
  const { unit_taxes_list } = req.body;
  try {
    const taxResponseData = [];

    if (unit_taxes_list.length > 0) {
      const invTaxResponseData = await Promise.all(
        unit_taxes_list.map(async (taxItem, i) => {
          try {
            const sqlInvQuery = `INSERT INTO magod_hq_mis.unit_inv_taxtable
              (UnitName, Dc_inv_No, DcTaxID, Tax_Name, TaxableAmount, 
                TaxPercent, TaxAmt, AcctHead, Unit_UId)
          VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE Unit_Uid = ?;`;

            const selectInvQuery = `SELECT InvTaxId, InvTaxId AS Sync_HOId, UnitName, Unit_UId, DC_Inv_No
            FROM magod_hq_mis.unit_inv_taxtable u
            WHERE u.UnitName = ? AND u.Unit_UId = ?;`;

            const values = [
              taxItem.UnitName || "",
              taxItem.Dc_inv_No || 0,
              taxItem.DcTaxID,
              taxItem.Tax_Name,
              taxItem.TaxableAmount,
              taxItem.TaxPercent,
              taxItem.TaxAmt,
              taxItem.AcctHead,
              taxItem.Unit_UId,
              // For the ON DUPLICATE KEY UPDATE part
              taxItem.Unit_UId || 0,
            ];

            // Insert or update the data
            const data = await hqQuery(sqlInvQuery, values);

            // Retrieve Sync_HOId
            const [Sync_HOId] = await hqQuery(selectInvQuery, [
              taxItem.UnitName,
              taxItem.Unit_UId,
            ]);

            taxResponseData.push({
              // ...data,
              Sync_HOId: Sync_HOId && Sync_HOId.Sync_HOId,
              InvTaxId: Sync_HOId && Sync_HOId.InvTaxId,
              UnitName: Sync_HOId && Sync_HOId.UnitName,
              Unit_UId: Sync_HOId && Sync_HOId.Unit_UId,
              DC_Inv_No: Sync_HOId && Sync_HOId.DC_Inv_No,
            });
          } catch (error) {
            console.error(`Error in iteration ${i}: ${error.message}`);
            return { error: `Error in iteration ${i}: ${error.message}` };
          }
        })
      );

      res.status(200).json({ taxResponseData });
    } else {
      console.log("No customer data values found");
      res.status(400).json({ error: "No customer data values found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Saving Inv Summary to HO Mysql DB, Ignore if already exists
fromUnitSyncRouter.post(
  "/saveInvSummaryDataIntoHoDB",
  async (req, res, next) => {
    const { unit_dc_summary } = req.body;
    try {
      const dcResponseData = [];

      if (unit_dc_summary.length > 0) {
        const invDcResponseData = await Promise.all(
          unit_dc_summary.map(async (dcItem, i) => {
            try {
              const sqlInvQuery = `INSERT INTO magod_hq_mis.unit_inv_summary
              (UnitName, DC_Inv_No, SummarySrl, OrderScheduleNo, dc_invType, Mtrl, Material,
              Excise_CL_no, TotQty, TotAmount, SrlWt, cut_length, TotHoles, Thickness, Mprocess,
              Jw_Amount, Mtrl_Amount, Unit_UId, InvId)
          VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE Unit_Uid = ?;`;

              const selectInvQuery = `SELECT Id, Id AS Sync_HOId, Unit_UId, UnitName, DC_Inv_No
              FROM magod_hq_mis.unit_inv_summary u
              WHERE u.UnitName = ? AND u.Unit_UId = ?;`;

              const values = [
                dcItem.UnitName || "",
                dcItem.DC_Inv_No || 0,
                dcItem.SummarySrl || 0,
                dcItem.OrderScheduleNo,
                dcItem.dc_invType,
                dcItem.Mtrl,
                dcItem.Material,
                dcItem.Excise_CL_no,
                dcItem.TotQty,
                dcItem.TotAmount,
                dcItem.SrlWt,
                dcItem.cut_length,
                dcItem.TotHoles,
                dcItem.Thickness,
                dcItem.Mprocess,
                dcItem.JW_Amount || 0.0,
                dcItem.Mtrl_Amount || 0.0,
                dcItem.Unit_UId || 0,
                dcItem.InvId || 0,
                // For the ON DUPLICATE KEY UPDATE part
                dcItem.Unit_UId || 0,
              ];

              // Insert or update the data
              const data = await hqQuery(sqlInvQuery, values);

              // Retrieve Sync_HOId
              const [Sync_HOId] = await hqQuery(selectInvQuery, [
                dcItem.UnitName,
                dcItem.Unit_UId,
              ]);

              dcResponseData.push({
                // ...data,
                Sync_HOId: Sync_HOId && Sync_HOId.Sync_HOId,
                Id: Sync_HOId && Sync_HOId.Id,
                UnitName: Sync_HOId && Sync_HOId.UnitName,
                Unit_UId: Sync_HOId && Sync_HOId.Unit_UId,
                DC_Inv_No: Sync_HOId && Sync_HOId.DC_Inv_No,
              });
            } catch (error) {
              console.error(`Error in iteration ${i}: ${error.message}`);
              return { error: `Error in iteration ${i}: ${error.message}` };
            }
          })
        );

        res.status(200).json({ dcResponseData });
      } else {
        console.log("No customer data values found");
        res.status(400).json({ error: "No customer data values found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

//Saving Inv Summary, Da_comb_invDetails to HO Mysql DB, Ignore if already exists
fromUnitSyncRouter.post("/saveCombInvDataIntoHoDB", async (req, res, next) => {
  const { unit_inv_list } = req.body;
  try {
    const invDaCombResponseData = [];

    if (unit_inv_list.length > 0) {
      const daCombinvDetailsResponseData = await Promise.all(
        unit_inv_list.map(async (invCombItem, i) => {
          const correctedDate = formatDateForDatabase(invCombItem.Inv_Date);
          invCombItem.Inv_Date = correctedDate;

          try {
            // const summaryInvoiceValue = invItem.SummaryInvoice ? 1 : 0;
            // const isForiegnValue = custItem.IsForiegn ? 1 : 0;
            // const currentValue = custItem.CURRENT ? 1 : 0;
            // const isBranchValue = custItem.IsBranch ? 1 : 0;

            const sqlInvQuery = `INSERT INTO magod_hq_mis.unit_comb_inv_details
              (UnitName, Comb_inv_id, Dc_Inv_No, Srl, Inv_dc_inv_no, Description,
              Inv_No, Inv_type, Inv_Date, Dc_No, Inv_Amt, TallyRef, Unit_UId)
          VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

            const values = [
              invCombItem.UnitName || "",
              invCombItem.Com_inv_id || 0,
              invCombItem.DC_Inv_No || 0,
              invCombItem.Srl || 0,
              invCombItem.Inv_dc_inv_no || 0,
              invCombItem.Description,
              invCombItem.Inv_No || "",
              invCombItem.Inv_type || "",
              invCombItem.Inv_Date || "0000-00-00",
              invCombItem.DC_No,
              invCombItem.Inv_Amt || 0.0,
              invCombItem.TallyRef || "",
              invCombItem.Unit_UId || 0,
            ];

            // Insert or update the data
            const data = await hqQuery(sqlInvQuery, values);

            invDaCombResponseData.push({
              // ...data,
              Sync_HOId: Sync_HOId && Sync_HOId.Sync_HOId,
            });
          } catch (error) {
            console.error(`Error in iteration ${i}: ${error.message}`);
            return { error: `Error in iteration ${i}: ${error.message}` };
          }
        })
      );

      res.status(200).json({ invDaCombResponseData });
    } else {
      console.log("No customer data values found");
      res.status(400).json({ error: "No customer data values found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Saving unit_receipt_register to HO Mysql DB, Ignore if already exists
fromUnitSyncRouter.post(
  "/saveReceiptRegisterDataIntoHoDB",
  async (req, res, next) => {
    const { unit_receipt_register, unit_receipt_adjusted_list } = req.body;
    try {
      const receiptResponseData = [];

      if (unit_receipt_register.length > 0) {
        const receiptRegisterResponseData = await Promise.all(
          unit_receipt_register.map(async (receiptItem, i) => {
            const correctedDate = formatDateForDatabase(
              receiptItem.Recd_PV_Date
            );
            receiptItem.Recd_PV_Date = correctedDate;

            try {
            //   const sqlInvQuery = `INSERT INTO magod_hq_mis.unit_payment_recd_voucher_register
            //     (UnitName, RecdPVID, Recd_PVNo, Recd_PV_Date, Cust_code, CustName, TxnType,
            //     Amount, DocuNo, DESCRIPTION, On_account, HORef, HOPrvId, Tally_Uid, Unit_UId)
            // VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            // ON DUPLICATE KEY UPDATE Unit_UId = ?;
            // `;

            const sqlInvQuery = `INSERT INTO magod_hq_mis.unit_payment_recd_voucher_register
            (UnitName, RecdPVID, Recd_PVNo, Recd_PV_Date, Cust_code, CustName, TxnType,
            Amount, DocuNo, DESCRIPTION, On_account, HORef, HOPrvId, Tally_Uid, Unit_UId, fixedOnaccount)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE Unit_UId = ?;
        `;

              const selectInvQuery = `SELECT u.Id, Id AS Sync_HOId, Unitname, RecdPVID, Unit_UId
              FROM magod_hq_mis.unit_payment_recd_voucher_register u
              WHERE u.Unitname = ? AND u.Unit_UId = ?;
              `;

              const values = [
                receiptItem.Unitname || "",
                receiptItem.RecdPVID || 0,
                receiptItem.Recd_PVNo || "Draft",
                receiptItem.Recd_PV_Date || "0000-00-00",
                receiptItem.Cust_code || "",
                receiptItem.CustName || "",
                receiptItem.TxnType || "Bank",
                receiptItem.Amount || 0.0,
                receiptItem.DocuNo || "",
                receiptItem.Description || "",
                receiptItem.On_account || 0,
                receiptItem.HORef || "",
                receiptItem.HOPrvId || 0,
                receiptItem.Tally_Uid,
                receiptItem.Unit_UId || 0,
                // For the ON DUPLICATE KEY UPDATE part
                receiptItem.Unit_UId || 0,
                receiptItem.On_account || 0,
              ];

              // Insert or update the data
              const data = await hqQuery(sqlInvQuery, values);

              // Retrieve Sync_HOId
              const [Sync_HOId] = await hqQuery(selectInvQuery, [
                receiptItem.Unitname,
                receiptItem.Unit_UId,
              ]);

              // console.log(`Sync_HOId: ${Sync_HOId}`);
              // console.log(Sync_HOId);

              receiptResponseData.push({
                // ...data,
                Sync_HOId: Sync_HOId && Sync_HOId.Sync_HOId,
                Id: Sync_HOId && Sync_HOId.Id,
                Unit_UId: Sync_HOId && Sync_HOId.Unit_UId,
                RecdPVID: Sync_HOId && Sync_HOId.RecdPVID,
                Unitname: Sync_HOId && Sync_HOId.Unitname,
              });
            } catch (error) {
              console.error(`Error in iteration ${i}: ${error.message}`);
              return { error: `Error in iteration ${i}: ${error.message}` };
            }
          })
        );

        res.status(200).json({ receiptResponseData });
      } else {
        console.log("No customer data values found");
        res.status(400).json({ error: "No customer data values found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

//Saving unit_receipt_adjusted_list to HO Mysql DB, Ignore if already exists
fromUnitSyncRouter.post(
  "/saveReceptDetailsDataIntoHoDB",
  async (req, res, next) => {
    const { unit_receipt_adjusted_list } = req.body;
    try {
      const detailsResponseData = [];

      if (unit_receipt_adjusted_list && unit_receipt_adjusted_list.length > 0) {
        const receptDetailsResponseData = await Promise.all(
          unit_receipt_adjusted_list.map(async (receiptItem, i) => {
            const correctedDate = formatDateForDatabase(receiptItem.Inv_date);
            receiptItem.Inv_date = correctedDate;

            // console.log(
            //   `Processing receiptItem: ${JSON.stringify(receiptItem)}`
            // );

            try {
              const sqlInvQuery = `INSERT INTO magod_hq_mis.unit_payment_recd_voucher_details
                (Unitname, RecdPVID, RecdPvSrl, Dc_inv_no, Inv_No, Inv_Type, Inv_Amount,
                Amt_received, Receive_Now, Inv_date, RefNo, Unit_UId, PvrId)
            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE Unit_UId = ?;
              `;

              const selectInvQuery = `SELECT u.Id, Id AS Sync_HOId, Unitname, RecdPVID, Unit_UId, HoPrvId
                FROM magod_hq_mis.unit_payment_recd_voucher_details u
                WHERE u.Unitname = ? AND u.Unit_UId = ?;
                `;

              const values = [
                receiptItem.Unitname || "",
                receiptItem.RecdPVID || 0,
                receiptItem.RecdPvSrl || 0,
                receiptItem.Dc_inv_no || 0,
                receiptItem.Inv_No || "",
                receiptItem.Inv_Type || "",
                receiptItem.Inv_Amount || 0.0,
                receiptItem.Amt_received || 0.0,
                receiptItem.Receive_Now || 0.0,
                receiptItem.Inv_date || "0000-00-00",
                receiptItem.RefNo || "",
                receiptItem.Unit_UId || 0,
                receiptItem.RecdPVID || 0,
                // For the ON DUPLICATE KEY UPDATE part
                receiptItem.Unit_UId || 0,
              ];

              // Insert or update the data
              const data = await hqQuery(sqlInvQuery, values);

              // Retrieve Sync_HOId
              const [Sync_HOId] = await hqQuery(selectInvQuery, [
                receiptItem.Unitname,
                receiptItem.Unit_UId,
              ]);

              // console.log(`Sync_HOId: ${Sync_HOId}`);

              detailsResponseData.push({
                // ...data,
                Sync_HOId: Sync_HOId && Sync_HOId.Sync_HOId,
                Unitname: Sync_HOId && Sync_HOId.Unitname,
                RecdPVID: Sync_HOId && Sync_HOId.RecdPVID,
                Unit_UId: Sync_HOId && Sync_HOId.Unit_UId,
                HoPvrId: Sync_HOId && Sync_HOId.HoPvrId,
              });
            } catch (error) {
              console.error(`Error in iteration ${i}: ${error.message}`);
              return { error: `Error in iteration ${i}: ${error.message}` };
            }
          })
        );

        res.status(200).json({ detailsResponseData });
      } else {
        console.log("No customer data values found");
        res.status(400).json({ error: "No customer data values found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

//Saving CanceledVrList to HO Mysql DB, Ignore if already exists
fromUnitSyncRouter.post(
  "/saveCanceledVrListDataIntoHoDB",
  async (req, res, next) => {
    const { unit_cancelled_vr_list } = req.body;
    try {
      const canceledResponseData = [];

      if (unit_cancelled_vr_list.length > 0) {
        const canceledVrResponseData = await Promise.all(
          unit_cancelled_vr_list.map(async (receiptItem, i) => {
            try {
              const sqlInvQuery = `INSERT INTO magod_hq_mis.canceled_vouchers_list
                (UnitName, CancelVrNo, VrDate, VrAmount, CancelReason, RefVr_Uid, 
                RefVrNo, RefVrDate, RefVrType, Cust_Code, Cust_Name, Unit_Uid, UUID)
            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                CancelVrNo = ?,
                VrDate = ?,
                VrAmount = ?,
                CancelReason = ?,
                RefVr_Uid = ?,
                RefVrNo = ?,
                RefVrDate = ?,
                RefVrType = ?,
                Cust_Code = ?,
                Cust_Name = ?;`;

              const updateQuery = `UPDATE magod_hq_mis.canceled_vouchers_list
              SET HO_Sync_Id = Id
              WHERE UUID = '${receiptItem.UUID}';`;

              const selectInvQuery = `SELECT Id AS HO_Sync_Id, UnitName, UUID, Unit_Uid
              FROM magod_hq_mis.canceled_vouchers_list
              WHERE UUID = ?;`;

              const values = [
                receiptItem.UnitName,
                receiptItem.CancelVrNo,
                receiptItem.VrDate,
                receiptItem.VrAmount || 0.0,
                receiptItem.CancelReason,
                receiptItem.RefVr_Uid || 0,
                receiptItem.RefVrNo,
                receiptItem.RefVrDate,
                receiptItem.RefVrType,
                receiptItem.Cust_Code,
                receiptItem.Cust_Name,
                receiptItem.Unit_Uid || 0,
                receiptItem.UUID,
                // For the ON DUPLICATE KEY UPDATE part
                receiptItem.CancelVrNo,
                receiptItem.VrDate,
                receiptItem.VrAmount || 0.0,
                receiptItem.CancelReason,
                receiptItem.RefVr_Uid || 0,
                receiptItem.RefVrNo,
                receiptItem.RefVrDate,
                receiptItem.RefVrType,
                receiptItem.Cust_Code,
                receiptItem.Cust_Name,
              ];

              // Insert or update the data
              const update = await hqQuery(updateQuery);

              const data = await hqQuery(sqlInvQuery, values);

              // Retrieve Sync_HOId
              const [Sync_HOId] = await hqQuery(selectInvQuery, [
                receiptItem.UUID,
              ]);

              // console.log(`Sync_HOId: ${Sync_HOId}`);
              // console.log(Sync_HOId);

              canceledResponseData.push({
                // ...data,
                Sync_HOId: Sync_HOId && Sync_HOId.HO_Sync_Id,
                UnitName: Sync_HOId && Sync_HOId.UnitName,
                UUID: Sync_HOId && Sync_HOId.UUID,
                Unit_Uid: Sync_HOId && Sync_HOId.Unit_Uid,
              });
            } catch (error) {
              console.error(`Error in iteration ${i}: ${error.message}`);
              return { error: `Error in iteration ${i}: ${error.message}` };
            }
          })
        );

        res.status(200).json({ canceledResponseData });
      } else {
        console.log("No customer data values found");
        res.status(400).json({ error: "No customer data values found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

module.exports = fromUnitSyncRouter;
