const express = require('express')

const { getOnlineClass, sendSurvey } = require('../controller/onlineClass.controller')
const { sendZalo, getInfoZalo } = require('../controller/zalo.controller')

const router = express.Router()

router.get('/online_class', getOnlineClass)
router.post('/online_class', sendSurvey)
router.get('/zalo', getInfoZalo)
router.post('/zalo', sendZalo)


module.exports = router