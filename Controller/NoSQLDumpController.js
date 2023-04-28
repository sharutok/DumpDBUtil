const { MongoTransferer, MongoDBDuplexConnector, LocalFileSystemDuplexConnector } = require('mongodb-snapshot');
const uri = process.env.URI
const dbname = process.env.NOSQL_DB_NAME
const fs = require('fs');
const path = require('path')
const moment = require('moment')
const date = moment().format('DD-MM-YYYY');

exports.NoSQLDumpAll = async (req, res) => {
    try {

        //-----ADD DATABASE NAME
        const dbName = ["MIS_REPORT"]

        //----CHECK IF DUMP FOLDER THERE
        const dumpFolderPath = path.join(__dirname, '../', "Dump")
        if (!fs.existsSync(dumpFolderPath)) {
            console.log('created');
            fs.mkdirSync(dumpFolderPath);
        } else console.log(`Exisits Dump folder`);


        //----CHECK IF DBNAME FOLDER PATH FOLDER THERE
        await Promise.resolve(dbName.map(async db => {
            const dbNameFolderPath = path.join(__dirname, `../Dump/${db}`)
            if (!fs.existsSync(dbNameFolderPath)) {
                console.log(`created ${db}`);
                fs.mkdirSync(dbNameFolderPath);
            } else console.log(`Exsists ${db} folder`);

            //-----CREATE DUMP OF RESPECTIVE DB
            const sqlDumpFolderPath = path.join(__dirname, `../Dump/${db}`, `${date}.tar`)
            if (true) {
                if (!fs.existsSync(sqlDumpFolderPath)) {
                    await dumpMongo2Localfile(db, sqlDumpFolderPath)
                    console.log(`Created ${date}.tar in ${db} folder `);
                } else console.log(`Exsists ${date}.tar in ${db} folder `);
            }
        }))
        console.log("finished NoSQL");

        res && res.json({ mess: "finished NoSQL" })

    } catch (error) {

        console.log(error);
        res && res.json({ error })
    }


}

async function dumpMongo2Localfile(db, _path) {
    const mongo_connector = new MongoDBDuplexConnector({
        connection: {
            uri,
            dbname: db,
        },
    });

    const localfile_connector = new LocalFileSystemDuplexConnector({
        connection: {
            path: _path,
        },
    });

    const transferer = new MongoTransferer({
        source: mongo_connector,
        targets: [localfile_connector],
    });

    for await (const { total, write } of transferer) {
        console.log(`remaining bytes to write: ${total - write}`);
    }
}

async function restoreLocalfile2Mongo() {
    const mongo_connector = new MongoDBDuplexConnector({
        connection: {
            uri,
            dbname: db,
        },
    });

    const localfile_connector = new LocalFileSystemDuplexConnector({
        connection: {
            path: './backup.tar',
        },
    });

    const transferer = new MongoTransferer({
        source: localfile_connector,
        targets: [mongo_connector],
    });

    for await (const { total, write } of transferer) {
        console.log(`remaining bytes to write: ${total - write}`);
    }
}