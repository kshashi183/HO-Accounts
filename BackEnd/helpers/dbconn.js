var mysql = require("mysql2");

require("dotenv").config();

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbDatabase1 = process.env.DB_DATABASE_1;
const dbDatabase2 = process.env.DB_DATABASE_2;
const dbDatabase3 = process.env.DB_DATABASE_3;
const dbDatabase4 = process.env.DB_DATABASE_4;
const dbDatabase5 = process.env.DB_DATABASE_5;
const dbDatabase6 = process.env.DB_DATABASE_6;
const dbDatabase7 = process.env.DB_DATABASE_7;

var dailyReport = mysql.createConnection({
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: dbDatabase1,
});

var setupConn = mysql.createConnection({
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: dbDatabase2,
});

var hqConnection = mysql.createConnection({
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: dbDatabase7,
});

// const setupConn = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "root",
//     database: 'magod_setup',
//     dateStrings: true,
// });

// let dbco1 = (m, callback) => {
//     console.log("-----",m);
//     db.connect();
//     db.query(m, (err, res, fields) => {
//         if(err) {
//             console.log("err in query!!", err);
//            callback(err, null);
//         }
//         else{
//          // console.log("naga!!");
//             callback(null, res);
//            // console.log(res);

//         }
//     })
//  }

// let dbco = (m,values, callback) => {
//     console.log("--values---",values);
//     db.connect();
//     db.query(m,[values], (err, res, fields) => {
//         if(err) {
//             console.log("err in query!!", err);
//           //  callback(err, null);
//         }
//         else{
//             console.log("naga--");
//            callback(null, res);
//         //    console.log(res);

//         }
//     })
//  }

//  let dbgetData = (m,values, callback) => {

//     db.connect();
//     db.query(m,values,(err, res, fields) => {
//         if(err) {
//             console.log("err in query!!", err);
//             callback(err, null);
//         }
//         else{
//             console.log("getdata--", values);
//             callback(null, res);
//           //  console.log(res);

//         }
//     })
//  }

//  let deleteUnitData = (m, uid,callback) => {

//     db.connect();
//     db.query(m,[uid], (err, res, fields) => {
//         if(err) {
//             console.log("err in query!!", err);
//             callback(err, null);
//         }
//         else{
//             console.log("deletd--", uid);
//             callback(null, res);
//           //  console.log(res);

//         }
//     })
//  }

//  let updateUnitData = (m, callback) => {

//     db.connect();
//     db.query(m,(err, res, fields) => {
//         if(err) {
//             console.log("err in query!!", err );
//             callback(err, null);
//         }
//         else{
//             console.log("update based on id--");
//             callback(null, res);
//             console.log("dbconn update" ,);

//         }
//     })
//  }

// let setupQueryMod = async (q, callback) => {
//     setupConn.connect();
//     setupConn.query(q, (err, res, fields) => {
//         if(err){
//             console.log("err",err);
//             callback(err, null);
//         }
//         else {
//          //   console.log("rersult", res);
//             callback(null, res);}
//     })
// }

// Assuming 'setupConn' is properly imported or declared
// const setupQueryMod = async (q,values, callback) => {
//     try {
//       setupConn.connect();
//       setupConn.query(q, values,(err, res, fields) => {
//         if (err) {
//           console.log("err", err);
//           callback(err, null);
//         } else {
//          // console.log("result", res);
//         callback(null, res);
//         }
//       });
//     } catch (error) {
//       callback(error, null);
//     }
//   };

//DailyReport
let dailyReportQuery = async (q, callback) => {
  dailyReport.connect();
  dailyReport.query(q, (err, res, fields) => {
    if (err) {
      console.log("db connection err1");
      callback(err, null);
    } else callback(null, res);
  });
};

let setupQuery = (q, callback) => {
  setupConn.connect();
  setupConn.query(q, (err, res, fields) => {
    if (err) {
      console.log("db connection err2");
      callback(err, null); // Pass the error to the callback
    } else {
      callback(null, res); // Pass the result to the callback
    }
  });
};

// let hqQuery = async (q, callback) => {
//   hqConnection.connect();
//   hqConnection.query(q, (err, res, fields) => {
//     if (err) callback(err, null);
//     else callback(null, res);
//   });
// };

const hqQuery = (query, values) => {
  return new Promise((resolve, reject) => {
    hqConnection.query(query, values, (err, results) => {
      if (err) {
        console.log("db connection err3");

        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// const setupConn = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "root",
//     database: 'magod_setup',
//     dateStrings: true,
// });

const misConn = mysql.createConnection({
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: dbDatabase1,
  dateStrings: true,
});

const setupQueryMod = async (q, values, callback) => {
  try {
    misConn.connect();

    misConn.query(q, values, (err, res, fields) => {
      if (err) {
        console.log("err", err);

        callback(err, null);
      } else {
        console.log("result call back", res);

        callback(null, res);
      }
    });
  } catch (error) {
    callback(error, null);
  }
};

// const misQuery = async (q,values, callback) => {
//   try {
//     misConn.connect();
//     misConn.query(q, values,(err, res, fields) => {
//       if (err) {
//         console.log("err", err);
//         callback(err, null);
//       } else {
//        // console.log("result", res);
//       callback(null, res);
//       }
//     });
//   } catch (error) {
//     callback(error, null);
//   }
// };

// module.exports={dailyReportQuery, setupQuery,setupQueryMod,misQuery };

let misQuery = (q, values) => {
  return new Promise((resolve, reject) => {
    misConn.connect();
    misConn.query(q, values, (err, res, fields) => {
      if (err) reject(err);
      else resolve(res);
    });
  });
};
module.exports = {
  dailyReportQuery,
  setupQuery,
  hqQuery,
  setupQueryMod,
  misQuery,
};
