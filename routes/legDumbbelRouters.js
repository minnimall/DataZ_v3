// routes/armDumbbelRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const LegDumbbel = require('../models/LegDumbbel');

// Route สำหรับบันทึกข้อมูล leg Dumbbel
router.post('/add', async (req, res) => {
  const { title, videoUrl, imgUrl, description, duration, categories, difficulty, fireLevel } = req.body;

  try {
    const legDumbbel = new LegDumbbel({ title, videoUrl, imgUrl, description, duration, categories, difficulty, fireLevel });
    await legDumbbel.save();
    res.redirect('/leg-dumbbel'); // เปลี่ยนเส้นทางไปที่หน้า Leg Dumbbel
  } catch (error) {
    console.error('Error saving Leg Dumbbel:', error);
    res.status(500).send('Error saving Leg Dumbbel');
  }
});

// routes/legDumbbelRoutes.js
router.get('/', async (req, res) => {
  try {
    const legDumbbelExercises = await LegDumbbel.find();
    const username = req.session.username; // ดึง username จาก session
    let user = null;

    if (username) {
      user = await User.findOne({ username: username }); // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
    }

    res.render('Leg_Dumbbel', { legDumbbelExercises, user }); // ส่งตัวแปร user ไปด้วย
  } catch (error) {
    console.error('Error loading Leg Dumbbel exercises:', error);
    res.status(500).send('Error loading Leg Dumbbel exercises');
  }
});


// ใน armDumbbelRoutes.js
// armDumbbelRoutes.js
router.get('/leg-dumbbel', async (req, res, next) => {
    const legDumbbelExercises = [
        // รายการการออกกำลังกายที่นี่
    ];

    // แยกการออกกำลังกายตามระดับความยาก
    const exercises = {
        easy: legDumbbelExercises.filter(exercise => exercise.difficulty === 'easy'),
        medium: legDumbbelExercises.filter(exercise => exercise.difficulty === 'medium'),
        hard: legDumbbelExercises.filter(exercise => exercise.difficulty === 'hard')
    };

    const username = req.session.username;
    let user = null;

    if (username) {
        user = await User.findOne({ username: username }); // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
    }

    res.render('Leg_Dumbbel', { exercises, user });
});

// Route สำหรับการลบการออกกำลังกาย
router.delete('/delete/:id', async (req, res) => {
  try {
    const exerciseId = req.params.id;
    await LegDumbbel.findByIdAndDelete(exerciseId); // ค้นหาและลบการออกกำลังกาย
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
    await LegDumbbel.findByIdAndUpdate(exerciseId, updatedData);
    res.redirect('/leg-dumbbel');
  } catch (error) {
    console.error('Error updating exercise:', error);
    res.status(500).send('Error updating exercise');
  }
});

module.exports = router;