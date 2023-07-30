const schedule = require("node-schedule");
const mysqldump = require("mysqldump");
const moment = require("moment");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

exports.SQLDumpAll = async (req, res) => {
  try {
    const date = moment().format("DD-MM-YYYY");

    //-----ADD DATABASE NAME
    const dbName = [
      "ador",
      "digiwca",
      "fped_kiosk",
      "salesforce_microservice",
      "product_certificate",
    ];

    //----CHECK IF DUMP FOLDER THERE
    const dumpFolderPath = path.join(__dirname, "../", "Dump");
    if (!fs.existsSync(dumpFolderPath)) {
      console.log("created");
      fs.mkdirSync(dumpFolderPath);
    } else console.log(`Exist Dump folder`);

    //----CHECK IF DBNAME FOLDER PATH FOLDER THERE
    await Promise.resolve(
      dbName.map((db, i) => {
        const dbNameFolderPath = path.join(__dirname, `../Dump/${db}`);
        if (!fs.existsSync(dbNameFolderPath)) {
          console.log(`created ${db}`);
          fs.mkdirSync(dbNameFolderPath);
        } else console.log(`Exist ${db} folder`);

        //-----CREATE DUMP OF RESPECTIVE DB
        const sqlDumpFolderPath = path.join(
          __dirname,
          `../Dump/${db}`,
          `${date}.sql`
        );
        if (true) {
          if (!fs.existsSync(sqlDumpFolderPath)) {
            mysqldump({
              connection: {
                host: process.env.ROOT_HOST,
                user: process.env.ROOT_USER,
                password: process.env.ROOT_PASSWORD,
                database: `${db}`,
                port: process.env.ROOT_PORT,
              },
              dumpToFile: sqlDumpFolderPath,
            });
            console.log(`Created ${date}.sql in ${db} folder `);
          } else console.log(`Exist ${date}.sql in ${db} folder `);
        }
      })
    );

    console.log("finished SQL");

    res &&
      res.json({
        mess: `db is dumped on ${date} `,
      });
  } catch (error) {
    console.log(error);
    res &&
      res.json({
        mess: "error in data dump",
      });
  }
};
