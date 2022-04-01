const express = require('express');
const router = express.Router();
const News = require('../models/news');

/* GET home page. */
router.get('/', (req, res, next) => {
  
  const search = req.query.search || '';  //zmienna w której jest tekst z okna wyszukiwania
  const newsList = News.find({title: new RegExp(search.trim(), 'i')}).sort({date: -1}); //RegExp i trim zawierają sie w mongoose

  newsList.exec((err, data) => {
    res.render('news', { title: 'Aktualności', data, search});
  });

});

module.exports = router;
