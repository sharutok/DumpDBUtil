const util = require("util");
const fs = require("fs");
const path = require("path");
const exec = util.promisify(require("child_process").exec);
const moment = require("moment");
const handlebars = require("handlebars");
const sendEmail = require("../EmailConfig");
const date = moment().format("DD-MM-YYYY");

exports.writeStatus = async () => {
  try {
    true &&
      readHTMLFile(
        path.join(__dirname, "../", "MailBody.html"),
        async function (err, html) {
          if (err) {
            console.log("error reading file", err);
            return;
          }

          const template = handlebars.compile(html);
          const replacements = {
            date: date,
            path: path.join(__dirname, "../Dump"),
          };
          var htmlToSend = template(replacements);

          await sendEmail({
            subject: "Database Dump Report",
            html: htmlToSend,
          });
        }
      );
    console.log("sent mail");
  } catch (error) {
    console.log("error in sending email", error);
  }
};

//HELPER FUNC
const readHTMLFile = function (path, callback) {
  fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
    if (err) {
      callback(err);
    } else {
      callback(null, html);
    }
  });
};
