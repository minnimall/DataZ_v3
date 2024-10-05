// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    bmi: {
        type: Number, // หรือ String ขึ้นอยู่กับรูปแบบข้อมูลที่คุณต้องการ
        default: null // เริ่มต้นเป็น null
    }
});

module.exports = mongoose.model('User', userSchema);