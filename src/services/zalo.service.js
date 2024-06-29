const { URL_API } = require('../utils/constant')

const sendZaloService = (values) => {
    return new Promise(async(resolve, reject) => {
        try{
            const res = await fetch(`${URL_API}/api/v1/zalo/link_account`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: values
            });
            const result = await res.json();
            resolve({
                message: result.message,
                code: result.code
            })
            
        }catch(err) {
            reject(err)
        }
    })
}

module.exports = {
    sendZaloService
}