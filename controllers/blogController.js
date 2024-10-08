const Blog = require('../models/blogs')
const User = require('../models/User');

//blog create
const blog_create = (req, res) => {
    const { title, content } = req.body;
    const username = req.session.username; // ดึง username จาก session

    // ค้นหา user จาก username
    User.findOne({ username: username })
        .then((user) => {
            if (!user) {
                return res.status(404).render('404', { mytitle: 'User not found' });
            }

            const newBlog = new Blog({
                userId: user._id,
                title,
                content
            });

            return newBlog.save();
        })
        .then(() => {
            res.redirect('/profile');
        })
        .catch((error) => {
            console.error("Error creating blog:", error);
            return res.status(500).render('error', { mytitle: 'Error creating blog' });
        });
};

// blog_delete
const blog_delete = (req,res) => {
    const bid = req.params.id
    Blog.findByIdAndDelete(bid)
        .then(result => {
            res.json({redirect: '/profile'})
        })
        .catch(err => {
            console.log(err)
        })
}

// blog_edit_get
const blog_edit_get = (req, res) => {
    const bid = req.params.id;
    Blog.findById(bid)
        .then(result => {
            res.render('blogs/edit', { mytitle: 'Edit Blog', blog: result });
        })
        .catch(err => {
            res.status(404).render('404', { mytitle: 'Blog not found' });
        });
};

// blog_update_put
const blog_update_put = (req, res) => {
    const bid = req.params.id;

    Blog.findByIdAndUpdate(bid, req.body, { new: true })
        .then(result => {
            res.redirect('/profile');
        })
        .catch(err => {
            console.log(err);
            res.status(400).render('404', { mytitle: 'Blog not found' });
        });
};

// exports เพื่อให้ไฟล์อื่นสามารถเรียกใช้งานได้
module.exports = {
    blog_create,
    blog_delete,
    blog_edit_get,
    blog_update_put
}
