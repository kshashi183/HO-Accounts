const path = require("path");
const fs = require("fs");
const PDFDocument = require("pdfkit");
const moment = require("moment");
require("dotenv").config(); // Load .env variables
const multer = require("multer");

const savePDF = require("express").Router();

// savePDF.post("/savePDF", (req, res) => {
//   const fileName = "Duelist_Of_${ason}.pdf";
//   const filePath = path.join(process.env.FILE_SERVER_PDF_PATH, fileName);
//   console.log("filepath ", filePath);
// });

const uploadFolder = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder); // Create folder if it doesn't exist
}

const getFormattedDateTime = () => {
  const now = new Date();
  const date = now.toISOString().split("T")[0]; // YYYY-MM-DD
  const time = now.toTimeString().split(" ")[0].replace(/:/g, "-"); // HH-MM-SS
  return `${date}_${time}`;
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.FILE_SERVER_PDF_PATH); // Use the environment variable
  },
  //   filename: (req, file, cb) => {
  //     cb(null, file.originalname); // Save the file with its original name
  //   },
  filename: (req, file, cb) => {
    const dateTime = getFormattedDateTime(); // Get the current date and time
    const ext = path.extname(file.originalname); // Get file extension
    const baseName = "invoice_details"; // Use your desired fixed file name
    cb(null, `${baseName}_${dateTime}${ext}`); // Save the file with the date-time appended
  },
});

const upload = multer({ storage });

// API endpoint to save the PDF
savePDF.post("/save-pdf", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  console.log(`File saved to: ${req.file.path}`);
  res.status(200).send("PDF saved successfully!");
});

module.exports = savePDF;
