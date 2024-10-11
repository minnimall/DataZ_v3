// routes/armDumbbelRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const LegWorkout = require('../models/LegWorkout');
// Route สำหรับบันทึกข้อมูล LegWorkout
router.post('/add', async (req, res) => {
  const { title, videoUrl, imgUrl, description, duration, categories, difficulty, fireLevel } = req.body;

  try {
    const legWorkout = new LegWorkout({ title, videoUrl, imgUrl, description, duration, categories, difficulty, fireLevel });
    await legWorkout.save();
    res.redirect('/leg-workout'); // เปลี่ยนเส้นทางไปที่หน้า Arm Dumbbel
  } catch (error) {
    console.error('Error saving leg-workout:', error);
    res.status(500).send('Error saving leg-workout');
  }
});

// routes/armDumbbelRoutes.js
router.get('/', async (req, res) => {
  try {
    const legWorkoutExercises = await LegWorkout.find();
    const username = req.session.username; // ดึง username จาก session
    let user = null;

    if (username) {
      user = await User.findOne({ username: username }); // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
    }

    res.render('LegWorkout', { legWorkoutExercises, user }); // ส่งตัวแปร user ไปด้วย
  } catch (error) {
    console.error('Error loading LegWorkout exercises:', error);
    res.status(500).send('Error loading LegWorkout exercises');
  }
});


// ใน armDumbbelRoutes.js
// armDumbbelRoutes.js
router.get('/leg-workout', async (req, res, next) => {
    const legWorkoutExercises = [
        // รายการการออกกำลังกายที่นี่
    ];

    // แยกการออกกำลังกายตามระดับความยาก
    const exercises = {
        easy: legWorkoutExercises.filter(exercise => exercise.difficulty === 'easy'),
        medium: legWorkoutExercises.filter(exercise => exercise.difficulty === 'medium'),
        hard: legWorkoutExercises.filter(exercise => exercise.difficulty === 'hard')
    };

    const username = req.session.username;
    let user = null;

    if (username) {
        user = await User.findOne({ username: username }); // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
    }

    res.render('Legworkout', { exercises, user });
});

// Route สำหรับการลบการออกกำลังกาย
router.delete('/delete/:id', async (req, res) => {
  try {
    const exerciseId = req.params.id;
    await LegWorkout.findByIdAndDelete(exerciseId); // ค้นหาและลบการออกกำลังกาย
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
    await LegWorkout.findByIdAndUpdate(exerciseId, updatedData);
    res.redirect('/leg-workout');
  } catch (error) {
    console.error('Error updating exercise:', error);
    res.status(500).send('Error updating exercise');
  }
});

module.exports = router;
