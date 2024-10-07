const mongoose = require('mongoose');
const HealthSchema = new mongoose.Schema({
    Health_Title: { 
        type: String, 
        required: true
    },
    Sub_Title: { 
        type: String, 
        required: true 
    },
    Health_Detial: {
        type: String, 
        required: true 
    }
});

const myhealth = mongoose.model('HealthCare', HealthSchema);
module.exports = myhealth;