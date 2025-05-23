const createnew = require("express").Router();

const {
  setupQueryMod,
  misQuery,
  setupQuery,
} = require("../../../../helpers/dbconn");
const { logger } = require("../../../../helpers/logger");

createnew.get("/ho_openInvoices", (req, res) => {
  const custcode = req.query.customercode;

  const unitname = req.query.unitname;
  console.log("unit and custo code for open inv", custcode, unitname);
  

  const sql = `SELECT *
  
  FROM magod_hq_mis.unit_invoices_list
  WHERE UnitName = '${unitname}'
    AND Cust_Code='${custcode}'
    AND ABS(GrandTotal - PymtAmtRecd) > 0
    AND DCStatus <> 'Closed'; `;
  //  const sql=`
  // SELECT DISTINCT Cust_Code , Cust_Name FROM magodmis.draft_dc_inv_register `;
  setupQueryMod(sql, (err, result) => {
    if (err) {
      logger.error(
        "Unable to fetch data from magod_hq_mis.unit_invoices_list due to Wrong SQL query"
      );
    } else {
     
      console.log("result of open inv ", result.length)
      
      res.send(result);
    }
  });
});

createnew.get("/ho_openInvoicesAdjust", (req, res) => {
  const custcode = req.query.customercode;



  const sql = `SELECT *
  
  FROM magod_hq_mis.unit_invoices_list
  WHERE 
  Cust_Code='${custcode}'
    AND ABS(GrandTotal - PymtAmtRecd) > 0
    AND DCStatus <> 'Closed'; `;
  //  const sql=`
  // SELECT DISTINCT Cust_Code , Cust_Name FROM magodmis.draft_dc_inv_register `;
  setupQueryMod(sql, (err, result) => {
    if (err) {
      logger.error(
        "Unable to fetch data from magod_hq_mis.unit_invoices_list due to Wrong SQL query"
      );
    } else {
      return res.json({ Result: result });
    }
  });
});

createnew.post("/getFormData", (req, res) => {
  const { receipt_id, custCode } = req.body;
  //const receipt_id = 245

  // const sql = `SELECT * from magod_hq_mis.ho_paymentrv_register  WHERE HOPrvId='${receipt_id}' `;
  const sql = `SELECT * from magod_hq_mis.ho_paymentrv_register  WHERE HOPrvId='${receipt_id}' AND Cust_code='${custCode}' AND Unit_RecdPVid=0 `;
  //  const sql=`
  // SELECT DISTINCT Cust_Code , Cust_Name FROM magodmis.draft_dc_inv_register `;
  setupQueryMod(sql, (err, result) => {
    if (err) {
      logger.error(
        "Unable to fetch data from magod_hq_mis.ho_paymentrv_register due to Wrong SQL query"
      );
    } else {
      return res.json({ Result: result });
    }
  });
});

createnew.post("/getleftTable", (req, res) => {
  const { receipt_id,unit } = req.body;

  

  const sql = `SELECT * FROM magod_hq_mis.ho_paymentrv_details   WHERE HOPrvId='${receipt_id}' AND UnitName='${unit}' `;
  //  const sql=`
  // SELECT DISTINCT Cust_Code , Cust_Name FROM magodmis.draft_dc_inv_register `;
  setupQueryMod(sql, (err, result) => {
    if (err) {
      logger.error(
        "Unable to fetch data from magod_hq_mis.ho_paymentrv_details due to Wrong SQL query"
      );
    } else {
      return res.json({ Result: result });
    }
  });
});

createnew.post("/insertToparentForm", (req, res) => {
  const rows = req.body.adjustmentRows;

  // Check if any records exist with the same Unit_RecdPVid
  const selectQuery = `SELECT * FROM magod_hq_mis.ho_paymentrv_register WHERE
   Unit_RecdPVid = '${rows.RecdPVID}'   AND Status <> 'Pending'
   AND Status <> 'Cancelled'  `;
  setupQueryMod(selectQuery, (err, selectResult) => {
    if (err) {
      logger.error(
        "Unable to fetch data from magod_hq_mis.ho_paymentrv_register due to Wrong SQL query"
      );
      return res
        .status(500)
        .json({ error: "Failed to check existing records" });
    }

    // If no records exist with the same Unit_RecdPVid, proceed with insertion
    if (selectResult.length === 0) {
      // Modify rows object properties
      rows.Amount = 0;
      rows.Description = `Adjustment Against Receipt ${rows.Recd_PVNo}`;
      rows.TxnType = "Adjustment";

      // Construct the SQL query to insert a new record
      const insertQuery = `INSERT INTO magod_hq_mis.ho_paymentrv_register
                           (Unitname, Cust_code, CustName, TxnType, Amount, Description, HoRefDate, Unit_RecdPVid) 
                           VALUES ('${req.body.unit}', '${rows.Cust_code}', '${rows.CustName}', '${rows.TxnType}', '${rows.Amount}', '${rows.Description}', CURDATE(), '${rows.RecdPVID}')`;

      setupQueryMod(insertQuery, (insertErr, insertResult) => {
        if (insertErr) {
          // console.log("Error in insert query:", insertErr);
          logger.error(
            "Unable to post data to magod_hq_mis.ho_paymentrv_register due to Wrong SQL query"
          );
          return res.status(500).json({ error: "Failed to insert record" });
        }

       
        const sql2 = `SELECT * FROM magod_hq_mis.ho_paymentrv_register WHERE Unit_RecdPVid ='${rows.RecdPVID}'   AND Status NOT IN ('Pending', 'Cancelled')`;
      
        setupQueryMod(sql2, (fetchingErr, fetchedData) => {
          if (fetchingErr) {
            logger.error(
              "Unable to fetch data from magod_hq_mis.ho_paymentrv_register due to Wrong SQL query"
            );
          } else {
            res.json({ insertedRecord: fetchedData });
          }
        });
        // Send success response with the inserted record
      });
    } else {
      const fetch = `SELECT * FROM magod_hq_mis.ho_paymentrv_register WHERE Unit_RecdPVid = '${rows.RecdPVID}'  AND Status NOT IN ('Pending', 'Cancelled')`;

      setupQueryMod(fetch, (e, r) => {
        if (e) {
          logger.error(
            "Unable to fetch data from magod_hq_mis.ho_paymentrv_register due to Wrong SQL query"
          );
        } else {
          res.json({ insertedRecord: r });
        }
      });
    }
  });
});







createnew.delete("/deleteleft", (req, res) => {
  const ho = req.body.hoid;

  //update on account value after delete the form

  const update = `UPDATE magod_hq_mis.unit_payment_recd_voucher_register u
SET u.On_account =u.On_account +'${req.body.onacc}'
   
WHERE u.Id = '${req.body.id}';
 `;

  const receiptdetailsISNull = `UPDATE magod_hq_mis.unit_payment_recd_voucher_register u
 SET u.On_account ='${req.body.onacc}'
    
 WHERE u.Id = '${req.body.id}';
  `;

  if (req.body.receipt_details.length === 0) {
    setupQueryMod(receiptdetailsISNull, (err, result) => {
      if (err) {
        logger.error(
          "Unable to update Onaccount value at magod_hq_mis.unit_payment_recd_voucher_register due to Wrong SQL query"
        );
      } else {
        // console.log("update onaccount after result", result);
      }
    });
  } else {
    setupQueryMod(update, (err, result) => {
      if (err) {
        //console.log("err in query", err);
      } else {
        // console.log("update onaccount after result", result);
      }
    });
  }

  const sql = `DELETE FROM magod_hq_mis.ho_paymentrv_details  WHERE HOPrvId ='${ho}'`;
  setupQueryMod(sql, (err, result) => {
    if (err) {
      logger.error(
        "Unable to delete data from magod_hq_mis.ho_paymentrv_details due to Wrong SQL query"
      );
      return res.json({ Error: " err in sql" });
    } else {
      //  console.log("result delete", result);

      const sql2 = `DELETE FROM magod_hq_mis.ho_paymentrv_register WHERE HOPrvId ='${ho}'`;
      setupQueryMod(sql2, (err2, result2) => {
        if (err2) {
          logger.error(
            "Unable to delete data from magod_hq_mis.ho_paymentrv_register due to Wrong SQL query"
          );
          return res
            .status(500)
            .json({ Error: "Error in SQL query for ho_paymentrv_register" });
        } else {
          //  console.log("Deleted from ho_paymentrv_register:", result2);
          return res.json({ Status: "Success" });
        }
      });

      // return res.json({ Status: "Success" });
    }
  });
});

createnew.put("/updateReceiveNowAmount", (req, res) => {
  const recept = req.body.receipt_details;
  // console.log("recept update", req.body);

  recept.forEach((item) => {
    const { Dc_inv_no, Receive_Now, HOPrvId } = item;

    // Construct the SQL query to update the Receive_Now field
    const sql = `
    UPDATE magod_hq_mis.ho_paymentrv_details 
    SET Receive_Now = ${Receive_Now} 
    WHERE Dc_inv_no = ${Dc_inv_no}  AND HOPrvId=${HOPrvId}
  `;

    // Execute the SQL query
    setupQueryMod(sql, (err, result) => {
      if (err) {
        logger.error(
          "Unable to update  Amount from magod_hq_mis.ho_paymentrv_details due to Wrong SQL query"
        );
      } else {
        // console.log("receivenow update successfully");
      }
    });
  });

  res.send({ Status: "Success" });
});

createnew.post("/cancelUpdate", async (req, res) => {
  const { HO_PrvId, custName, totalReceiveNow, id,unitname } = req.body;

  console.log("unit name cancell ", unitname);
  
  const fetchLeft = `SELECT * FROM magod_hq_mis.ho_paymentrv_details WHERE HOPrvId='${HO_PrvId}'`;

  const rightTable = `SELECT u.*
                      FROM magod_hq_mis.unit_invoices_list u
                      WHERE u.UnitName = '${unitname}'
                        AND u.Cust_Name = '${custName}'`;

  setupQueryMod(rightTable, (rightErr, rightRes) => {
    if (rightErr) {
      logger.error(
        "Unable to fetch data from magod_hq_mis.unit_invoices_list due to Wrong SQL query"
      );
    } else {
       console.log("right table result cancel after",rightRes.length);
      setupQueryMod(fetchLeft, (leftErr, leftResult) => {
        if (leftErr) {
          logger.error(
            "Unable to fetch data from magod_hq_mis.ho_paymentrv_details due to Wrong SQL query"
          );
          // console.log("left table error after cancel", leftErr);
        } else {
          //  console.log("left table res after cancel",leftResult);

          leftResult.forEach((item, index) => {
            const receiveNowNumeric = parseFloat(item.Receive_Now);
            const matchingEntry = rightRes.find(
              (entry) => entry.DC_Inv_No === item.Dc_inv_no
            );
            console.log("matchingEntry for after cancel", matchingEntry);
            if (matchingEntry) {
              // Execute an update query to update the entry in the unit_invoices_list table
              const updateQuery = `UPDATE magod_hq_mis.unit_invoices_list 
                                   SET PymtAmtRecd=PymtAmtRecd-${receiveNowNumeric} ,
                                   DCStatus = CASE 
                                                    WHEN GrandTotal - ${receiveNowNumeric} = 0 THEN 'Closed'
                                                    WHEN GrandTotal - ${receiveNowNumeric} > 0 THEN 'Despatched'
                                                    ELSE 'OverPaid'
                                                 END 
                                   WHERE DC_Inv_No = ${item.Dc_inv_no}`;

              setupQueryMod(updateQuery, (updateErr, updateRes) => {
                if (updateErr) {
                  logger.error(
                    "Unable to update data at magod_hq_mis.unit_invoices_list due to Wrong SQL query"
                  );
                } else {
                  // // Update successful
                  // console.log("update right table after cancel");
                }
              });
            } else {
               console.log("there is no matched data");
            }
          });
        }
      });

      //update the form data and adjustmemt voucher form data

      const cancelForm = `UPDATE magod_hq_mis.ho_paymentrv_register  
      SET Status='Cancelled' where HOPrvId='${HO_PrvId}'`;

      setupQueryMod(cancelForm, (formErr, formRes) => {
        if (formErr) {
          logger.error(
            "Unable to update status at magod_hq_mis.ho_paymentrv_register  due to Wrong SQL query"
          );
        } else {
          // console.log("update form after cancell");
        }
      });

      const adjustmentForm = `UPDATE magod_hq_mis.unit_payment_recd_voucher_register 
      SET On_account=On_account+${totalReceiveNow}, fixedOnaccount=fixedOnaccount+${totalReceiveNow}  where Id='${id}'`;

      setupQueryMod(adjustmentForm, (adjustmentFormErr, adjustmentFormRes) => {
        if (adjustmentFormErr) {
          logger.error(
            "Unable to update On_account  at magod_hq_mis.unit_payment_recd_voucher_register   due to Wrong SQL query"
          );
        } else {
          res.send({ StatusCancel: "Cancelled" });
        }
      });
    }
  });
});

createnew.put("/updateOnaccountValue", (req, res) => {
  const { on_account, id } = req.body;
  console.log("onaccount value in backend  ", on_account);

  const sql = `UPDATE magod_hq_mis.unit_payment_recd_voucher_register u
  SET u.On_account = '${on_account}'
     
  WHERE u.Id = '${id}';
   `;

  setupQueryMod(sql, (err, result) => {
    if (err) {
      logger.error(
        "Unable to update On_account  at magod_hq_mis.unit_payment_recd_voucher_register   due to Wrong SQL query"
      );
    } else {
      return res.json({ Result: "onaccount_success" });
    }
  });
});


createnew.post("/getDCNo", async (req, res, next) => {
  // const { unit, srlType, ResetPeriod, ResetValue, VoucherNoLength, prefix } =
  //   req.body;
  const { unit, srlType, ResetPeriod, ResetValue, VoucherNoLength } = req.body;

  const prefix = "JG";

  const unitName = `${unit}`;
  const date = new Date();
  // const date = new Date("2024-04-01");
  const year = date.getFullYear();
  const startYear = date.getMonth() >= 3 ? year : year - 1;
  const endYear = startYear + 1;

  const firstLetter = unitName.charAt(0).toUpperCase();
  const financialYearStartDate = new Date(`${startYear}-04-01`);
  const financialYearEndDate = new Date(`${endYear}-04-01`);

  const formattedStartDate = financialYearStartDate.toISOString().slice(0, 10);
  const formattedEndDate = financialYearEndDate.toISOString().slice(0, 10);

  const getYear =
    date.getMonth() >= 3 ? `${year}-${year + 1}` : `${year - 1}-${year}`;
  const yearParts = getYear.split("-");
  const startYearShort = yearParts[0].slice(-2);
  const endYearShort = yearParts[1].slice(-2);
  const finYear = `${startYearShort}/${endYearShort}`;

  try {
    const selectQuery = `
    SELECT COUNT(Id) FROM magod_setup.magod_runningno  WHERE SrlType='${srlType}'
    AND UnitName='${unit}' AND Period='${finYear}'
    `;

    setupQueryMod(selectQuery, (selectError, selectResult) => {
      if (selectError) {
        logger.error(selectError);
        return next(selectResult);
      }

      const count = selectResult[0]["COUNT(Id)"];
      // console.log("counttttttttttt", count);

      if (count === 0) {
        const selectPrefixQuery = `
        SELECT * FROM magod_setup.year_prefix_suffix WHERE SrlType='${srlType}'
        AND UnitName='${unit}'
        `;

        setupQueryMod(selectPrefixQuery, (prefixError, prefixResult) => {
          if (prefixError) {
            logger.error(prefixError);
            return next(prefixError);
          }

          const prefix =
            prefixResult[0]?.Prefix !== null ? prefixResult[0]?.Prefix : "";
          const suffix =
            prefixResult[0]?.Suffix !== null ? prefixResult[0]?.Suffix : "";

          // If count is 0, execute the INSERT query
          const insertQuery = `
          INSERT INTO magod_setup.magod_runningno
          (UnitName, SrlType, ResetPeriod, ResetValue, EffectiveFrom_date, Reset_date, Running_No, Prefix, Suffix, Length, Period, Running_EffectiveDate)
          VALUES ('${unit}', '${srlType}', '${ResetPeriod}', ${ResetValue}, '${formattedStartDate}', '${formattedEndDate}',${ResetValue}, '${prefix}','${suffix}', ${VoucherNoLength}, '${finYear}', CurDate());
        `;

          // Execute the INSERT query
          setupQueryMod(insertQuery, (insertError, insertResult) => {
            if (insertError) {
              logger.error(insertError);
              //    console.log("error in insert fro running no", insertError);
              return next(insertResult);
            } else {
              res.json({ message: "Record inserted successfully." });
            }
          });
        });
      } else {
        res.json({ message: "Record already existsssssssssss." });
      }
    });
  } catch (error) {
    //console.error("An error occurred:", error);
    next(error);
  }
});

//----------------------------------------------------------------------

//new form for cretae screen

createnew.post("/saveReceipt", (req, res) => {
  if (req.body.HO_PrvId != "") {
    if (req.body.Amount == "") {
      amount = 0.0;
    } else {
      amount = req.body.Amount;
    }

    const updat =
      "UPDATE magod_hq_mis.ho_paymentrv_register set TxnType=?, Amount=?, On_account=?, Description=?  WHERE HOPrvId =?";

    setupQueryMod(
      updat,
      [
        req.body.TxnType,
        amount,
        req.body.On_account,
        req.body.Description,
        req.body.HO_PrvId,
      ],
      (e, r) => {
        //console.log(e, r)
        if (e) {
          logger.error(e);
          return res.json({ status: "query", Error: "inside signup query" });
        } else {
          // console.log("4121", r);

          return res.json({
            Status: "Success",
            result: { insertId: req.body.HO_PrvId },
          });
        }
      }
    );
  } else {
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    //Check if the data already exists in the database
    const currentDate = new Date().toISOString().slice(0, 10);
    //  console.log("formatDate", currentDate);
    setupQueryMod(
      "SELECT HOPrvId FROM magod_hq_mis.ho_paymentrv_register",
      (error, results) => {
        // console.log(results, 'jhjkkj');
        if (req.body.Amount == "") {
          amount = 0.0;
        } else {
          amount = req.body.Amount;
        }
        const sqlpost =
          "INSERT INTO magod_hq_mis.ho_paymentrv_register(Unitname,Recd_PV_Date, Cust_code, CustName, TxnType, Amount, Description, Status,On_account, HORefDate) VALUES (?   )";
      
          const values = [
          req.body.Unitname,
          currentDate,
          req.body.Cust_code,
          req.body.CustName,
          req.body.TxnType,
          amount,
          req.body.Description,
          req.body.Status,
          req.body.On_account,
          currentDate,
        ];

        setupQueryMod(sqlpost, [values], (err, result) => {
          if (err) {
            logger.error(err);
            return res.json({ status: "query", Error: "inside signup query" });
          } else {
            return res.json({ Status: "Success", result: result });
          }
        });
      }
    );
  }
});

createnew.get("/getreceipt", (req, res) => {
  const receipt_id = req.query.receipt_id; // Access the query parameter "customercode"

  const sql =
    "SELECT  * from magod_hq_mis.ho_paymentrv_register  WHERE HOPrvId=?;";
  setupQueryMod(sql, [receipt_id], (err, result) => {
    if (err) {
      logger.error(err);
      return res.json({ Error: " error in sql" });
    } else {
      return res.json({ Status: "Success", Result: result });
    }
  });
});

createnew.post("/deleteButton", (req, res) => {
  const { receipt_id } = req.body; // Access the query parameter "customercode"

  //delet left tale data
  const fetchleft = `SELECT * from  magod_hq_mis.ho_paymentrv_details WHERE HOPrvId=?`;

  setupQueryMod(fetchleft, [receipt_id], (fetche, fetchres) => {
    if (fetche) {
      logger.error(fetche);
    } else {
      if (fetchres.length > 0) {
        const sql = `DELETE FROM magod_hq_mis.ho_paymentrv_details  WHERE HOPrvId =?`;
        setupQueryMod(sql, [receipt_id], (e, r) => {
          if (e) {
            logger.error(e);
          } else {
            // console.log("delete successfuklyy");
          }
        });
      } else {
        // console.log("can not get left table data for delete");
      }
    }
  });

  const formDelete = `DELETE FROM magod_hq_mis.ho_paymentrv_register  WHERE HOPrvId =?`;

  setupQueryMod(formDelete, [receipt_id], (err, result) => {
    if (err) {
      logger.error(err);
    } else {
      return res.json({ Status: "Success", Result: result });
    }
  });
});

createnew.post("/leftTable", (req, res) => {
  const { receipt_id, unit } = req.body;

  const sql = `SELECT * FROM magod_hq_mis.ho_paymentrv_details   WHERE HOPrvId='${receipt_id}'  `;
  //  const sql=`
  // SELECT DISTINCT Cust_Code , Cust_Name FROM magodmis.draft_dc_inv_register `;
  setupQueryMod(sql, (err, result) => {
    if (err) {
      logger.error(err);
    } else {
      return res.json({ Result: result });
    }
  });
});

// createnew.post("/postInvoiceCreateNew", async (req, res, next) => {
//   const { HO_PrvId, unit, srlType, onacc, receipt_details, id } = req.body;

//   const date = new Date();
//   // const date = new Date("2024-04-01");
//   const year = date.getFullYear();

//   const getYear =
//     date.getMonth() >= 3 ? `${year}-${year + 1}` : `${year - 1}-${year}`;
//   const yearParts = getYear.split("-");
//   const startYearShort = yearParts[0].slice(-2);
//   const endYearShort = yearParts[1].slice(-2);
//   const finYear = `${startYearShort}/${endYearShort}`;

//   try {
//     const prefixQuery = `
//     SELECT Prefix, Suffix FROM magod_setup.year_prefix_suffix WHERE SrlType='${srlType}' AND UnitName='${unit}';
//     `;

//     setupQueryMod(prefixQuery, async (prefixError, prefixResult) => {
//       if (prefixError) {
//         logger.error(prefixError);
//         return next(prefixError);
//       }

//       const prefix =
//         prefixResult[0]?.Prefix !== null ? prefixResult[0]?.Prefix : "";
//       const suffix =
//         prefixResult[0]?.Suffix !== null ? prefixResult[0]?.Suffix : "";

//       const selectQuery = `
//     SELECT * FROM magod_setup.magod_runningno WHERE SrlType='${srlType}' AND UnitName='${unit}' ORDER BY Id DESC LIMIT 1;
//     `;

//       setupQueryMod(selectQuery, async (selectError, selectResult) => {
//         if (selectError) {
//           logger.error(selectError);
//           return next(selectResult);
//         }

//         let newHrefNo = "";

//         if (selectResult && selectResult.length > 0) {
//           const lastRunNo = selectResult[0].Running_No;
//           const numericPart = parseInt(lastRunNo) + 1;

//           const paddedNumericPart = numericPart.toString().padStart(4, "0");

//           newHrefNo = `HO RV/ ${paddedNumericPart}`;

//           // Update Running_No in magod_setup.magod_runningno
//           const updateRunningNoQuery = `
//           UPDATE magod_setup.magod_runningno
//           SET Running_No = ${numericPart},
//           Prefix = '${prefix}',
//           Suffix = '${suffix}',
//           Running_EffectiveDate = CURDATE()
//           WHERE SrlType='${srlType}' AND UnitName='${unit}' AND Period='${finYear}'  ;
//         `;
//           console.log(
//             "unit name update  updateRunningNoQuery running number ",
//             unit,
//             updateRunningNoQuery
//           );
//           setupQueryMod(updateRunningNoQuery, (updateError, updateResult) => {
//             if (updateError) {
//               // logger.error(updateError);
//               return next(updateResult);
//             }
//           });
//         }

//         //update open invoice table(right side table)

//         if (receipt_details.length > 0) {
//           receipt_details.forEach((item, index) => {
//             const updateRightTable = `UPDATE magod_hq_mis.unit_invoices_list u
//           SET u.PymtAmtRecd = u.PymtAmtRecd+${item.Receive_Now},
//               u.DCStatus = IF(u.GrandTotal = u.PymtAmtRecd, 'Closed', 'Despatched')
//           WHERE u.UnitName = 'Jigani' AND u.DC_Inv_No = ${item.Dc_inv_no};
//           `;

//             setupQueryMod(updateRightTable, (rightError, rightResult) => {
//               if (rightError) {
//                 // console.log("righterror", rightError);
//               } else {
//                 // console.log("update right table successfully");
//               }
//             });
//           });
//         }

//         // Your existing update query
//         setupQueryMod(
//           `UPDATE magod_Hq_Mis.ho_paymentrv_register
//         SET HoRefDate = curdate(), Unitname='${unit}',
//         HORef = '${newHrefNo}',

//         Status = 'Pending'
//         WHERE HOPrvId = '${HO_PrvId}'`,
//           async (updateError, updateResult) => {
//             if (updateError) {
//               // logger.error(updateError);
//               return next(updateResult);
//             }

//             // Your existing select query after update
//             const postUpdateSelectQuery = `SELECT * FROM magod_hq_mis.ho_paymentrv_register WHERE HOPrvId = ${HO_PrvId}`;
//             setupQueryMod(
//               postUpdateSelectQuery,
//               (postUpdateSelectError, postUpdateSelectResult) => {
//                 if (postUpdateSelectError) {
//                   logger.error(postUpdateSelectError);
//                   return next(postUpdateSelectResult);
//                 }

//                 res.json(postUpdateSelectResult);
//               }
//             );
//           }
//         );
//       });
//     });
//   } catch (error) {
//     // console.error("An error occurred:", error);
//     next(error);
//   }
// });

//get details from  rowData through drfts

createnew.post("/postInvoiceCreateNew", async (req, res, next) => {
  const { HO_PrvId, unit, srlType, onacc, receipt_details, id } = req.body;
  const HQUnitName = "HQ";
  const date = new Date();
  // const date = new Date("2024-04-01");
  const year = date.getFullYear();

  const getYear =
    date.getMonth() >= 3 ? `${year}-${year + 1}` : `${year - 1}-${year}`;
  const yearParts = getYear.split("-");
  const startYearShort = yearParts[0].slice(-2);
  const endYearShort = yearParts[1].slice(-2);
  const finYear = `${startYearShort}/${endYearShort}`;

  try {
    const prefixQuery = `
    SELECT Prefix, Suffix FROM magod_setup.year_prefix_suffix WHERE SrlType='${srlType}' AND UnitName='${HQUnitName}';
    `;

    setupQueryMod(prefixQuery, async (prefixError, prefixResult) => {
      if (prefixError) {
        logger.error(prefixError);
        return next(prefixError);
      }

      const prefix =
        prefixResult[0]?.Prefix !== null ? prefixResult[0]?.Prefix : "";
      const suffix =
        prefixResult[0]?.Suffix !== null ? prefixResult[0]?.Suffix : "";

      const selectQuery = `
    SELECT * FROM magod_setup.magod_runningno WHERE SrlType='${srlType}' AND UnitName='${HQUnitName}' ORDER BY Id DESC LIMIT 1;
    `;

      setupQueryMod(selectQuery, async (selectError, selectResult) => {
        if (selectError) {
          logger.error(selectError);
          return next(selectResult);
        }

        let newHrefNo = "";

        if (selectResult && selectResult.length > 0) {
          const lastRunNo = selectResult[0].Running_No;
          const numericPart = parseInt(lastRunNo) + 1;

          const paddedNumericPart = numericPart.toString().padStart(4, "0");

          newHrefNo = `HO RV/ ${paddedNumericPart}`;

          // Update Running_No in magod_setup.magod_runningno
          const updateRunningNoQuery = `
          UPDATE magod_setup.magod_runningno
          SET Running_No = ${numericPart},
          Prefix = '${prefix}',
          Suffix = '${suffix}',
          Running_EffectiveDate = CURDATE()
          WHERE SrlType='${srlType}' AND UnitName='${HQUnitName}' AND Period='${finYear}'  ;
        `;
          console.log(
            "unit name update  updateRunningNoQuery running number ",
            unit,
            updateRunningNoQuery
          );
          setupQueryMod(updateRunningNoQuery, (updateError, updateResult) => {
            if (updateError) {
              logger.error(updateError);
              return next(updateResult);
            }
          });
        }

        //update open invoice table(right side table)

        if (receipt_details.length > 0) {
          receipt_details.forEach((item, index) => {
            //   const updateRightTable = `UPDATE magod_hq_mis.unit_invoices_list u
            // SET u.PymtAmtRecd = u.PymtAmtRecd+${item.Receive_Now},
            //     u.DCStatus = IF(u.GrandTotal = u.PymtAmtRecd, 'Closed', 'Despatched')
            // WHERE u.UnitName = 'Jigani' AND u.DC_Inv_No = ${item.Dc_inv_no};
            // `;
            const updateRightTable = `
  UPDATE magod_hq_mis.unit_invoices_list u
  SET u.PymtAmtRecd = u.PymtAmtRecd + ?,
      u.DCStatus = IF(u.GrandTotal = u.PymtAmtRecd, 'Closed', 'Despatched')
  WHERE u.UnitName = ? AND u.DC_Inv_No = ?;
`;

            setupQueryMod(
              updateRightTable,
              [item.Receive_Now, unit, item.Dc_inv_no],
              (rightError, rightResult) => {
                if (rightError) {
                  logger.error(rightError);
                  // console.log("righterror", rightError);
                } else {
                  // console.log("update right table successfully");
                }
              }
            );
          });
        }

        // Your existing update query
        setupQueryMod(
          `UPDATE magod_Hq_Mis.ho_paymentrv_register
        SET HoRefDate = curdate(), Unitname='${unit}',
        HORef = '${newHrefNo}',
        
        Status = 'Pending'
        WHERE HOPrvId = '${HO_PrvId}'`,
          async (updateError, updateResult) => {
            if (updateError) {
              logger.error(updateError);
              return next(updateResult);
            }

            // Your existing select query after update
            const postUpdateSelectQuery =
             `SELECT * FROM magod_hq_mis.ho_paymentrv_register WHERE HOPrvId = ${HO_PrvId}`;
           
             setupQueryMod(
              postUpdateSelectQuery,
              (postUpdateSelectError, postUpdateSelectResult) => {
                if (postUpdateSelectError) {
                  logger.error(postUpdateSelectError);
                  return next(postUpdateSelectResult);
                }

                res.json(postUpdateSelectResult);
              }
            );
          }
        );
      });
    });
  } catch (error) {
    // console.error("An error occurred:", error);
    next(error);
  }
});
createnew.get("/getFormByRowData", (req, res) => {
  const receipt_id = req.query.receipt_id;

  const sql = `SELECT * FROM magod_hq_mis.ho_paymentrv_register WHERE HOPrvId ='${receipt_id}' `;

  setupQueryMod(sql, (err, result) => {
    if (err) {
      logger.error(err);
    } else {
      //  console.log("result row data", result);
      return res.json({ Result: result });
    }
  });
});

createnew.post("/cancelCreateNewScreen", (req, res) => {
  const { HO_PrvId, custName, totalReceiveNow ,unit} = req.body;

  const fetchLeft = `SELECT * FROM magod_hq_mis.ho_paymentrv_details WHERE HOPrvId='${HO_PrvId}'`;

  const rightTable = `SELECT u.*
                      FROM magod_hq_mis.unit_invoices_list u
                      WHERE u.UnitName = '${unit}'
                        AND u.Cust_Name = '${custName}'
                        `;

  setupQueryMod(rightTable, (rightErr, rightRes) => {
    if (rightErr) {
      logger.error(rightErr);
    } else {
       console.log("right table result cancel after",rightRes);
       console.log("right table open inv result.length",rightRes.length)
      setupQueryMod(fetchLeft, (leftErr, leftResult) => {
        if (leftErr) {
          logger.error(leftErr);
          // console.log("left table error after cancel", leftErr);
        } else {
           console.log("left table res after cancel",leftResult);

          leftResult.forEach((item, index) => {
            
            
            const receiveNowNumeric = parseFloat(item.Receive_Now);
            const matchingEntry = rightRes.find(
              (entry) => entry.DC_Inv_No === item.Dc_inv_no
            );
            console.log("matchingEntry for  cancel",matchingEntry);
            
            
            if (matchingEntry) {
              // Execute an update query to update the entry in the unit_invoices_list table

              const updateQuery = `UPDATE magod_hq_mis.unit_invoices_list 
                                   SET PymtAmtRecd=PymtAmtRecd-${receiveNowNumeric} ,
                                   DCStatus = CASE 
                                                    WHEN GrandTotal - ${receiveNowNumeric} = 0 THEN 'Closed'
                                                    WHEN GrandTotal - ${receiveNowNumeric} > 0 THEN 'Despatched'
                                                    ELSE 'OverPaid'
                                                 END 
                                   WHERE DC_Inv_No = ${item.Dc_inv_no}`;

                                   console.log("paymnt after cancel ", updateQuery);
                                   

              // const updateQuery = `UPDATE magod_hq_mis.unit_invoices_list
              // SET PymtAmtRecd=PymtAmtRecd -${receiveNowNumeric},
              // DCStatus ='Despatched'
              // WHERE DC_Inv_No = ${item.Dc_inv_no}`;
              // console.log("update right table query", updateQuery);

              setupQueryMod(updateQuery, (updateErr, updateRes) => {
                if (updateErr) {
                  logger.error(updateErr);
                } else {
                  // Update successful
                  // console.log("update right table after cancel");
                }
              });
            } else {
               console.log("there is no matched data  after cancell");
            }
          });
        }
      });

      //update the form data and adjustmemt voucher form data

      const cancelForm = `UPDATE magod_hq_mis.ho_paymentrv_register  
      SET Status='Cancelled' where HOPrvId='${HO_PrvId}'`;

      setupQueryMod(cancelForm, (formErr, formRes) => {
        if (formErr) {
          logger.error(formErr);
        } else {
          res.send({ StatusCancel: "Cancelled" });
        }
      });
    }
  });
});

createnew.get("/txnTypes", (req, res) => {
  const sql = "SELECT TxnType FROM magod_setup.txndb";

  setupQueryMod(sql, (err, result) => {
    if (err) {
      console.log("err in txn types ", err);
      logger.error(err);
      return res.json({ Error: " error in sql" });
    } else {
      console.log("txn types result ", result);
      return res.json({ Status: "Success", Result: result });
    }
  });
});

createnew.post("/getAddress", (req, res) => {
  console.log(req.body.adj_unitname, "unit name for address");
  
  const unit = req.body.adj_unitname;

  // const sql = `SELECT   Unit_Address , RegistredOfficeAddress FROM magod_setup.magodlaser_units where UnitName='${unit}' `;
 
  const sql = `SELECT DISTINCT UnitName , RegistredOfficeAddress,PhonePrimary, PhoneSecondary,URL, GST_No, CIN_No,Unit_Address, Email FROM magod_setup.magodlaser_units where UnitName='${unit}';`;
 
  setupQueryMod(sql, (err, result) => {
    if (err) {
      logger.error(
        "Unable to fetch Unit_Address , RegistredOfficeAddress from magod_hq_mis.unit_invoices_list due to Wrong SQL query"
      );
    } else {
      console.log("unut address ", result.length);
      
      return res.json({ Result: result });
    }
  });
});




//new insertForm logic 




module.exports = createnew;
