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
             console.log("data", data);
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

   // console.log("postdata", req.body);
    let store = 0;


    const q = `SELECT StateCode ,State FROM magod_setup.state_codelist WHERE State='${req.body.State}'`
    setupQueryMod(q, (err, re) => {
        if(err){
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

    const sqlquery = `SELECT  UnitID, UnitName, UnitIntial FROM magod_setup.magodlaser_units`;

    setupQueryMod(sqlquery, (err, results) => {


        for (let i = 0; i < results.length; i++) {
            console.log("hi");

            if (results[i].UnitID === req.body.UnitID  ||results[i].UnitName === req.body.UnitName || req.body.UnitIntial===results[i].UnitIntial ) {
                console.log("database", results[i].UnitID, results[i].UnitName);
                console.log("req body", req.body.UnitID, req.body.UnitName);

                store++;
            }


        }
        console.log("store", store);
        if (store >= 1) {
           
            return res.json({ status: 'fail', message: 'Data already exists in the database.' });
        }

        else if(store==0){

            // const sqlpost =
            //     `INSERT INTO magod_setup.magodlaser_units(UnitID, UnitName, Unit_Address, Place, PIN, State, Country, Unit_contactDetails, Unit_GSTNo, Tally_account_Name,  Mail_Id, UnitIntial,Cust_Code,StateId,GST_URL,Current) VALUES (?)`;
            const sqlpost =
                `INSERT INTO magod_setup.magodlaser_units(UnitID, UnitName, Unit_Address, Place, PIN, State, Country, Unit_contactDetails, Unit_GSTNo, Tally_account_Name,  Mail_Id, UnitIntial,Cust_Code,StateId,GST_URL,Current) VALUES ('${req.body.UnitID}','${req.body.UnitName}','${req.body.Unit_Address}','${req.body.Place}','${req.body.PIN}', '${req.body.State}','${req.body.Country}','${req.body.Unit_contactDetails}','${req.body.Unit_GSTNo}','${req.body.Tally_account_Name}' ,'${req.body.Mail_Id}','${req.body.UnitIntial}', '99','${StateId}','http://www.magodlaserWELD.in', '${req.body.Current}')`;

            // console.log(sqlpost)
            const values = [
                req.body.UnitID,
                req.body.UnitName,
                req.body.Unit_Address,
                req.body.Place,
                req.body.PIN,

                req.body.State,
                req.body.Country,
                req.body.Unit_contactDetails,
                req.body.Unit_GSTNo,
                req.body.Tally_account_Name,
                //   req.body.Cash_in_Hand,
                req.body.Mail_Id,
                req.body.UnitIntial,
                req.body.Current,
                Cust_Code, StateId, GST_URL
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

    const sql = `DELETE FROM magod_setup.magodlaser_units WHERE UnitID='${uid}'`;

    setupQueryMod(sql, (err, result) => {
        if (err) return res.json({ Error: ' err in sql' });

        return res.json({ Status: 'Success' })
    })
})


unitlist.put("/updateData/:UnitID", (req, res) => {
let StateId=0;
    const id = req.params.UnitID;
    console.log("update id", id);
    const up = 'SELECT UnitID , UnitIntial FROM magod_setup.magodlaser_units';


    const q = `SELECT StateCode ,State FROM magod_setup.state_codelist WHERE State='${req.body.State}'`
    setupQueryMod(q, (err, re) => {
        if(err){
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
    setupQueryMod(up, (e, r) => {

        // console.log("rr", r);

        let x = 0;
        for (let i = 0; i < r.length; i++) {
            if (r[i].UnitID === id || req.body.UnitIntial===r[i].UnitIntial) {

                x++;
                console.log("req id and ", req.body.UnitID, r[i].UnitID);
            }
        }

        if (x === 1) {
            const updatequery = `UPDATE magod_setup.magodlaser_units SET UnitName='${req.body.UnitName}', Unit_Address='${req.body.Unit_Address}', Place='${req.body.Place}',PIN='${req.body.PIN}',State='${req.body.State}', Country='${req.body.Country}',Unit_contactDetails='${req.body.Unit_contactDetails}',Unit_GSTNo='${req.body.Unit_GSTNo}',Tally_account_Name='${req.body.Tally_account_Name}', Mail_Id='${req.body.Mail_Id}',UnitIntial='${req.body.UnitIntial}', Current='${req.body.Current}', StateId='${StateId}'  WHERE UnitID='${req.body.UnitID}'`;

            console.log("updt qry", updatequery);
            const values = [

                req.body.UnitName,
                req.body.Unit_Address,
                req.body.Place,
                req.body.PIN,
                req.body.State,
                req.body.Country,
                req.body.Unit_contactDetails,
                req.body.Unit_GSTNo,
                req.body.Tally_account_Name,
                //   req.body.Cash_in_Hand,
                StateId,
                req.body.Mail_Id,
                req.body.UnitIntial,
            ];
            console.log("updt values", values);

            setupQueryMod(updatequery, values, (err, result) => {
                if (err) console.log("err in update query", err);
                else return res.json({ status: 'success' });
            })
        }
        else {
            console.log("error becoz unit is not in db");
            return res.json({ status: 'query' })
        }

    })
})

module.exports = unitlist;