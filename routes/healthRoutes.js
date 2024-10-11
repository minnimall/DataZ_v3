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

// router.get('/', async (req, res) => {
//     try {
//       const health = await myhealth.find();
//       const username = req.session.username; // ดึง username จาก session
//       let user = null;
  
//       if (username) {
//         user = await User.findOne({ username: username }); // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
//       }
  
//       res.render('health', { health, user }); // ส่งตัวแปร user ไปด้วย
//     } catch (error) {
//       console.error('Error loading :', error);
//       res.status(500).send('Error loading');
//     }
//   });

module.exports = router;