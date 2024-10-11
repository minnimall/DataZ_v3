const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  Title: { type: String, required: true },
  Sub_Title: { type: String, required: true },
  Description: { type: String, required: true }
});

module.exports = mongoose.model('Food', foodSchema);
