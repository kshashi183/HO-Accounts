const taxMaster = require("express").Router();
const { setupQueryMod } = require("../../../helpers/dbconn")
var bodyParser = require('body-parser')


taxMaster.get('/getTaxData', (req, res, next) => {

    try {
const sql=`SELECT
*,
DATE_FORMAT(EffectiveFrom, '%d/%m/%Y') AS FormattedEffectiveFrom,
DATE_FORMAT(EffectiveTO, '%d/%m/%Y') AS FormattedEffectiveTO
FROM magod_setup.taxdb;
`;

const sql2=`SELECT * FROM magod_setup.taxdb`

        setupQueryMod(sql, (err, data) => {
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
});

taxMaster.put('/taxDataUpdate/:TaxID', (req, res) => {
    const id = req.params.TaxID;
   console.log("brfore date", req.body.EffectiveFrom);


   

    const selectQuery = 'SELECT TaxID  FROM magod_setup.taxdb';

    setupQueryMod(selectQuery, (er, r) => {

        let x = 0;
        //console.log("se", r);
        for (let i = 0; i < r.length; i++) {
            
            if (r[i].TaxID===req.body.TaxID) {

                x++;
               // console.log("req id and ", req.body.TaxID, r[i].TaxID);
            }
            
        }


        if (x===1) {
            const updateQuery = `UPDATE magod_setup.taxdb SET TaxName='${req.body.TaxName}', TaxPrintName='${req.body.TaxPrintName}' , Tax_Percent='${req.body.Tax_Percent}', TaxOn='${req.body.TaxOn}',EffectiveFrom='${req.body.EffectiveFrom}',EffectiveTO='${req.body.EffectiveTO}', AcctHead='${req.body.AcctHead}', TallyAcctCreated='${req.body.TallyAcctCreated}', UnderGroup='${req.body.UnderGroup}', Service='${req.body.Service}', Sales='${req.body.Sales}', JobWork='${req.body.JobWork}', IGST='${req.body.IGST}' WHERE TaxID='${req.body.TaxID}'`;
            
            console.log("updt qry", updateQuery);
            const values = [

                req.body.TaxName,
                req.body.TaxPrintName,
                req.body.TaxOn,
                req.body.Tax_Percent,
                req.body.EffectiveFrom,
                req.body.EffectiveTo,
              
                req.body.AcctHead,
                req.body.TallyAcctCreated,
                req.body.UnderGroup,
                  req.body.Sales,
                req.body.Service,
                req.body.IGST,
               
                req.body.JobWork,

            ];


           // console.log("updt values", values);

            setupQueryMod(updateQuery, values, (err, result) => {
                if (err) console.log("err in update query", err);
                else return res.json({ status: 'success' });
            })
        }
        else {
            console.log("error becoz TaxID is not in db");
            return res.json({ status: 'query' })
        }


    })
})


taxMaster.delete("/deleteTaxID/:TaxID", (req, res) => {
    const uid = req.params.TaxID;
  //  console.log("delete", uid);

    const sql = `DELETE FROM magod_setup.taxdb WHERE TaxID='${uid}'`;

    setupQueryMod(sql, (err, result) => {
        if (err) return res.json({ Error: ' err in sql' });

        return res.json({ Status: 'Success' })
    })
})



taxMaster.post("/postTaxMaster", (req, res) => {

    let store = 0;
    console.log("ledger",   req.body.EffectiveFrom, req.body.EffectiveTO);
   
    

//console.log("null val", TaxName, TaxPrintName);

    const sqlquery = `SELECT  TaxID FROM magod_setup.taxdb`;

    setupQueryMod(sqlquery, (err, results) => {

         
        for (let i = 0; i < results.length; i++) {
          

            if (results[i].TaxID === req.body.TaxID) {
                  console.log("database",results[i].UnitName);
                  console.log("req body", req.body.UnitName);

                store++;
            }


        }

        if (store === 1) {
            return res.json({ status: 'fail', message: 'Data already exists in the database.' });
        }

        else {

      
            const sqlpost =
                `INSERT INTO magod_setup.taxdb( TaxName, TaxPrintName, Tax_Percent, TaxOn, EffectiveFrom, EffectiveTO,AcctHead, UnderGroup, Service,Sales,  JobWork, IGST) VALUES ('${req.body.TaxName}','${req.body.TaxPrintName}','${req.body.Tax_Percent}','${req.body.TaxOn}', '${req.body.EffectiveFrom}','${req.body.EffectiveTO}','${req.body.AcctHead}','${req.body.UnderGroup}','${req.body.Service}' ,'${req.body.Sales}','${req.body.JobWork}', '${req.body.IGST}' )`;
                // `INSERT INTO magod_setup.taxdb(TaxID, TaxName, TaxPrintName, Tax_Percent, TaxOn, EffectiveFrom, EffectiveTO,AcctHead, UnderGroup, Service,Sales,  JobWork, IGST) VALUES ('${TaxID}','${TaxName}','${TaxPrintName}','${Tax_Percent}','${req.body.TaxOn}', '${req.body.EffectiveFrom}','${req.body.EffectiveTO}','${req.body.AcctHead}','${req.body.UnderGroup}','${req.body.Service}' ,'${req.body.Sales}','${req.body.JobWork}', '${req.body.IGST}' )`;
            // console.log(sqlpost)
            const values = [
            
                req.body.TaxName,
                req.body.TaxPrintName,
                req.body.Tax_Percent,
           
                req.body.TaxOn,

                req.body.EffectiveFrom,
                req.body.EffectiveTO,
                req.body.AcctHead,
                req.body.UnderGroup,
                req.body.Service,
                //   req.body.Cash_in_Hand,
                req.body.Sales,
                req.body.JobWork,
                req.body.IGST,
                
            ]
            console.log("val", values);

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
module.exports = taxMaster;