const express = require('express')
const morgan = require('morgan')
const dbDumpRoute = require('./Router/dbDumpRoute')
const app = express()

app.use(morgan('tiny'))

app.use('/dump', dbDumpRoute)

module.exports = app