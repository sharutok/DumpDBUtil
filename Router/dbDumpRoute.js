const express = require('express')
const { SQLDumpAll } = require('../Controller/SQLdbDumpContoller')
const { NoSQLDumpAll } = require('../Controller/NoSQLDumpController')
const { DumpDB } = require('../Scheduler/ScheduleDump')
const dbDumpRoute = express.Router()

dbDumpRoute.route('/v1/all/sql/db').get(SQLDumpAll)
dbDumpRoute.route('/v1/all/no-sql/db').get(NoSQLDumpAll)
dbDumpRoute.route('/v1/all/both/sql/db').get(DumpDB)

module.exports = dbDumpRoute
