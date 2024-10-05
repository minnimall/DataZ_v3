// routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const Event = require('../models/Event'); // หรือเปลี่ยนชื่อโมเดลตามที่คุณใช้งาน

// Route สำหรับสร้างกิจกรรม
router.post('/', async (req, res) => {
    const { title, date, userId } = req.body;
    const event = new Event({ title, date, userId });
    await event.save();
    res.redirect('/events'); // หรือเส้นทางที่คุณต้องการ
});

// Route สำหรับแสดงกิจกรรม
router.get('/', async (req, res) => {
    const events = await Event.find({ userId: req.session.userId }); // ฟิลเตอร์ตาม userId
    res.render('events', { events }); // เปลี่ยนตามชื่อ view ที่คุณต้องการ
});

// Route สำหรับลบกิจกรรม
router.delete('/:id', async (req, res) => {
    await Event.findByIdAndDelete(req.params.id);
    res.redirect('/events');
});

// Route สำหรับแก้ไขกิจกรรม
router.get('/:id/edit', async (req, res) => {
    const event = await Event.findById(req.params.id);
    res.render('editEvent', { event });
});

router.put('/:id', async (req, res) => {
    const { title, date } = req.body;
    await Event.findByIdAndUpdate(req.params.id, { title, date });
    res.redirect('/events');
});

module.exports = router;
