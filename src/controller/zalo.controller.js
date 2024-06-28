
const getInfoZalo = async (req, res, next) => {
    try{
        res.render('zalo/index', {
            pageTitle: 'Đánh giá sau buổi học'
        })
    }catch(err) {
        console.log(err);
    }
}

module.exports = {
    getInfoZalo
}