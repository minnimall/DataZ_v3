const express = require('express')
const healthController = require('../controllers/healthController')
const router = express.Router()

router.get('/', healthController.health_title)
router.get('/insert', healthController.health_creat)
router.get('/find/:id',healthController.getHealthDetail)
router.get('/reset',healthController.resetHealthData)

module.exports = router