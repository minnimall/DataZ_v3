const express = require('express')
const healthController = require('../controllers/healthController')
const router = express.Router()

router.get('/', healthController.health_title)
router.get('/insert', healthController.health_creat)
router.post('/healthget/:id',healthController.getHealthDetail)
router.get('/reset',healthController.resetHealthData)
router.get('/create',(req, res)=> {
    res.render('healthinput')
})
router.post('/create',healthController.health_creat_input)
router.post('/delete/:id', healthController.deleteHealthDetail);

module.exports = router;