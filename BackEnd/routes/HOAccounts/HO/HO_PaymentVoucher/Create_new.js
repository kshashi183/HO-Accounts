const createnew = require("express").Router();

const { setupQueryMod, misQuery,setupQuery } = require("../../../../helpers/dbconn")




createnew.get('/ho_openInvoices', (req, res) => {
  const custcode = req.query.customercode;
 
 const unitname = req.query.unitname;
  
  console.log("HO INV custcodeeeee", custcode,unitname);
  // const sql = `SELECT *,
  //     DATE_FORMAT(Inv_Date, '%d-%m-%Y') AS Formatted_Inv_Date
  //     FROM magod_hq_mis.unit_invoices_list
  //     WHERE UnitName = 'Jigani'
  //       AND Cust_Code='${custcode}'
  //       AND ABS(GrandTotal - PymtAmtRecd) > 0
  //       AND DCStatus <> 'Closed'; `;

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
      console.log("err in query", err);
    }
    else {
      // console.log("HO open invoice", result);
      return res.json({ Result: result });
    }
  })
})


createnew.get('/ho_openInvoicesADJUST', (req, res) => {
  const custcode = req.query.customercode;
 
 
  
  console.log("HO INV custcodeeeee", custcode);
  // const sql = `SELECT *,
  //     DATE_FORMAT(Inv_Date, '%d-%m-%Y') AS Formatted_Inv_Date
  //     FROM magod_hq_mis.unit_invoices_list
  //     WHERE UnitName = 'Jigani'
  //       AND Cust_Code='${custcode}'
  //       AND ABS(GrandTotal - PymtAmtRecd) > 0
  //       AND DCStatus <> 'Closed'; `;

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
      console.log("err in query", err);
    }
    else {
       console.log("HO open adjustment invoice", result);
      return res.json({ Result: result });
    }
  })
})






createnew.post('/getFormData', (req, res) => {
  const { receipt_id, custCode } = req.body
  //const receipt_id = 245


  console.log("receipt_id  hoprvid form", req.body)
  //const receipt_id = 245);
  // const sql = `SELECT * from magod_hq_mis.ho_paymentrv_register  WHERE HOPrvId='${receipt_id}' `;
  const sql = `SELECT * from magod_hq_mis.ho_paymentrv_register  WHERE HOPrvId='${receipt_id}' AND Cust_code='${custCode}' AND Unit_RecdPVid=0 `;
  //  const sql=`
  // SELECT DISTINCT Cust_Code , Cust_Name FROM magodmis.draft_dc_inv_register `;
  setupQueryMod(sql, (err, result) => {
    if (err) {
      console.log("err in query", err);
    }
    else {
     console.log("form data", result);
      return res.json({ Result: result });
    }
  })
})


createnew.post('/getleftTable', (req, res) => {
  const { receipt_id } = req.body
  // const receipt_id=1
  console.log("left table dataaaaaaaaaaaaaaaaaaaaaaaa");
  
  const unit='Jigani'
  console.log(" left table data", receipt_id, unit);
  const sql = `SELECT * FROM magod_hq_mis.ho_paymentrv_details   WHERE HOPrvId='${receipt_id}' AND UnitName='${unit}' `;
  //  const sql=`
  // SELECT DISTINCT Cust_Code , Cust_Name FROM magodmis.draft_dc_inv_register `;
  setupQueryMod(sql, (err, result) => {
    if (err) {
      console.log("err in query", err);
    }
    else {
      console.log("left table", result);
      return res.json({ Result: result });
    }
  })
})




createnew.post('/insertToparentForm', (req, res) => {
  const rows = req.body.adjustmentRows;

  console.log("rowsss", req.body.unit);

  // Check if any records exist with the same Unit_RecdPVid
  const selectQuery = `SELECT * FROM magod_hq_mis.ho_paymentrv_register WHERE
   Unit_RecdPVid = '${rows.RecdPVID}'   AND Status <> 'Pending'
   AND Status <> 'Cancelled'  `;
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
                           VALUES ('${req.body.unit}', '${rows.Cust_code}', '${rows.CustName}', '${rows.TxnType}', '${rows.Amount}', '${rows.Description}', CURDATE(), '${rows.RecdPVID}')`;

      // Execute the insert query
      console.log("insert query",insertQuery);
      setupQueryMod(insertQuery, (insertErr, insertResult) => {
        if (insertErr) {
          console.log("Error in insert query:", insertErr);
          return res.status(500).json({ error: "Failed to insert record" });
        }

        const sql2 = `SELECT * FROM magod_hq_mis.ho_paymentrv_register WHERE Unit_RecdPVid ='${rows.RecdPVID}'   AND Status NOT IN ('Pending', 'Cancelled')`
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
  console.log("deleyte ", req.body.receipt_details);


  //update on account value after delete the form 


  const update = `UPDATE magod_hq_mis.unit_payment_recd_voucher_register u
SET u.On_account =u.On_account +'${req.body.onacc}'
   
WHERE u.Id = '${req.body.id}';
 `;


 const receiptdetailsISNull=`UPDATE magod_hq_mis.unit_payment_recd_voucher_register u
 SET u.On_account ='${req.body.onacc}'
    
 WHERE u.Id = '${req.body.id}';
  `;

if(req.body.receipt_details.length===0){
  setupQueryMod(receiptdetailsISNull, (err, result) => {
    if (err) {
      //console.log("err in query", err);
    }
    else {
     // console.log("update onaccount after result", result);


    }
  })
}
 else{
  setupQueryMod(update, (err, result) => {
    if (err) {
      //console.log("err in query", err);
    }
    else {
     // console.log("update onaccount after result", result);


    }
  })
 }

  





  const sql =
    `DELETE FROM magod_hq_mis.ho_paymentrv_details  WHERE HOPrvId ='${ho}'`;
  setupQueryMod(sql, (err, result) => {
    if (err) {
     // console.log("fail to delete", err);
      return res.json({ Error: " err in sql" });
    }
    else {
    //  console.log("result delete", result);

      const sql2 = `DELETE FROM magod_hq_mis.ho_paymentrv_register WHERE HOPrvId ='${ho}'`;
      setupQueryMod(sql2, (err2, result2) => {
        if (err2) {
        //  console.log("Failed to delete from ho_paymentrv_register", err2);
          return res.status(500).json({ Error: "Error in SQL query for ho_paymentrv_register" });
        } else {
        //  console.log("Deleted from ho_paymentrv_register:", result2);
          return res.json({ Status: "Success" });
        }
      });

      // return res.json({ Status: "Success" });
    }
  });
});



createnew.put('/updateReceiveNowAmount', (req, res) => {
  const recept = req.body.receipt_details
 // console.log("recept update", req.body);

  recept.forEach(item => {
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
        console.error("Failed to update Receive_Now:", err);
      } else {
        console.log("receivenow update successfully");





      }
    });
  });

  res.send({ Status: 'Success' })

})




createnew.post('/cancelUpdate', async (req, res) => {
  const { HO_PrvId, custName, totalReceiveNow, id } = req.body;
 // console.log("req body cancel ", HO_PrvId, custName, req.body);



  const fetchLeft = `SELECT * FROM magod_hq_mis.ho_paymentrv_details WHERE HOPrvId='${HO_PrvId}'`;

  const rightTable = `SELECT u.*
                      FROM magod_hq_mis.unit_invoices_list u
                      WHERE u.UnitName = 'Jigani'
                        AND u.Cust_Name = '${custName}'`;

  setupQueryMod(rightTable, (rightErr, rightRes) => {
    if (rightErr) {
      // Handle error if needed
     // console.log("right table error after cancel", rightErr);
    } else {


      // console.log("right table result cancel after",rightRes);
      setupQueryMod(fetchLeft, (leftErr, leftResult) => {
        if (leftErr) {
          console.log("left table error after cancel", leftErr);
        } else {
          // console.log("left table res after cancel",leftResult);

          leftResult.forEach((item, index) => {
            const receiveNowNumeric = parseFloat(item.Receive_Now);
            const matchingEntry = rightRes.find(entry => entry.DC_Inv_No === item.Dc_inv_no);
            if (matchingEntry) {


              console.log("matched inv", item.Receive_Now, totalReceiveNow);
              // Execute an update query to update the entry in the unit_invoices_list table
              const updateQuery = `UPDATE magod_hq_mis.unit_invoices_list 
                                   SET PymtAmtRecd=PymtAmtRecd-${receiveNowNumeric} ,
                                   DCStatus = CASE 
                                                    WHEN GrandTotal - ${receiveNowNumeric} = 0 THEN 'Closed'
                                                    WHEN GrandTotal - ${receiveNowNumeric} > 0 THEN 'Despatched'
                                                    ELSE 'OverPaid'
                                                 END 
                                   WHERE DC_Inv_No = ${item.Dc_inv_no}`;
              console.log("update right table query", updateQuery);

              setupQueryMod(updateQuery, (updateErr, updateRes) => {
                if (updateErr) {
                  // Handle error if needed
                } else {
                  // Update successful
                  console.log("update right table after cancel");
                }
              });

            }

            else {
              console.log("there is no matched data");
            }
          });
        }
      });



      //update the form data and adjustmemt voucher form data 

      
      const cancelForm = `UPDATE magod_hq_mis.ho_paymentrv_register  
      SET Status='Cancelled' where HOPrvId='${HO_PrvId}'`

      setupQueryMod(cancelForm, (formErr, formRes) => {
        if (formErr) {

        }
        else {
          console.log("update form after cancell");
        }

      })


      const adjustmentForm = `UPDATE magod_hq_mis.unit_payment_recd_voucher_register 
      SET On_account=On_account+${totalReceiveNow}, fixedOnaccount=fixedOnaccount+${totalReceiveNow}  where Id='${id}'`

      console.log("adjustmentForm query", adjustmentForm, totalReceiveNow);
      setupQueryMod(adjustmentForm, (adjustmentFormErr, adjustmentFormRes) => {
        if (adjustmentFormErr) {

        }
        else {
          console.log("update adjustment  button form after cancell");
          res.send({ StatusCancel: "Cancelled" })
        }

      })
    }
  });
});



createnew.put('/updateOnaccountValue', (req, res) => {
  const { on_account, id } = req.body
  // const receipt_id=1
 // console.log("on account ", on_account, id);
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
  console.log("UNIT NAME=", unit, srlType);

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
     // console.log("counttttttttttt", count);

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
        //    console.log("error in insert fro running no", insertError);
            return next(insertResult);
          }
          else {

            res.json({ message: "Record inserted successfully." });
          }
        });
      }

      else {
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
 //  console.log("qqqqqqqqqq", req.body);
  if (req.body.HO_PrvId != "") {
    if (req.body.Amount == "") {
      amount = 0.0;
    } else {
      amount = req.body.Amount;
    }
    //  console.log("amount", amount);
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
          //  console.log("33");
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
  }
  else {
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
        // console.log("values", values);
        setupQueryMod(sqlpost, [values], (err, result) => {
          if (err) {
            //console.log("33");
            console.log(err);
            return res.json({ status: "query", Error: "inside signup query" });
          } else {
            console.log("55");
          //  console.log("result after insert", result);
            return res.json({ Status: "Success", result: result });
          }
        });
      }
    );
  }
});





createnew.get("/getreceipt", (req, res) => {
  const receipt_id = req.query.receipt_id; // Access the query parameter "customercode"
  // console.log(receipt_id);
  const sql =
    "SELECT  * from magod_hq_mis.ho_paymentrv_register  WHERE HOPrvId=?;";
  setupQueryMod(sql, [receipt_id], (err, result) => {
    if (err) {
      console.log("error", err);
      return res.json({ Error: " error in sql" });
    } else {
      //console.log("result", result);
      return res.json({ Status: "Success", Result: result });
    }
  });
});


//Delete form data  button API
// createnew.post("/deleteButton", (req, res) => {
//   const {receipt_id} = req.body; // Access the query parameter "customercode"
//  console.log("deleeeeeee",receipt_id,);

//   const sql =
//   `DELETE FROM magod_hq_mis.ho_paymentrv_details  WHERE HOPrvId ='${receipt_id}'`;
//   setupQueryMod(sql,  (err, result) => {
//     if (err) {
//       console.log("error", err);
//       return res.json({ Error: " error in sql" });
//     } else {
//       //console.log("result", result);

//       const formDelete= `DELETE FROM magod_hq_mis.ho_paymentrv_register  WHERE HOPrvId ='${receipt_id}'`;
//       setupQueryMod(formDelete,(e,r)=>{
//         if(e){

//         }else{
//           console.log("delete successfuklyy");
//           return res.json({ Status: "Success", Result: r });
//         }
//       })


//     }
//   });
// });



createnew.post("/deleteButton", (req, res) => {
  const { receipt_id } = req.body; // Access the query parameter "customercode"
  console.log("deleeeeeee", receipt_id,);

  
//delet left tale data
  const fetchleft = `SELECT * from  magod_hq_mis.ho_paymentrv_details WHERE HOPrvId=?`

      setupQueryMod(fetchleft,[receipt_id] ,(fetche, fetchres) => {
        if (fetche) {
          console.log("err in query ", fetche);
        }
        else {
          console.log("fetch left table data", fetchres );
          if (fetchres.length > 0) {
            const sql =
              `DELETE FROM magod_hq_mis.ho_paymentrv_details  WHERE HOPrvId =?`;
            setupQueryMod(sql, [receipt_id],(e, r) => {
              if (e) {
                console.log("err in dlt", e);
              } else {
                console.log("delete successfuklyy");
               
              }
            })
          }
          else {
console.log("can not get left table data for delete");
          }
        }
      })




      const formDelete = `DELETE FROM magod_hq_mis.ho_paymentrv_register  WHERE HOPrvId =?`;

  setupQueryMod(formDelete,[receipt_id], (err, result) => {
    if (err) {
      console.log("error", err);
      
    } else {
      
      return res.json({ Status: "Success", Result: result});
      console.log("resultTTTTTTTT deleted form data");
    }

  });
  
  
 
});


createnew.post('/leftTable', (req, res) => {
  const { receipt_id, unit } = req.body
  // const receipt_id=1
  console.log(" left table data", receipt_id, unit);
  const sql = `SELECT * FROM magod_hq_mis.ho_paymentrv_details   WHERE HOPrvId='${receipt_id}'  `;
  //  const sql=`
  // SELECT DISTINCT Cust_Code , Cust_Name FROM magodmis.draft_dc_inv_register `;
  setupQueryMod(sql, (err, result) => {
    if (err) {
      console.log("err in query", err);
    }
    else {
      console.log("left table", result);
      return res.json({ Result: result });
    }
  })
})



//post data
createnew.post("/postInvoiceCreateNew", async (req, res, next) => {
  const { HO_PrvId, unit, srlType, onacc, receipt_details, id } = req.body;
console.log("req body after post", req.body);
  const date = new Date();
  // const date = new Date("2024-04-01");
  const year = date.getFullYear();

  const getYear =
    date.getMonth() >= 3 ? `${year}-${year + 1}` : `${year - 1}-${year}`;
  const yearParts = getYear.split("-");
  const startYearShort = yearParts[0].slice(-2);
  const endYearShort = yearParts[1].slice(-2);
  const finYear = `${startYearShort}/${endYearShort}`;

  console.log("finYear", finYear);

  try {
    const selectQuery = `
    SELECT * FROM magod_setup.magod_runningno WHERE SrlType='${srlType}' AND UnitName='${unit}' ORDER BY Id DESC LIMIT 1;
    `;

    setupQueryMod(selectQuery, async (selectError, selectResult) => {
      if (selectError) {
        logger.error(selectError);
        return next(selectResult);
      }

      let newHrefNo = "";

      console.log("select result",selectResult);
      if (selectResult && selectResult.length > 0) {
        const lastRunNo = selectResult[0].Running_No;
        const numericPart = parseInt(lastRunNo) + 1;

        const paddedNumericPart = numericPart.toString().padStart(4, "0");

        newHrefNo = `HO RV/ ${paddedNumericPart}`;
        console.log("New HrefNo:", newHrefNo);

        // Update Running_No in magod_setup.magod_runningno
        const updateRunningNoQuery = `
          UPDATE magod_setup.magod_runningno
          SET Running_No = ${numericPart}
          WHERE SrlType='${srlType}' AND UnitName='${unit}' AND Period='${finYear}' AND Running_EffectiveDate = CURDATE();
        `;

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


          const updateRightTable = `UPDATE magod_hq_mis.unit_invoices_list u
          SET u.PymtAmtRecd = u.PymtAmtRecd+${item.Receive_Now},
              u.DCStatus = IF(u.GrandTotal = u.PymtAmtRecd, 'Closed', 'Despatched')
          WHERE u.UnitName = 'Jigani' AND u.DC_Inv_No = ${item.Dc_inv_no};
          `

          setupQueryMod(updateRightTable, (rightError, rightResult) => {
            if (rightError) {
              console.log("righterror", rightError);
            }

            else {

              console.log("update right table successfully");
            }
          })

        })



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
          const postUpdateSelectQuery = `SELECT * FROM magod_hq_mis.ho_paymentrv_register WHERE HOPrvId = ${HO_PrvId}`;
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
  } catch (error) {
    console.error("An error occurred:", error);
    next(error);
  }
});


//get details from  rowData through drfts

createnew.get('/getFormByRowData', (req, res) => {
  const receipt_id = req.query.receipt_id;
  
  console.log("req body rowdata", receipt_id);
 
  const sql = `SELECT * FROM magod_hq_mis.ho_paymentrv_register WHERE HOPrvId ='${receipt_id}' `;
 
  setupQueryMod(sql, (err, result) => {
    if (err) {
      console.log("err in query", err);
    }
    else {
    //  console.log("result row data", result);
      return res.json({ Result: result });
    }
  })
})


createnew.post('/cancelCreateNewScreen', (req, res) => {
  const { HO_PrvId, custName, totalReceiveNow,  } = req.body;
  console.log("req body cancel in crete new screen", HO_PrvId, custName, totalReceiveNow);
  
 
 
  const fetchLeft = `SELECT * FROM magod_hq_mis.ho_paymentrv_details WHERE HOPrvId='${HO_PrvId}'`;

  const rightTable = `SELECT u.*
                      FROM magod_hq_mis.unit_invoices_list u
                      WHERE u.UnitName = 'Jigani'
                        AND u.Cust_Name = '${custName}'`;

  setupQueryMod(rightTable, (rightErr, rightRes) => {
    if (rightErr) {
      // Handle error if needed
      console.log("right table error after cancel", rightErr);
    } else {


      // console.log("right table result cancel after",rightRes);
      setupQueryMod(fetchLeft, (leftErr, leftResult) => {
        if (leftErr) {
          console.log("left table error after cancel", leftErr);
        } else {
          // console.log("left table res after cancel",leftResult);

          leftResult.forEach((item, index) => {
            const receiveNowNumeric = parseFloat(item.Receive_Now);
            const matchingEntry = rightRes.find(entry => entry.DC_Inv_No === item.Dc_inv_no);
            if (matchingEntry) {


              console.log("matched inv", item.Receive_Now, totalReceiveNow);
              // Execute an update query to update the entry in the unit_invoices_list table

              const updateQuery = `UPDATE magod_hq_mis.unit_invoices_list 
                                   SET PymtAmtRecd=PymtAmtRecd-${receiveNowNumeric} ,
                                   DCStatus = CASE 
                                                    WHEN GrandTotal - ${receiveNowNumeric} = 0 THEN 'Closed'
                                                    WHEN GrandTotal - ${receiveNowNumeric} > 0 THEN 'Despatched'
                                                    ELSE 'OverPaid'
                                                 END 
                                   WHERE DC_Inv_No = ${item.Dc_inv_no}`;


              // const updateQuery = `UPDATE magod_hq_mis.unit_invoices_list 
              // SET PymtAmtRecd=PymtAmtRecd -${receiveNowNumeric},
              // DCStatus ='Despatched'
              // WHERE DC_Inv_No = ${item.Dc_inv_no}`;
              // console.log("update right table query", updateQuery);

              setupQueryMod(updateQuery, (updateErr, updateRes) => {
                if (updateErr) {
                  // Handle error if needed
                } else {
                  // Update successful
                  console.log("update right table after cancel");
                }
              });

            }

            else {
              console.log("there is no matched data");
            }
          });
        }
      });



      //update the form data and adjustmemt voucher form data 

      
      const cancelForm = `UPDATE magod_hq_mis.ho_paymentrv_register  
      SET Status='Cancelled' where HOPrvId='${HO_PrvId}'`

      setupQueryMod(cancelForm, (formErr, formRes) => {
        if (formErr) {

        }
        else {
          console.log("update form after cancell");
        }

      })


    
    }
  });
})

module.exports = createnew;