
const express = require('express');
const router = express.Router();
const Abs = require('../models/Abs');
const User = require('../models/User')


router.post('/add', async (req, res) => {
  const { title, videoUrl, imgUrl, description, duration, categories, difficulty, fireLevel } = req.body;

  try {
    const abs = new Abs({ title, videoUrl, imgUrl, description, duration, categories, difficulty, fireLevel });
    await abs.save();
    res.redirect('/abs'); 
  } catch (error) {
    console.error('Error saving abs :', error);
    res.status(500).send('Error saving abs ');
  }
});



router.get('/', async (req, res) => {
    try {
      const absExercises = await Abs.find();
      const username = req.session.username; // ดึง username จาก session
      let user = null;
  
      if (username) {
        user = await User.findOne({ username: username }); // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
      }
  
      res.render('abs', { absExercises, user }); // ส่งตัวแปร user ไปด้วย
    } catch (error) {
      console.error('Error loading Arm  exercises:', error);
      res.status(500).send('Error loading Arm  exercises');
    }
  });


//// ใน armDumbbelRoutes.js
// armDumbbelRoutes.js
router.get('/abs', async (req, res, next) => {
    const absExercises = [
        // รายการการออกกำลังกายที่นี่
    ];

    // แยกการออกกำลังกายตามระดับความยาก
    const exercises = {
        easy: absExercises.filter(exercise => exercise.difficulty === 'easy'),
        medium: absExercises.filter(exercise => exercise.difficulty === 'medium'),
        hard: absExercises.filter(exercise => exercise.difficulty === 'hard')
    };

    const username = req.session.username;
    let user = null;

    if (username) {
        user = await User.findOne({ username: username }); // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
    }

    res.render('abs', { exercises, user });
});


// Route สำหรับการลบการออกกำลังกาย
router.delete('/delete/:id', async (req, res) => {
  try {
    const exerciseId = req.params.id;
    await Abs.findByIdAndDelete(exerciseId); // ค้นหาและลบการออกกำลังกาย
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
    await Abs.findByIdAndUpdate(exerciseId, updatedData);
    res.redirect('/abs');
  } catch (error) {
    console.error('Error updating exercise:', error);
    res.status(500).send('Error updating exercise');
  }
});

module.exports = router;
