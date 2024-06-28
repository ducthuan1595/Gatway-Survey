const Joi = require('joi')

const sendSurveyValidate = (data) => {
    const surveySchema = Joi.object({
        parent_evaluation: Joi.string().required(),
        session_input: Joi.number().required(),
        parent_explanation: Joi.string().required(false)
    });

    return surveySchema.validate(data);
}


module.exports = {
    sendSurveyValidate,
}