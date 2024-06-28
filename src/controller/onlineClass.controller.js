const { getOnlineClassService, sendSurveyService } = require('../services/onlineClass.service')
const { sendSurveyValidate } = require('../utils/validation/onlineClass')

const getOnlineClass = async (req, res, next) => {
    try{
        const sessionInput = req.query.session_input
        if(!sessionInput) {
            return
        }
        const data = await getOnlineClassService(atob(sessionInput))
        if(data) {
            res.render('online_class/index', {
                pageTitle: 'Đánh giá sau buổi học',
                data: data.data,
                isSurvey: data.isSurvey,
                sessionInput: atob(sessionInput)
            })
        }
    }catch(err) {
        res.status(500).json({message: 'Error from Server', code: 500})
    }
}

const sendSurvey = async (req, res) => {
    try {
        console.log(req.body);
        const {
            parent_evaluation,
            parent_explanation,
            session_input
        } = req.body;
        // const {error} = sendSurveyValidate(req.body)
        if(!parent_evaluation || !session_input) {
            return res.status(400).json({message: 'Not found', code: 400})
        }
        let values = JSON.stringify({
            parent_evaluation,
            parent_explanation,
            session_input
        });
        const data = await sendSurveyService(values)
        if(data) {
            res.status(data.code).json({message: data.message, code: data.code})
        }
    }catch(err) {
        res.status(500).json({message: 'Error from Server', code: 500})
    }
}

module.exports = {
    getOnlineClass,
    sendSurvey
}