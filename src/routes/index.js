const express = require('express')

const { getOnlineClass } = require('../controller/onlineClass.controller')

const router = express.Router()

router.get('/online_class', getOnlineClass)

module.exports = router