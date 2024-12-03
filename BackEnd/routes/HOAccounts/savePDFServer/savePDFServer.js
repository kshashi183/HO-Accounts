//const express = require("express");
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// let name = "";
// const savePDF = express.Router();

// // Middleware to parse form data before multer handles the request
// savePDF.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// // Ensure upload directory exists
// const uploadFolder =
//   process.env.FILE_SERVER_PDF_PATH || path.join(__dirname, "uploads");
// if (!fs.existsSync(uploadFolder)) {
//   fs.mkdirSync(uploadFolder, { recursive: true });
// }

// // Function to format the current date and time
// const getFormattedDateTime = () => {
//   const now = new Date();
//   const date = now.toISOString().split("T")[0]; // YYYY-MM-DD
//   const time = now.toTimeString().split(" ")[0].replace(/:/g, "-"); // HH-MM-SS
//   return `${date}_${time}`;
// };

// // Configure multer storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadFolder); // Save files in the uploads directory
//   },
//   filename: (req, file, cb) => {
//     // Access req.body.adjustment after express.urlencoded has parsed it
//     console.log("Adjustment Name in storage :", name);
//     const adjustment = name || "Default_Name"; // Default if not provided
//     const dateTime = getFormattedDateTime(); // Get current date and time
//     const ext = path.extname(file.originalname); // Retain the original file extension
//     cb(null, `${adjustment}_${dateTime}${ext}`); // Generate the file name
//   },
// });

// const upload = multer({ storage });

// // API endpoint to save the PDF
// savePDF.post("/save-pdf", upload.single("file"), (req, res) => {
//   name = req.body.adjustment;
//   console.log("Adjustment Name:", name); // Log the adjustment name

//   if (!req.file) {
//     return res.status(400).send("No file uploaded.");
//   }

//   console.log(`File saved to: ${req.file.path}`); // Log the file path
//   res.status(200).send({
//     message: "PDF saved successfully!",
//     filePath: req.file.path,
//   });
// });

// module.exports = savePDF;

const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const savePDF = express.Router();

// Middleware to parse form data before multer handles the request
savePDF.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Ensure upload directory exists
const uploadFolder =
  process.env.FILE_SERVER_PDF_PATH || path.join(__dirname, "uploads");
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

// Function to format the current date and time
const getFormattedDateTime = () => {
  const now = new Date();
  const date = now.toISOString().split("T")[0]; // YYYY-MM-DD
  const time = now.toTimeString().split(" ")[0].replace(/:/g, "-"); // HH-MM-SS
  return `${date}_${time}`;
};

// API endpoint to save the PDF
savePDF.post(
  "/save-pdf",
  (req, res, next) => {
    // Dynamically configure storage
    console.log("Adjustment Name11111999999999:", req.body.adjustment);
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, uploadFolder); // Save files in the uploads directory
      },
      filename: (req, file, cb) => {
        const adjustment = req.body.adjustment || "Default_Name"; // Use req.body.adjustment
        const dateTime = getFormattedDateTime(); // Get current date and time
        const ext = path.extname(file.originalname); // Retain the original file extension
        cb(null, `${adjustment}_${dateTime}${ext}`); // Generate the file name
      },
    });

    // Configure upload with dynamic storage
    const upload = multer({ storage }).single("file");

    // Execute upload middleware
    upload(req, res, (err) => {
      if (err) {
        return res
          .status(500)
          .send({ message: "File upload failed", error: err });
      }
      next(); // Proceed to the next middleware
    });
  },
  (req, res) => {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    console.log("Adjustment Name11111:", req.body.adjustment); // Log the adjustment name
    console.log(`File saved to: ${req.file.path}`); // Log the file path

    res.status(200).send({
      message: "PDF saved successfully!",
      filePath: req.file.path,
    });
  }
);

module.exports = savePDF;
