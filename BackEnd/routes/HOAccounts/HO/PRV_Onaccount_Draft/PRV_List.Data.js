const prvListdata = require("express").Router();

const { setupQueryMod, misQuery } = require("../../../../helpers/dbconn")


prvListdata.get('/getPRVList', (req, res) => {
    const sql = `SELECT *
    FROM magod_hq_mis.ho_paymentrv_register h
    WHERE h.HORef NOT LIKE 'Draft'
    ORDER BY h.HORef DESC;
    `
    setupQueryMod(sql, (err, result) => {
        if (err) {
            console.log("errir", err);
        }
        else {
           // console.log("prv result",result);
            return res.json({ Status: 'Success', Result: result })
        }
    })

})


prvListdata.get('/getDraftList', (req, res) => {
    const sql = `SELECT *
    FROM magod_hq_mis.ho_paymentrv_register h
    WHERE h.HORef  LIKE 'Draft'
    ORDER BY h.HORef DESC;
    `
    setupQueryMod(sql, (err, result) => {
        if (err) {
            console.log("errir", err);
        }
        else {
           // console.log("prv result",result);
            return res.json({ Status: 'Success', Result: result })
        }
    })

})


prvListdata.get('/getOnaccountList', (req, res) => {

    const unit='Jigani'
    
    const sql = `SELECT *
    FROM magod_hq_mis.unit_payment_recd_voucher_register u
    WHERE u.UnitName = '${unit}'
      AND u.PRV_Status = 'Created'
      AND u.On_account > 0;   
    `
    setupQueryMod(sql, (err, result) => {
        if (err) {
            console.log("errir", err);
        }
        else {
            console.log("onaccount result",result);
            return res.json({ Status: 'Success', Result: result })
        }
    })

})



module.exports = prvListdata;