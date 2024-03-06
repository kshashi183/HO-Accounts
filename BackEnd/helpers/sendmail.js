const nodemailer = require("nodemailer");
const { merge } = require("merge-pdf-buffers");

const sendAttachmails = async (
  to,
  cc,
  mailsubject,
  mailbody,
  file,
  callback
) => {
  console.log(mailsubject);
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "magodlaser3@gmail.com",
      pass: "nisxnacwozjtuplp",
    },
  });
  let info = await transporter.sendMail({
    from: '"Magod Laser" <magodlaser3@gmail.com>', // sender address
    to: to, // list of receivers
    cc: cc,
    subject: mailsubject, // Subject line
    text: mailbody,
    html: mailbody.replaceAll("\n", "<br/>"), // plain text body
    attachments: [file],
  });
  if (info.messageId) {
    callback(null, info.messageId);
  } else {
    callback("Error in sending mail", null);
  }
};

module.exports = { sendAttachmails };
