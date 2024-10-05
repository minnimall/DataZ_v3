const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const firstRoutes = require('./routes/firstRoutes');
const profileRoutes = require('./routes/profileRoutes');
const healthRoutes = require('./routes/healthRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');

const methodOverride = require('method-override'); // สำหรับแก้ไขข้อมูล
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // นำเข้าจากไฟล์ User.js
const session = require('express-session');
const Blog = require('./models/blogs'); // นำเข้าจากโมเดล Blog ของคุณ

const app = express(); // สร้าง app ก่อนใช้

// ตั้งค่า express-session
app.use(session({
    secret: 'your_secret_key', // เปลี่ยนเป็นคีย์ที่ปลอดภัย
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // ตั้งเป็น true หากใช้ HTTPS
}));

// Connect to MongoDB Atlas
const dbURI = 'mongodb+srv://dullapaht:18072546@cluster0.xyho3qt.mongodb.net/NodeJSDB1?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// กำหนดให้มีการใช้ 'ejs' ในการสร้าง view engine หรือ template engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // ไว้สำหรับช่วยรับข้อมูลที่ user ส่งมาจาก method POST
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

// Middleware ตรวจสอบการเข้าสู่ระบบ
const checkAuth = (req, res, next) => {
    if (req.session.username) {
        next(); // อนุญาตให้เข้าถึง
    } else {
        res.redirect('/login'); // เปลี่ยนเส้นทางไปยังหน้า login
    }
};

// Middleware ตรวจสอบการเข้าสู่ระบบสำหรับทุกเส้นทาง
const redirectToLoginIfNotAuth = (req, res, next) => {
    if (!req.session.username) {
        res.redirect('/login'); // ถ้ายังไม่ได้เข้าสู่ระบบให้ไปหน้า login
    } else {
        next(); // อนุญาตให้เข้าถึง
    }
};

// Middleware ส่ง breadcrumb ไปทุก view
app.use((req, res, next) => {
    const pathArray = req.path.split('/').filter((p) => p); // แปลง path เป็น array
    const breadcrumbs = pathArray.map((p, index) => {
        return {
            name: p.charAt(0).toUpperCase() + p.slice(1), // เปลี่ยนชื่อเป็นตัวใหญ่ตัวแรก
            url: '/' + pathArray.slice(0, index + 1).join('/')
        };
    });
    res.locals.breadcrumbs = [{ name: 'Home', url: '/' }, ...breadcrumbs];
    next();
});

// Route - หน้าแรก (เปลี่ยนเส้นทางไปที่ login เสมอ)
app.get('/', redirectToLoginIfNotAuth, (req, res) => {
    res.redirect('/first'); // เปลี่ยนเส้นทางไปที่หน้าแรกจริงๆ ของคุณแทนการไปที่ login
});


// ใช้ middleware ใน routes ที่ต้องการ
app.use('/first', checkAuth, firstRoutes);
app.use('/profile', checkAuth, profileRoutes);
app.use('/blogs', checkAuth, blogRoutes); // ป้องกันการเข้าถึงเส้นทางบล็อก
app.use('/health', checkAuth, healthRoutes); // ป้องกันการเข้าถึงเส้นทางสุขภาพ
app.use('/exercise', checkAuth, exerciseRoutes); 


// Route - เกี่ยวกับ
app.get('/about', redirectToLoginIfNotAuth, (req, res) => {
    res.render('about', { mytitle: 'About' });
});

// Route - เมนูอาหาร
app.get('/salad', redirectToLoginIfNotAuth, (req, res) => {
    res.render('salad', { menutitle: 'Food Menu', website: 'Healthy Food', menu1: 'Fruit Salad' });
});

// Route - สมัครสมาชิก
app.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).send('ผู้ใช้นี้มีอยู่แล้ว');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            username,
            password: hashedPassword
        });

        await user.save();
        res.redirect('/login');
    } catch (err) {
        console.error('Registration error:', err); // แสดงข้อผิดพลาดในคอนโซล
        res.status(500).send('เกิดข้อผิดพลาด'); // ส่งข้อความผิดพลาด
    }
});

// Route - ล็อกอิน
app.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send('ผู้ใช้ไม่ถูกต้อง');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('รหัสผ่านไม่ถูกต้อง');
        }

        req.session.username = user.username; // บันทึกชื่อผู้ใช้ใน session
        res.redirect('/first'); // เปลี่ยนเส้นทางไปยังหน้าหลัก
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).send('เกิดข้อผิดพลาด');
    }
});

// Route - Dashboard
app.get('/dashboard', checkAuth, (req, res) => {
    res.render('dashboard', { title: 'Dashboard' });
});

// Route - Logout
app.get('/logout', (req, res) => {
    req.session.destroy(); // ทำลาย session
    res.redirect('/login'); // เปลี่ยนเส้นทางไปยังหน้า login
});

// Route - 404
app.use((req, res) => {
    res.status(404).render('404', { mytitle: '404' });
});

// Route - Logout
app.get('/logout', (req, res) => {
    req.session.destroy(); // ทำลาย session
    res.redirect('/login'); // เปลี่ยนเส้นทางไปยังหน้า login
});


