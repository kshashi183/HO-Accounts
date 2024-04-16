const unitlist = require("express").Router();
// const cors = require('cors');
// const { dbco, dbco1, dbgetData, deleteUnitData, updateUnitData } = require("../../../helpers/dbconn")
const { setupQueryMod } = require("../../../helpers/dbconn")
var bodyParser = require('body-parser')








unitlist.get('/getUnitData', (req, res, next) => {

    try {

        setupQueryMod(`SELECT * FROM magod_setup.magodlaser_units`, (err, data) => {
            if (err) {
                console.log("err in query", err);
            }
            else {
                //  console.log("data", data);
                return res.json({ Status: 'Success', Result: data });
            }

        });
    } catch (error) {
        console.log("error", error);
        next(error);
    }
});



unitlist.get('/getStates', (req, res) => {
    const q = `SELECT State ,StateCode FROM magod_setup.state_codelist`;

    try {

        setupQueryMod(q, (err, data) => {
            if (err) {
                console.log("err in query", err);
            }
            else {
                // console.log("data", data);
                return res.json({ Status: 'Success', Result: data });
            }

        });
    } catch (error) {
        console.log("error", error);
        next(error);
    }

})



unitlist.post("/postUnitDetails", (req, res) => {

    let StateId = 0;
    const Cust_Code = 0;
    const GST_URL = 'http://www.magodlaserWELD.in';

     console.log("postdata", req.body);
    let store = 0;


    const q = `SELECT StateCode ,State FROM magod_setup.state_codelist WHERE State='${req.body.State}'`
    setupQueryMod(q, (err, re) => {
        if (err) {
            console.log("errrrrrrr", err);
        }

        for (let i = 0; i < re.length; i++) {
            console.log("hi");

            if (re[i].State === req.body.State) {

                StateId = re[i].StateCode;
                break;

            }


        }
    })

    const sqlquery = `SELECT  UnitID, UnitName, UnitIntial FROM magod_setup.magodlaser_units 
    where UnitID='${req.body.UnitID}' OR UnitName='${req.body.UnitName}' `;

    console.log("query print ", sqlquery);
    setupQueryMod(sqlquery, (err, results) => {


        // for (let i = 0; i < results.length; i++) {
        //     console.log("hi");

        //     if (results[i].UnitID === req.body.UnitID  ||results[i].UnitName === req.body.UnitName || req.body.UnitIntial===results[i].UnitIntial ) {
        //         console.log("database", results[i].UnitID, results[i].UnitName);
        //         console.log("req body", req.body.UnitID, req.body.UnitName);

        //         store++;
        //     }


        // }


        if (results.length !== 0) {
            console.log(" eroor no result");
            return res.json({ status: 'fail', message: 'Data already exists in the database.' });
        }

        else {

            // const sqlpost =
            //     `INSERT INTO magod_setup.magodlaser_units(UnitID, UnitName, Unit_Address, Place, PIN, State, Country, Unit_contactDetails, Unit_GSTNo, Tally_account_Name,  Mail_Id, UnitIntial,Cust_Code,StateId,GST_URL,Current) VALUES (?)`;
            const sqlpost =
                `INSERT INTO magod_setup.magodlaser_units(UnitID, UnitName, Unit_Address, City, PIN_Code, State, Country,
                     Unit_contactDetails,GST_No, Tally_account_Name, Gm_Mail_Id, UnitIntial,State_Id,GST_URL,Current) VALUES ('${req.body.UnitID}','${req.body.UnitName}','${req.body.Unit_Address}','${req.body.City}','${req.body.PIN_Code}', '${req.body.State}','${req.body.Country}','${req.body.Unit_contactDetails}','${req.body.GST_No}','${req.body.Tally_account_Name}' ,'${req.body.Gm_Mail_Id}','${req.body.UnitIntial}','${StateId}','http://www.magodlaserWELD.in', '${req.body.Current}')`;

            // console.log(sqlpost)
            const values = [
                req.body.UnitID,
                req.body.UnitName,
                req.body.Unit_Address,
                req.body.City,
                req.body.PIN,
                req.body.State,
                req.body.Country,
                req.body.Unit_contactDetails,
                req.body.Unit_GSTNo,
                req.body.Tally_account_Name,
                req.body.Mail_Id,
                req.body.UnitIntial,
                StateId,
                GST_URL,
                req.body.Current,
            ]
            //console.log("val", values);

            setupQueryMod(sqlpost, (err, result) => {
                if (err) {
                    console.log("33");
                    console.log(err);
                    return res.json({ status: 'query', Error: 'inside signup query' });
                }

                else {
                    console.log("4");
                    console.log(result);
                    return res.json({ status: 'success', result: result })
                }
            })
        }
    })

})






unitlist.delete("/deleteUnit/:UnitID", (req, res) => {
    const uid = req.params.UnitID;
    console.log("delete", uid);

    const sql = `DELETE FROM magod_setup.magodlaser_units WHERE ID='${uid}'`;

    setupQueryMod(sql, (err, result) => {
        if (err) return res.json({ Error: ' err in sql' });

        return res.json({ Status: 'Success' })
    })
})


unitlist.put("/updateData/:ID", (req, res) => {
    let StateId = 0;
    const id = req.params.ID;
      console.log("update id", id);
   


    const q = `SELECT StateCode ,State FROM magod_setup.state_codelist WHERE State='${req.body.State}'`
    setupQueryMod(q, (err, re) => {
        if (err) {
           // console.log("errrrrrrr", err);
        }

        for (let i = 0; i < re.length; i++) {
            //  console.log("hi");

            if (re[i].State === req.body.State) {

                StateId = re[i].StateCode;
                break;

            }


        }
    })

    // const up = `SELECT UnitName ,UnitID FROM magod_setup.magodlaser_units where UnitName='${req.body.UnitName}' OR UnitID='${req.body.UnitID}'`;
    const up = `SELECT UnitName ,UnitID FROM magod_setup.magodlaser_units WHERE (UnitName='${req.body.UnitName}' OR UnitID='${req.body.UnitID}') AND UnitID != '${req.body.UnitID}'`;

    setupQueryMod(up, (e, r) => {

        if(e){
           // console.log("errin update query", e);
        }
        else  if (r.length === 0) {

            const updatequery = `UPDATE magod_setup.magodlaser_units SET UnitID='${req.body.UnitID}', UnitName='${req.body.UnitName}', Unit_Address='${req.body.Unit_Address}', City='${req.body.City}',PIN_Code='${req.body.PIN_Code}',State='${req.body.State}', 
            Country='${req.body.Country}',Unit_contactDetails='${req.body.Unit_contactDetails}',GST_No='${req.body.GST_No}',Tally_account_Name='${req.body.Tally_account_Name}', Gm_Mail_Id='${req.body.Gm_Mail_Id}',UnitIntial='${req.body.UnitIntial}',  State_Id='${StateId}',Current='${req.body.Current}'  WHERE UnitID='${req.body.UnitID}'`;

           console.log("updt qry", updatequery);
            const values = [

                req.body.UnitName,
                req.body.Unit_Address,
                req.body.City,
                req.body.PIN_Code,
                req.body.State,
                req.body.Country,
                req.body.Unit_contactDetails,
                req.body.GST_No,
                req.body.Tally_account_Name,
                //   req.body.Cash_in_Hand,
                StateId,
                req.body.Gm_Mail_Id,
                req.body.UnitIntial,
            ];
             console.log("updt values", values);

            setupQueryMod(updatequery, values, (err, result) => {
                if (err) {
                   // console.log("err in update query", err);
                }
                else return res.json({ status: 'success' });
            })
        }

        else {
            console.log("error becoz unitname already  in db");
            return res.json({ status: 'query' })
        }

    })
})

module.exports = unitlist;