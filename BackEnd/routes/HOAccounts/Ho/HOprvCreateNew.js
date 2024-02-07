const createNewRouter = require("express").Router();
const {
  dailyReportQuery,
  setupQuery,
  hqQuery,
} = require("../../../helpers/dbconn");
var bodyParser = require("body-parser");

//Unit Names
createNewRouter.get("/unitNames", async (req, res, next) => {
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

//Customer Names
createNewRouter.get("/customerNames", async (req, res, next) => {
  try {
    setupQuery(
      `SELECT DISTINCT Cust_Code, Cust_Name FROM magod_hq_mis.unit_cust_data;`,
      (err, data) => {
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});

createNewRouter.post("/getInvoices", async (req, res, next) => {
  const { unit, custCode } = req.body;
  // console.log("unit", req.body);
  try {
    hqQuery(
      `SELECT u.*
      FROM magod_hq_mis.unit_invoices_list u
      WHERE u.UnitName = '${unit}'
      AND u.Cust_Code = ${custCode}
      AND ABS(u.GrandTotal - u.PymtAmtRecd) > 0
      AND u.DCStatus != 'Closed'`,
      (err, data) => {
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});

createNewRouter.post("/getHOPrvId", async (req, res, next) => {
  const { unit, custCode } = req.body;
  console.log("unit", req.body);
  try {
    hqQuery(
      `SELECT h.HOPrvId, Amount FROM magod_hq_mis.ho_paymentrv_register h WHERE h.UnitName='${unit}' AND h.Cust_Code=${custCode} AND h.HORef='Draft';
      `,
      (err, data) => {
        res.send(data);
      }
    );
  } catch (error) {
    next(error);
  }
});

createNewRouter.post("/saveData", async (req, res, next) => {
  const { unit, custCode, custName, txnType, Amount, description } = req.body;
  console.log("unit", req.body);
  try {
    hqQuery(
      `INSERT INTO magod_hq_mis.ho_paymentrv_register (Unitname, Cust_code, CustName, TxnType, Amount, DESCRIPTION, HoRefDate)
      VALUES ('${unit}', '${custCode}', '${custName}', '${txnType}', ${Amount}, '${description}', CURDATE());`,
      (err, data) => {
        if (err) {
          console.error(err);
          res.status(500).send({ success: false, error: err.message });
        } else {
          res.send({ success: true, data });
        }
      }
    );
  } catch (error) {
    next(error);
  }
});

createNewRouter.post("/updateData", async (req, res, next) => {
  const { unit, HO_PrvId, custCode, custName, txnType, description, Amount } =
    req.body;
  try {
    hqQuery(
      `UPDATE magod_hq_mis.ho_paymentrv_register 
       SET Unitname = '${unit}',
       Cust_Code = '${custCode}',
       CustName = '${custName}',
       TxnType = '${txnType}',
       Description = '${description}',
       Amount = ${Amount}
       WHERE HOPrvId = '${HO_PrvId}';`,
      (err, data) => {
        if (err) {
          console.error(err);
          res.status(500).send({ success: false, error: err.message });
        } else {
          res.send({ success: true, data });
        }
      }
    );
  } catch (error) {
    next(error);
  }
});

createNewRouter.post("/addInvoice", async (req, res, next) => {
  try {
    const { selectedRows, HO_PrvId, unit } = req.body;
    console.log("hoid", req.body);
    const insertResults = [];
    let existingDraftIds = [];

    const checkRecdPvSrlQuery = `SELECT MAX(RecdPvSrl) AS maxRecdPvSrl FROM magod_hq_mis.ho_paymentrv_details WHERE HOPrvId=${HO_PrvId};`;

    const checkRecdPvSrlData = await new Promise((resolve, reject) => {
      hqQuery(checkRecdPvSrlQuery, (err, data) => {
        if (err) {
          console.log("error1", err);
          reject(err);
        } else {
          resolve(data);
        }
      });
    });

    const maxRecdPvSrl = checkRecdPvSrlData[0].maxRecdPvSrl;

    const selectQuery = `SELECT * FROM magod_hq_mis.ho_paymentrv_details WHERE HOPrvId=${HO_PrvId};`;

    const selectData = await new Promise((resolve, reject) => {
      hqQuery(selectQuery, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });

    existingDraftIds = selectData.map((row) => row.Dc_inv_no);

    let recdPvSrlToInsert = maxRecdPvSrl !== null ? maxRecdPvSrl : 0;

    for (const row of selectedRows) {
      const { DC_Inv_No } = row;
      if (DC_Inv_No === undefined) {
        throw new Error("One or more IDs are not present.");
      }

      if (!existingDraftIds.includes(DC_Inv_No)) {
        const recdPvSrlToInsertIncremented = ++recdPvSrlToInsert;

        const insertQuery = `
      INSERT INTO magod_hq_mis.ho_paymentrv_details (
Unitname,
        HOPrvId,
        RecdPvSrl,
        DC_inv_no,
        Inv_No,
        Inv_Type,
        Inv_Amount,
        Amt_received,
        Receive_Now,
        Inv_Date,
        RefNo
      )
      VALUES (
        '${unit}',
        ${HO_PrvId},
        ${recdPvSrlToInsertIncremented},
        '${row.DC_Inv_No}',
        '${row.Inv_No}',
        '${row.DC_InvType}',
        ${row.GrandTotal},
        ${row.PymtAmtRecd},
        ${row.GrandTotal - row.PymtAmtRecd},
        CURDATE(),
        '${row.Inv_No} / ${row.Inv_Fin_Year}'
      )`;

        await new Promise((resolve, reject) => {
          hqQuery(insertQuery, (err, data) => {
            if (err) {
              console.log("err in insert", err);
              insertResults.push({
                id: DC_Inv_No,
                error: "Insert failed.",
              });
              reject(err);
            } else {
              insertResults.push({
                id: DC_Inv_No,
                success: true,
              });
              resolve();
            }
          });
        });
      } else {
        insertResults.push({
          id: DC_Inv_No,
          error: "DC_Inv_No already exists in the firstTable.",
        });
      }
    }

    const finalSelectQuery = `SELECT * FROM magod_hq_mis.ho_paymentrv_details WHERE HOPrvId=${HO_PrvId};`;

    const finalSelectData = await new Promise((resolve, reject) => {
      hqQuery(finalSelectQuery, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });

    console.log("finalSelectData", finalSelectData);

    res.json(finalSelectData);
  } catch (error) {
    console.log("Error:", error.message);
    next(error);
  }
});

createNewRouter.post("/updateAmount", async (req, res, next) => {
  try {
    const { HO_PrvId, Amount } = req.body;
    console.log("REQ_BODY", req.body);

    // Update query
    const updateQuery = `UPDATE magod_hq_mis.ho_paymentrv_register 
    SET Amount = ${Amount}
    WHERE HOPrvId = '${HO_PrvId}'`;
    hqQuery(updateQuery, (updateErr) => {
      if (updateErr) {
        console.log("Update error", updateErr);
      }

      // Select query to get the updated data after deletion
      const selectQuery = `SELECT Amount FROM magod_hq_mis.ho_paymentrv_register WHERE HOPrvId = '${HO_PrvId}'`;
      hqQuery(selectQuery, (selectErr, selectResult) => {
        if (selectErr) {
          console.log("Select error", selectErr);
          return res.json({
            Error: "Error in SELECT query after deletion",
            Details: selectErr,
          });
        }

        // Send the updated data after successful DELETE and SELECT
        res.json({
          updatedAmount: selectResult,
        });
      });
    });
  } catch (error) {
    console.log("Error:", error.message);
    next(error);
  }
});

createNewRouter.post("/removeInvoice", async (req, res, next) => {
  try {
    const { RecdPvSrl, HO_PrvId } = req.body;

    // console.log("RecdPvSrl", RecdPvSrl);

    // Delete query
    const deleteQuery = `DELETE FROM magod_hq_mis.ho_paymentrv_details WHERE RecdPvSrl=${RecdPvSrl}`;
    hqQuery(deleteQuery, (deleteErr) => {
      if (deleteErr) {
        console.log("Delete error", deleteErr);
        return res.json({ Error: "Error in DELETE query", Details: deleteErr });
      }

      // Select query to get the updated data after deletion
      const selectQuery = `SELECT * FROM magod_hq_mis.ho_paymentrv_details WHERE HOPrvId=${HO_PrvId}`;
      hqQuery(selectQuery, (selectErr, selectResult) => {
        if (selectErr) {
          console.log("Select error", selectErr);
          return res.json({
            Error: "Error in SELECT query after deletion",
            Details: selectErr,
          });
        }

        // Send the updated data after successful DELETE and SELECT
        res.send(selectResult);
      });
    });
  } catch (error) {
    console.log("Errorrrrrr:", error.message);
    next(error);
  }
});

createNewRouter.post("/postInvoice", async (req, res, next) => {
  const { HO_PrvId, unit, srlType } = req.body;

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

    setupQuery(selectQuery, async (selectError, selectResult) => {
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
        console.log("New HrefNo:", newHrefNo);

        // Update Running_No in magod_setup.magod_runningno
        const updateRunningNoQuery = `
          UPDATE magod_setup.magod_runningno
          SET Running_No = ${numericPart}
          WHERE SrlType='${srlType}' AND UnitName='${unit}' AND Period='${finYear}' AND Running_EffectiveDate = CURDATE();
        `;

        setupQuery(updateRunningNoQuery, (updateError, updateResult) => {
          if (updateError) {
            logger.error(updateError);
            return next(updateResult);
          }
        });
      }

      // Your existing update query
      hqQuery(
        `UPDATE magod_Hq_Mis.ho_paymentrv_register
        SET HoRefDate = curdate(),
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
          hqQuery(
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

module.exports = createNewRouter;
