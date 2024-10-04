const express = require('express')
const healthController = require('../controllers/healthController')
const router = express.Router()

router.get('/', healthController.health_title)
router.post('/insert', healthController.health_creat)
router.get('/:id',healthController.getHealthDetail)

module.exports = router