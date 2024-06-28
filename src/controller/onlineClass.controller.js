
const getOnlineClass = async (req, res, next) => {
    try{
        res.render('online_class/index', {
            pageTitle: 'Đánh giá sau buổi học'
        })
    }catch(err) {
        console.log(err);
    }
}

module.exports = {
    getOnlineClass
}