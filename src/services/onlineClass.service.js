const { URL_API } = require('../utils/constant')

const getOnlineClassService = (sessionInput) => {
    return new Promise((resolve, reject) => {
        try{
            fetch(`${URL_API}/api/v1/private_teacher/session_evaluation?session_input=${sessionInput}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                if(data.code === 200) {
                    const isSurvey = !!data.data.parent_evaluation
                    resolve ({
                        isSurvey,
                        data: data.data
                    })
                }
            })
            .catch(err => {
                reject(err)
            })
        }catch(err) {
            reject(err)
        }
    })
}

const sendSurveyService = (values) => {
    return new Promise((resolve, reject) => {
        try{

            fetch(`${URL_API}/api/v1/private_teacher/parent_evaluation}`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: values
            })
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log({data});
                if(data.code === 201) {
                    resolve ({
                        message: data.message,
                        code: data.code
                    })
                }
            })
            .catch(err => {
                reject(err)
            })
        }catch(err) {
            reject(err)
        }
    })
}

module.exports = {
    getOnlineClassService,
    sendSurveyService
}