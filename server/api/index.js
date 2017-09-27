const express = require('express')
const gallery = require('./gallery')
const auth = require('./auth')
const router = express.Router()

router.use(gallery)
router.use(auth)

module.exports = router
