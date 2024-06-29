const { getOnlineClassService, sendSurveyService } = require('../services/onlineClass.service')
const { sendSurveyValidate } = require('../utils/validation/onlineClass')

const getOnlineClass = async (req, res, next) => {
    try{
        const sessionInput = req.query.session_input
        if(!sessionInput) {
            return res.status(404).render('notFound', {
                pageTitle: 'Not found'
            });
        }
        const data = await getOnlineClassService(sessionInput)
        if(data) {
            res.render('online_class/index', {
                pageTitle: 'Đánh giá sau buổi học',
                data: data.data,
                isSurvey: data.isSurvey,
                sessionInput: sessionInput
            })
        }
    }catch(err) {
        next(err)
    }
}

const sendSurvey = async (req, res, next) => {
    try {
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
        next(err)
    }
}

module.exports = {
    getOnlineClass,
    sendSurvey
}