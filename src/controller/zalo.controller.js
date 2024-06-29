const { sendZaloService } = require('../services/zalo.service')

const getInfoZalo = async (req, res, next) => {
    try{
        const oa_uid = req.query.oa_uid
        if(!oa_uid) {
            return res.status(404).render('notFound', {
                pageTitle: 'Not found'
            });
        }
        res.render('zalo/index', {
            pageTitle: 'Lấy thông tin',
        })
    }catch(err) {
        next(err)
    }
    
}

const sendZalo = async (req, res, next) => {
    try{
        const {name, phone_number, oa_uid} = req.body

        if(!phone_number || !oa_uid) {
            return res.status(400).json({message: 'Not found', code: 400})
        }

        const values = JSON.stringify({
            name,
            phone_number,
            oa_uid
        })
        const data = await sendZaloService(values)
        if(data) {
            res.status(data.code).json({...data})
        }
    }catch(err) {
        next(err)
    }
}

module.exports = {
    sendZalo,
    getInfoZalo
}