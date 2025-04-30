const express = require('express')
const router = express.Router()
const { getDashboardStats } = require('../controller/statistics-controller')

router.get('/dashboard-stats', getDashboardStats)
module.exports = router
