const { NoSQLDumpAll } = require("../Controller/NoSQLDumpController")
const { SQLDumpAll } = require("../Controller/SQLdbDumpContoller")
const schedule = require('node-schedule');
const { writeStatus } = require("../Controller/SchedulerController");

exports.DumpDB = async (req, res) => {
    try {
        await Promise.all[await NoSQLDumpAll(), await SQLDumpAll(), writeStatus()]
        console.log("Dumped scheduler 👍");
        res && res.json({ mess: "dumped" })
    } catch (error) {
        res && res.json({ mess: "error", error })
    }

}

schedule.scheduleJob("30 0 * * *", () => {
    this.DumpDB()
})