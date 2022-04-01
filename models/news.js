const mongoose = require('mongoose');
const { Schema } = mongoose;

const newsSchema = new Schema({
  title:  {type: String, required: [true, 'Pole tytuł jest wymagane !!!']},
  author:  {type: String, required: [true, 'Pole autor jest wymagane !!!']}, 
  description:  {type: String, required: [true, 'Pole opis jest wymagane !!!']},
  date:   {type: Date, default: Date.now},
});

module.exports = mongoose.model('News', newsSchema);