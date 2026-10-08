const express = require('express')
const analyticsRoutes = express.Router()

analyticsRoutes.get("/", getAnalytics)

module.exports = analyticsRoutes