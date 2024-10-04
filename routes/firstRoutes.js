const express = require('express');
const router = express.Router();
const User = require('../models/User'); // นำเข้าโมเดล User

router.get('/', async (req, res, next) => {
    try {
        const username = req.session.username; // ดึงชื่อผู้ใช้จาก session
        let user = null;

        if (username) {
            user = await User.findOne({ username: username }); // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
        }

        res.render('first', { user }); // ส่ง user ไปที่ view
    } catch (err) {
        console.error(err);
        res.status(500).send('เกิดข้อผิดพลาด');
    }
});

module.exports = router;
