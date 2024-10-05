// authMiddleware.js
const checkAuth = (req, res, next) => {
    if (req.session.username) {
        next(); // อนุญาตให้เข้าถึง
    } else {
        res.redirect('/login'); // เปลี่ยนเส้นทางไปยังหน้า login
    }
};

module.exports = checkAuth;