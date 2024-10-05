// routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // นำเข้าโมเดล User
const checkAuth = require('./authMiddleware'); // นำเข้า authMiddleware

// Route สำหรับหน้าโปรไฟล์
router.get('/', checkAuth, async (req, res, next) => {
    try {
        const username = req.session.username; // ดึงชื่อผู้ใช้จาก session
        let user = null;

        if (username) {
            user = await User.findOne({ username: username }); // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
        }

        res.render('profile', { user }); // ส่ง user ไปที่ view
    } catch (err) {
        console.error(err);
        res.status(500).send('เกิดข้อผิดพลาด');
    }
});

// Route สำหรับอัปเดต BMI
router.post('/update-bmi', checkAuth, async (req, res) => {
    try {
        const { bmi } = req.body; // รับค่า BMI จากฟอร์ม
        await User.findByIdAndUpdate(req.session.userId, { bmi });
        res.redirect('/profile'); // เปลี่ยนไปยังหน้าโปรไฟล์หลังจากอัปเดต
    } catch (err) {
        console.error('Error updating BMI:', err);
        res.status(500).send('เกิดข้อผิดพลาด');
    }
});

module.exports = router;
