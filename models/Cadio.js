const mongoose = require('mongoose');

const cadioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videoUrl: { type: String, required: true },
  imgUrl: { type: String, required: true },
  description: { type: String },
  duration: { type: String, required: true },
  categories: [String],
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  fireLevel: { type: Number, min: 1, max: 3 },
});

const Cadio = mongoose.model('Cadio', cadioSchema);

module.exports = Cadio;