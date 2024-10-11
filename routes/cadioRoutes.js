// routes/cadio.js
const express = require('express');
const router = express.Router();
const Cadio = require('../models/Cadio');
const User = require('../models/User')

// Route สำหรับบันทึกข้อมูล cadioDumbbel
router.post('/add', async (req, res) => {
  const { title, videoUrl, imgUrl, description, duration, categories, difficulty, fireLevel } = req.body;

  try {
    const cadio = new Cadio({ title, videoUrl, imgUrl, description, duration, categories, difficulty, fireLevel });
    await cadio.save();
    res.redirect('/cardio'); // เปลี่ยนเส้นทางไปที่หน้า cadio
  } catch (error) {
    console.error('Error saving Cadio :', error);
    res.status(500).send('Error saving Cadio ');
  }
});


// routes/Cadio.js
router.get('/', async (req, res) => {
    try {
      const cadioExercises = await Cadio.find();
      const username = req.session.username; // ดึง username จาก session
      let user = null;
  
      if (username) {
        user = await User.findOne({ username: username }); // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
      }
  
      res.render('Cardio', { cadioExercises, user }); // ส่งตัวแปร user ไปด้วย
    } catch (error) {
      console.error('Error loading Cadio  exercises:', error);
      res.status(500).send('Error loading Cadio  exercises');
    }
  });


//// ใน armDumbbelRoutes.js
// armDumbbelRoutes.js
router.get('/Cardio', async (req, res, next) => {
    const cadioExercises = await Cadio.find();

    // แยกการออกกำลังกายตามระดับความยาก
    const exercises = {
        easy: cadioExercises.filter(exercise => exercise.difficulty === 'easy'),
        medium: cadioExercises.filter(exercise => exercise.difficulty === 'medium'),
        hard: cadioExercises.filter(exercise => exercise.difficulty === 'hard')
    };

    const username = req.session.username;
    let user = null;

    if (username) {
        user = await User.findOne({ username: username }); // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
    }

    res.render('Cardio', { exercises, user, cadioExercises });
});


// Route สำหรับการลบการออกกำลังกาย
router.delete('/delete/:id', async (req, res) => {
  try {
    const exerciseId = req.params.id;
    await Cadio.findByIdAndDelete(exerciseId); // ค้นหาและลบการออกกำลังกาย
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
    await Cadio.findByIdAndUpdate(exerciseId, updatedData);
    res.redirect('/cadio');
  } catch (error) {
    console.error('Error updating exercise:', error);
    res.status(500).send('Error updating exercise');
  }
});

module.exports = router;
