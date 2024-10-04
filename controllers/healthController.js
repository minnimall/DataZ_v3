const myhealth = require('../models/health')

const health_title = (req, res)=> {
    myhealth.find()
        .then((result)=> {
            res.render('health', { title: 'Health Care Information', health: result })
        })
        .catch((err) => {
            console.log(err)
        })
}

module.exports = {
    health_title
}