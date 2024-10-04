const myhealth = require('../models/health')

const health_title = (req, res)=> {
    myhealth.find()
        .then((result)=> {
            res.render('health', { title: 'Health Care Information', health: result })
        })
        .catch((err) => {
            console.log(err)
        })
}

//ส่งข้อมููลตัวอย่าง ใน Health Care Information
const health_creat = (req, res) => {
    const sampleData = [
        {
            Health_Title: "5 วิธีการดูแลสุขภาพที่ง่าย",
            Sub_Title: "การดูแลสุขภาพไม่จำเป็นต้องซับซ้อน",
            Health_Detial: "มาดูกันว่ามีวิธีไหนบ้างที่คุณสามารถทำได้ในชีวิตประจำวัน..."
        },
        {
            Health_Title: "ประโยชน์ของการออกกำลังกาย",
            Sub_Title: "การออกกำลังกายเป็นสิ่งสำคัญ",
            Health_Detial: "ทำให้คุณรู้สึกสดชื่นและกระปรี้กระเปร่า..."
        },
        {
            Health_Title: "อาหารที่ดีต่อสุขภาพ",
            Sub_Title: "การเลือกอาหารที่เหมาะสม",
            Health_Detial: "สามารถช่วยให้คุณมีสุขภาพที่ดี..."
        }
    ];

    myhealth.insertMany(sampleData)
        .then((result) => {
            console.log("ตัวอย่างข้อมูลถูกเพิ่มเรียบร้อยแล้ว");
            res.redirect('/blogs'); // เปลี่ยนเป็นเส้นทางที่เหมาะสมตามที่คุณต้องการ
        })
        .catch((err) => {
            console.log(err);
        });
}

const health_detail = (req, res)=> {
     const articleId = req.params.id;
    
    myhealth.findById(articleId)
        .then(result => {
            res.render('healthDetail', { title: result.Health_Title, article: result });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Error retrieving article');
        });
};

const getHealthDetail = (req, res) => {
    const articleId = req.params.id;
    
    myhealth.findById(articleId)
        .then(result => {
            res.render('healthDetail', { title: result.Health_Title, article: result });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Error retrieving article');
        });
};

module.exports = {
    health_title,
    health_creat,
    getHealthDetail
}