const express = require('express')
const gallery = require('./gallery')
const router = express.Router()

router.use(gallery)

module.exports = router
