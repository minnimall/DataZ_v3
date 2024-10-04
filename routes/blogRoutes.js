const express = require('express')
const blogController = require('../controllers/blogController')
const router = express.Router()

//ดึงข้อมูลมาโชว์
//.sort เรียงลำดับ createdAt -1 คือเรียงจากอันล่าสุดแสดงก่อนแล้วเรียงลำดับลงไป
router.get('/', blogController.blog_index)

//บันทึกข้อมูลจาก form
//ส่วน action ใน form สำหรับกรอกค่าบันทึกข้อมูลและบันทึกข้อมูลลงฐานข้อมูล
router.post('/', blogController.blog_creat_post)

//path ไปหน้า create.ejs ปกติ
router.get('/create', blogController.blog_create_get)

//ดึงข้อมูลตาม id ของแต่ละ blogs
router.get('/:id', blogController.blog_detail)

//ลบข้อมูล
router.delete('/:id', blogController.blog_delete)

// ดึงข้อมูลมาแสดงในหน้า edit ตาม id
router.get('/:id/edit', blogController.blog_edit_get);

//แก้ไขข้อมูล
router.put('/:id', blogController.blog_update_put)

module.exports = router