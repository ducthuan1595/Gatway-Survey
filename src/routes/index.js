const express = require('express')

const { getOnlineClass, sendSurvey } = require('../controller/onlineClass.controller')
const { getInfoZalo } = require('../controller/zalo.controller')

const router = express.Router()

router.get('/online_class', getOnlineClass)
router.get('/zalo', getInfoZalo)
router.post('/send-survey', sendSurvey)

module.exports = router