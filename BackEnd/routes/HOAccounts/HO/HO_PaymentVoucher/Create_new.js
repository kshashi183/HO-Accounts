const createnew = require("express").Router();

const { setupQueryMod, misQuery } = require("../../../../helpers/dbconn")




createnew.get('/ho_openInvoices', (req, res) => {
  const custcode = req.query.customercode;
  console.log("HO INV custcodeeeee", custcode);
  const sql = `SELECT *,
      DATE_FORMAT(Inv_Date, '%d-%m-%Y') AS Formatted_Inv_Date
      FROM magod_hq_mis.unit_invoices_list
      WHERE UnitName = 'Jigani'
        AND Cust_Code='${custcode}'
        AND ABS(GrandTotal - PymtAmtRecd) > 0
        AND DCStatus <> 'Closed'; `;
  //  const sql=`
  // SELECT DISTINCT Cust_Code , Cust_Name FROM magodmis.draft_dc_inv_register `;
  setupQueryMod(sql, (err, result) => {
    if (err) {
      console.log("err in query", err);
    }
    else {
      //  console.log("HO open invoice", result);
      return res.json({ Result: result });
    }
  })
})



// createnew.get('/getFormData', (req, res) => {
// const receipt_id = req.query.receipt_id
// //const receipt_id = 245


//   console.log("receipt_id  hoprvid", receipt_id);
//   // const sql = `SELECT * from magod_hq_mis.ho_paymentrv_register  WHERE HOPrvId='${receipt_id}' `;
//   const sql = `SELECT * from magod_hq_mis.ho_paymentrv_register  WHERE Unit_RecdPVid='${receipt_id}' `;
//   //  const sql=`
//   // SELECT DISTINCT Cust_Code , Cust_Name FROM magodmis.draft_dc_inv_register `;
//   setupQueryMod(sql, (err, result) => {
//     if (err) {
//       console.log("err in query", err);
//     }
//     else {
//      // console.log("form data", result);
//       return res.json({ Result: result });
//     }
//   })
// })


createnew.get('/getFormData', (req, res) => {
  const receipt_id = req.query.cust_code
  //const receipt_id = 245


  console.log("receipt_id  hoprvid", receipt_id);
  // const sql = `SELECT * from magod_hq_mis.ho_paymentrv_register  WHERE HOPrvId='${receipt_id}' `;
  const sql = `SELECT * from magod_hq_mis.ho_paymentrv_register  WHERE Cust_code='${receipt_id}' `;
  //  const sql=`
  // SELECT DISTINCT Cust_Code , Cust_Name FROM magodmis.draft_dc_inv_register `;
  setupQueryMod(sql, (err, result) => {
    if (err) {
      console.log("err in query", err);
    }
    else {
      // console.log("form data", result);
      return res.json({ Result: result });
    }
  })
})


createnew.get('/getleftTable', (req, res) => {
  const receipt_id = req.query.receipt_id
  // const receipt_id=1
  // console.log("custcodeeeee", receipt_id);
  const sql = `SELECT * FROM magod_hq_mis.ho_paymentrv_details   WHERE HOPrvId='${receipt_id}' `;
  //  const sql=`
  // SELECT DISTINCT Cust_Code , Cust_Name FROM magodmis.draft_dc_inv_register `;
  setupQueryMod(sql, (err, result) => {
    if (err) {
      console.log("err in query", err);
    }
    else {
      //console.log("left table", result);
      return res.json({ Result: result });
    }
  })
})


//   createnew.get('/updateHoprvID', (req, res) => {

//    const sql = `SELECT MAX(HOPrvId) AS maxHOPrvId FROM magod_hq_mis.unit_payment_recd_voucher_register `;
//    //  const sql=`
//    // SELECT DISTINCT Cust_Code , Cust_Name FROM magodmis.draft_dc_inv_register `;
//    setupQueryMod(sql, (err, result) => {
//      if (err) {
//        console.log("err in query", err);
//      }
//      else {
//       // console.log("left table", result);
//       const maxHOPrvId = result[0].maxHOPrvId || 0; // Default to 0 if no max HOPrvId found
//       const nextHOPrvId = maxHOPrvId + 1;
//       console.log("hoprvid",nextHOPrvId );
//       res.json({ nextHOPrvId });
//      }
//    })
//  })



// Unit RV Adjustment backend code 
// createnew.post('/insertToparentForm', (req, res) => {
//   const rows = req.body.adjustmentRows
//   // const receipt_id=1
//   rows.Amount = 0;
//   rows.Description = `Adjustment Against Receipt  ${rows.Recd_PVNo}`;
//   rows.TxnType = 'Adjustment'



//   const selectQuery11 = `SELECT * FROM magod_hq_mis.ho_paymentrv_register WHERE Unit_RecdPVid = '${rows.RecdPVID}'`;
//   setupQueryMod(selectQuery11, (fetcherr, fetchRes) => {
//     if (fetcherr) {
//       console.log("errr", fetcherr);
//     }
//     else {

//     }

//   })



//   console.log("insert to form", rows.Id);
//   const sql = `INSERT INTO magod_hq_mis.ho_paymentrv_register
//  (Unitname,  Cust_code, CustName, TxnType, Amount, Description, HoRefDate,Unit_RecdPVid ) 
//  VALUES ('${rows.Unitname}', '${rows.Cust_code}' , '${rows.CustName}','${rows.TxnType}', '${rows.Amount}',
//   '${rows.Description}', CURDATE(), '${rows.RecdPVID}' ) `;

//   setupQueryMod(sql, (err, result) => {
//     if (err) {
//       console.log("Error in insert query:", err);
//       return res.status(500).json({ error: "Failed to insert record" });
//     }

//     const selectQuery = `SELECT * FROM magod_hq_mis.ho_paymentrv_register WHERE Unit_RecdPVid ='${rows.RecdPVID}' `;

//     setupQueryMod(selectQuery, (er, selectResult) => {

//       if (er) {
//         console.log("Error in select query:", selectErr);
//         return res.status(500).json({ error: "Failed to fetch inserted record" });
//       }

//       else {
//         //console.log("fetch res", selectResult);
//         res.json({ insertedRecord: selectResult });
//       }
//     })

//   })

// })

createnew.post('/insertToparentForm', (req, res) => {
  const rows = req.body.adjustmentRows;

  //console.log("rowsss", rows);

  // Check if any records exist with the same Unit_RecdPVid
  const selectQuery = `SELECT * FROM magod_hq_mis.ho_paymentrv_register WHERE Unit_RecdPVid = '${rows.RecdPVID}'  `;
  setupQueryMod(selectQuery, (err, selectResult) => {
    if (err) {
      console.log("Error in select query:", err);
      return res.status(500).json({ error: "Failed to check existing records" });
    }

    // If no records exist with the same Unit_RecdPVid, proceed with insertion
    if (selectResult.length === 0) {
      // Modify rows object properties
      rows.Amount = 0;
      rows.Description = `Adjustment Against Receipt ${rows.Recd_PVNo}`;
      rows.TxnType = 'Adjustment';

      console.log("insert to form", rows.Id);

      // Construct the SQL query to insert a new record
      const insertQuery = `INSERT INTO magod_hq_mis.ho_paymentrv_register
                           (Unitname, Cust_code, CustName, TxnType, Amount, Description, HoRefDate, Unit_RecdPVid) 
                           VALUES ('${rows.Unitname}', '${rows.Cust_code}', '${rows.CustName}', '${rows.TxnType}', '${rows.Amount}', '${rows.Description}', CURDATE(), '${rows.RecdPVID}')`;

      // Execute the insert query
      setupQueryMod(insertQuery, (insertErr, insertResult) => {
        if (insertErr) {
          console.log("Error in insert query:", insertErr);
          return res.status(500).json({ error: "Failed to insert record" });
        }

        const sql2 = `SELECT * FROM magod_hq_mis.ho_paymentrv_register WHERE Unit_RecdPVid ='${rows.RecdPVID}'`
        setupQueryMod(sql2, (fetchingErr, fetchedData) => {
          if (fetchingErr) {
            console.log("err", fetchingErr);
          }
          else {
            res.json({ insertedRecord: fetchedData });
          }

        })
        // Send success response with the inserted record

      });
    }

    else {
      // If records with the same Unit_RecdPVid exist, send a message indicating the conflict
      // res.status(400).json({ error: "Record with the same Unit_RecdPVid already exists" });
      console.log("already exsit Record with the same Unit_RecdPVid already exists",);


      const fetch = `SELECT * FROM magod_hq_mis.ho_paymentrv_register WHERE Unit_RecdPVid = '${rows.RecdPVID}'  AND Status NOT IN ('Pending', 'Cancelled')`

      setupQueryMod(fetch, (e, r) => {
        if (e) {
          console.log("e", e);
        }
        else {
          //console.log("already exist ", r);
          res.json({ insertedRecord: r });
        }
      })

    }
  });
});



createnew.delete("/deleteleft", (req, res) => {
  const ho = req.body.hoid
  // console.log("delete", req.params, typeof (uid));
  console.log("deleyte ", req.body.onacc);


  //update on account value after delete the form 


  const update = `UPDATE magod_hq_mis.unit_payment_recd_voucher_register u
SET u.On_account = '${req.body.onacc}'
   
WHERE u.Id = '${req.body.id}';
 `;

  setupQueryMod(update, (err, result) => {
    if (err) {
      console.log("err in query", err);
    }
    else {
      console.log("update onaccount after result", result);


    }
  })





  const sql =
    `DELETE FROM magod_hq_mis.ho_paymentrv_details  WHERE HOPrvId ='${ho}'`;
  setupQueryMod(sql, (err, result) => {
    if (err) {
      console.log("fail to delete", err);
      return res.json({ Error: " err in sql" });
    }
    else {
      console.log("result delete", result);

      const sql2 = `DELETE FROM magod_hq_mis.ho_paymentrv_register WHERE HOPrvId ='${ho}'`;
      setupQueryMod(sql2, (err2, result2) => {
        if (err2) {
          console.log("Failed to delete from ho_paymentrv_register", err2);
          return res.status(500).json({ Error: "Error in SQL query for ho_paymentrv_register" });
        } else {
          console.log("Deleted from ho_paymentrv_register:", result2);
          return res.json({ Status: "Success" });
        }
      });

      // return res.json({ Status: "Success" });
    }
  });
});



createnew.put('/updateReceiveNowAmount', (req, res) => {
  const recept = req.body.receipt_details
  console.log("recept update", req.body);

  recept.forEach(item => {
    const { Dc_inv_no, Receive_Now } = item;

    // Construct the SQL query to update the Receive_Now field
    const sql = `
    UPDATE magod_hq_mis.ho_paymentrv_details 
    SET Receive_Now = ${Receive_Now} 
    WHERE Dc_inv_no = ${Dc_inv_no}
  `;

    // Execute the SQL query
    setupQueryMod(sql, (err, result) => {
      if (err) {
        console.error("Failed to update Receive_Now:", err);
      } else {
        console.log("receivenow update successfully");





      }
    });
  });

  res.send({ Status: 'Success' })

})



// createnew.post("/cancelUpdate", async (req, res, next) => {
//   try {
//     const { HO_PrvId, } = req.body;
//     console.log("REQ_BODY", req.body);


//     //fetch receipt details
//     const sqlquery = ` SELECT * FROM magod_hq_mis.ho_paymentrv_details  WHERE HOPrvId='${HO_PrvId}'`
//     setupQueryMod(sqlquery, (err, resu) => {
//       if (err) {

//       }
//       else {
//         console.log("cncel res", resu);


//         if (resu.length > 0) {

//           resu.forEach((item) => {
//             const { UnitName, Dc_inv_no } = item

//             const sql = `UPDATE magod_hq_mis.unit_invoices_list d
//           JOIN (
//               SELECT 
//                   CASE WHEN SUM(a.Receive_Now) IS NULL THEN 0 ELSE SUM(a.Receive_Now) END AS Receive_now 
//               FROM (
//                   SELECT 
//                       p.Receive_Now,
//                       p1.Recd_PvNo AS VrNo
//                   FROM 
//                       magod_hq_mis.unit_payment_recd_voucher_details p
//                       JOIN magod_hq_mis.unit_payment_recd_voucher_register p1 
//                           ON p1.RecdPVID = p.RecdPVID
//                   WHERE  
//                       p1.Unitname = '${UnitName}' 
//                       AND p.Dc_inv_no = '${Dc_inv_no}'
//                       AND NOT (p1.PRV_Status LIKE 'Cancelled' OR p1.PRV_Status LIKE 'Draft')
//                   UNION
//                   SELECT 
//                       p.Receive_Now,
//                       p1.HORef AS VrNo
//                   FROM 
//                       magod_hq_mis.ho_paymentrv_details p
//                       JOIN magod_hq_mis.ho_paymentrv_register p1 
//                           ON p1.HOPrvId = p.HOPrvId
//                   WHERE  
//                       p1.Unitname = '${UnitName}'
//                       AND p.Dc_inv_no = '${Dc_inv_no}'
//                       AND NOT (p1.Status LIKE 'Cancelled' OR p1.Status LIKE 'Draft')
//               ) AS a
//           ) AS b ON 1=1
//           SET 
//               d.PymtAmtRecd = b.Receive_now,
//               d.DCStatus = CASE 
//                   WHEN d.grandTotal - b.receive_now = 0 THEN 'Closed'
//                   WHEN d.grandTotal - b.receive_now > 0 THEN 'Despatched'
//                   ELSE 'OverPaid' 
//               END
//           WHERE 
//               d.Unitname = '${UnitName}' 
//               AND d.Dc_inv_no = '${Dc_inv_no}';`;

//             setupQueryMod(sql, (e, r) => {
//               if (e) {
//                 console.log("update error cancel ", e);
//               }
//               else {
//                 console.log("update sucess cancel");
//               }

//             })
//           })



//         }

//       }
//     })

//   }
//   catch (err) {
//     console.log("err in canmcel catch block", err);
//   }
// });



// createnew.post("/cancelUpdate", async (req, res, next) => {
//   try {
//     const {HO_PrvId,r} = req.body; // Assuming rvData contains your receipt details

//     console.log("cancel result111111111", r);
// //     const receptFetch = `SELECT * FROM magod_hq_mis.ho_paymentrv_details WHERE HOPrvId='${HO_PrvId}'`;
// //     const receiptDetails = await setupQueryMod(receptFetch);

// // console.log("cancel result", receiptDetails);
// //     if (!Array.isArray(receiptDetails)) {
// //       console.log("    rvData.data.receipt_details is not iterable");
// //       throw new Error('Receipt details fetched are not in the expected format.');
// //     }

// //     // Assuming rvData is extracted from the fetched receipt details
// //     const rvData = { data: { receipt_details: receiptDetails } };





//     for (const receiptDetail of r) {
//       const Unitname = receiptDetail.Unitname;
//       const Dc_inv_no = receiptDetail.Dc_inv_no;
// console.log("unt and dc no ",  Unitname, Dc_inv_no);
//       // First query
//       const firstQuery = `
//         SELECT 
//             CASE WHEN SUM(a.Receive_Now) IS NULL THEN 0 ELSE SUM(a.Receive_Now) END AS Receive_now 
//         FROM (
//             SELECT 
//                 p.Receive_Now,
//                 p1.Recd_PvNo AS VrNo
//             FROM 
//                 magod_hq_mis.unit_payment_recd_voucher_details p
//                 JOIN magod_hq_mis.unit_payment_recd_voucher_register p1 
//                     ON p1.RecdPVID = p.RecdPVID
//             WHERE  
//                 p1.Unitname = '${Unitname}' 
//                 AND p.Dc_inv_no = '${Dc_inv_no}'
//                 AND NOT (p1.PRV_Status LIKE 'Cancelled' OR p1.PRV_Status LIKE 'Draft')
//             UNION
//             SELECT 
//                 p.Receive_Now,
//                 p1.HORef AS VrNo
//             FROM 
//                 magod_hq_mis.ho_paymentrv_details p
//                 JOIN magod_hq_mis.ho_paymentrv_register p1 
//                     ON p1.HOPrvId = p.HOPrvId
//             WHERE  
//                 p1.Unitname = '${Unitname}'
//                 AND p.Dc_inv_no = '${Dc_inv_no}'
//                 AND NOT (p1.Status LIKE 'Cancelled' OR p1.Status LIKE 'Draft')
//         ) AS a
//       `;
//       const firstResults = await setupQueryMod(firstQuery);
//       console.log("first result ",firstResults );

//       if (firstResults.length > 0) {
//         const receiveNow = firstResults[0].Receive_now;

//         // Second query dependent on the result of the first query
//         const secondQuery = `
//           UPDATE magod_hq_mis.unit_invoices_list d
//           SET 
//               d.PymtAmtRecd = ${receiveNow},
//               d.DCStatus = CASE 
//                   WHEN d.grandTotal - ${receiveNow} = 0 THEN 'Closed'
//                   WHEN d.grandTotal - ${receiveNow} > 0 THEN 'Despatched'
//                   ELSE 'OverPaid' 
//               END
//           WHERE 
//               d.Unitname = '${Unitname}' 
//               AND d.Dc_inv_no = '${Dc_inv_no}';
//         `;
//         const secondResults = await setupQueryMod(secondQuery);

//         console.log('Second query executed successfully:', secondResults);
//       } else {
//         console.log('No results found for the first query.');
//       }
//     }

//     res.status(200).send('Cancel update completed');
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).send('Error executing cancel update');
//   }
// });

createnew.post('/cancelUpdate', async (req, res) => {

  
  let totalReceiveNow=0;

  const fetchLeft = `SELECT * FROM magod_hq_mis.ho_paymentrv_details WHERE HOPrvId=2524`;

  const rightTable = `SELECT u.*
                      FROM magod_hq_mis.unit_invoices_list u
                      WHERE u.UnitName = 'Jigani'
                        AND u.Cust_Code = 2291`;

  setupQueryMod(rightTable, (rightErr, rightRes) => {
    if (rightErr) {
      // Handle error if needed
    } else {
      setupQueryMod(fetchLeft, (leftErr, leftResult) => {
        if (leftErr) {
          // Handle error if needed
        } else {
          leftResult.forEach((item, index) => {
            const matchingEntry = rightRes.find(entry => entry.Dc_inv_no === item.Dc_inv_No);
            if (matchingEntry) {
              totalReceiveNow += matchingEntry.Receive_Now;
              // Execute an update query to update the entry in the unit_invoices_list table
              const updateQuery = `UPDATE magod_hq_mis.unit_invoices_list 
                                   SET PymtAmtRecd=PymtAmtRecd-${matchingEntry.Receive_Now} ,
                                   DCStatus = CASE 
                                                    WHEN GrandTotal - ${matchingEntry.Receive_Now} = 0 THEN 'Closed'
                                                    WHEN GrandTotal - ${matchingEntry.Receive_Now} > 0 THEN 'Despatched'
                                                    ELSE 'OverPaid'
                                                 END 
                                   WHERE DC_Inv_No = ${matchingEntry.Dc_inv_no}`;

              setupQueryMod(updateQuery, (updateErr, updateRes) => {
                if (updateErr) {
                  // Handle error if needed
                } else {
                  // Update successful
                  console.log("update right table after cancel");


                  const cancelForm=`UPDATE magod_hq_mis.ho_paymentrv_register  
                  SET Status='Cancelled' where HOPrvId=${matchingEntry.HOPrvId}`

                  setupQueryMod(cancelForm,(formErr,formRes)=>{
                    if(formErr){

                    }
                    else{
                      console.log("update form after cancell");
                    }

                  })


                  const adjustmentForm=`UPDATE magod_hq_mis.unit_payment_recd_voucher_register 
                  SET On_account=On_account+${totalReceiveNow} where HOPrvId=${matchingEntry.HOPrvId}`

                  setupQueryMod(adjustmentForm,(adjustmentFormErr,adjustmentFormRes)=>{
                    if(adjustmentFormErr){

                    }
                    else{
                      console.log("update adjustment  button form after cancell");
                    }

                  })
                }
              });

            }
          });
        }
      });
    }
  });
});



createnew.put('/updateOnaccountValue', (req, res) => {
  const { on_account, id } = req.body
  // const receipt_id=1
  console.log("on account ", on_account, id);
  const sql = `UPDATE magod_hq_mis.unit_payment_recd_voucher_register u
  SET u.On_account = '${on_account}'
     
  WHERE u.Id = '${id}';
   `;

  setupQueryMod(sql, (err, result) => {
    if (err) {
      console.log("err in query", err);
    }
    else {
      console.log("update onaccount", result);
      return res.json({ Result: "onaccount_success" });
    }
  })
})







createnew.post("/getDCNo", async (req, res, next) => {
  // const { unit, srlType, ResetPeriod, ResetValue, VoucherNoLength, prefix } =
  //   req.body;
  const { unit, srlType, ResetPeriod, ResetValue, VoucherNoLength } =
    req.body;

  const prefix = 'JG';

  const unitName = `${unit}`;
  const date = new Date();
  // const date = new Date("2024-04-01");
  const year = date.getFullYear();
  const startYear = date.getMonth() >= 3 ? year : year - 1;
  const endYear = startYear + 1;

  console.log("startYear", startYear);
  console.log("endYear", endYear);

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

  console.log("finYear", finYear);

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

      if (count === 0) {
        // If count is 0, execute the INSERT query
        const insertQuery = `
          INSERT INTO magod_setup.magod_runningno
          (UnitName, SrlType, ResetPeriod, ResetValue, EffectiveFrom_date, Reset_date, Running_No, Prefix, Length, Period, Running_EffectiveDate)
          VALUES ('${unit}', '${srlType}', '${ResetPeriod}', ${ResetValue}, '${formattedStartDate}', '${formattedEndDate}',${ResetValue}, '${prefix}', ${VoucherNoLength}, '${finYear}', CurDate());
        `;

        // Execute the INSERT query
        setupQueryMod(insertQuery, (insertError, insertResult) => {
          if (insertError) {
            logger.error(insertError);
            return next(insertResult);
          }

          res.json({ message: "Record inserted successfully." });
        });
      } else {
        res.json({ message: "Record already exists." });
      }
    });
  } catch (error) {
    console.error("An error occurred:", error);
    next(error);
  }
});

module.exports = createnew;