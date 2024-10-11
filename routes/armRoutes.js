// routes/armDumbbelRoutes.js
const express = require('express');
const router = express.Router();
const Arm = require('../models/Arm');
const User = require('../models/User')

// Route สำหรับบันทึกข้อมูล Arm Dumbbel
router.post('/add', async (req, res) => {
  const { title, videoUrl, imgUrl, description, duration, categories, difficulty, fireLevel } = req.body;

  try {
    const arm = new Arm({ title, videoUrl, imgUrl, description, duration, categories, difficulty, fireLevel });
    await arm.save();
    res.redirect('/arm'); // เปลี่ยนเส้นทางไปที่หน้า Arm
  } catch (error) {
    console.error('Error saving Arm :', error);
    res.status(500).send('Error saving Arm ');
  }
});


// routes/armDumbbelRoutes.js
router.get('/', async (req, res) => {
    try {
      const armExercises = await Arm.find();
      const username = req.session.username; // ดึง username จาก session
      let user = null;
  
      if (username) {
        user = await User.findOne({ username: username }); // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
      }
  
      res.render('arm', { armExercises, user }); // ส่งตัวแปร user ไปด้วย
    } catch (error) {
      console.error('Error loading Arm  exercises:', error);
      res.status(500).send('Error loading Arm  exercises');
    }
  });


//// ใน armDumbbelRoutes.js
// armDumbbelRoutes.js
router.get('/arm', async (req, res, next) => {
    const armExercises = [
        // รายการการออกกำลังกายที่นี่
    ];

    // แยกการออกกำลังกายตามระดับความยาก
    const exercises = {
        easy: armExercises.filter(exercise => exercise.difficulty === 'easy'),
        medium: armExercises.filter(exercise => exercise.difficulty === 'medium'),
        hard: armExercises.filter(exercise => exercise.difficulty === 'hard')
    };

    const username = req.session.username;
    let user = null;

    if (username) {
        user = await User.findOne({ username: username }); // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
    }

    res.render('Arm', { exercises, user });
});


// Route สำหรับการลบการออกกำลังกาย
router.delete('/delete/:id', async (req, res) => {
  try {
    const exerciseId = req.params.id;
    await Arm.findByIdAndDelete(exerciseId); // ค้นหาและลบการออกกำลังกาย
    res.status(200).json({ message: 'Exercise deleted successfully' });
  } catch (error) {
    console.error('Error deleting exercise:', error);
    res.status(500).json({ error: 'Error deleting exercise' });
  }
});

// Route สำหรับการแก้ไขการออกกำลังกาย
router.post('/edit/:id', async (req, res) => {
  try {
    const exerciseId = req.params.id;
    const updatedData = {
      title: req.body.title,
      description: req.body.description,
      duration: req.body.duration,
      categories: req.body.categories.split(','),
      imgUrl: req.body.imgUrl,
      videoUrl: req.body.videoUrl
    };
    await Arm.findByIdAndUpdate(exerciseId, updatedData);
    res.redirect('/arm');
  } catch (error) {
    console.error('Error updating exercise:', error);
    res.status(500).send('Error updating exercise');
  }
});

module.exports = router;
