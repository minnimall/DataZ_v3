const express = require('express')
const blogController = require('../controllers/blogController')
const router = express.Router()

//เพิ่มข้อมูล
router.post('/',blogController.blog_create);

//ลบข้อมูล
router.delete('/:id', blogController.blog_delete)

// ดึงข้อมูลมาแสดงในหน้า edit ตาม id
router.get('/edit/:id', blogController.blog_edit_get);

//แก้ไขข้อมูล
router.put('/:id', blogController.blog_update_put)

module.exports = router