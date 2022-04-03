const express = require('express');
const router = express.Router();
const News = require('../models/news');
const defaultSort = -1;

/* GET home page. */
router.get('/', (req, res, next) => {
  
  const search = req.query.search || '';  //zmienna w której jest tekst z okna wyszukiwania
  let sort = req.query.sort || defaultSort;  //ze względu na zabezpieczenie poniże trzeba użyć zmniennej

    if(sort !== 1 || sort !== -1){
        sort = defaultSort;
    }

  const newsList = News
    .find({title: new RegExp(search.trim(), 'i')})
    .sort({date: sort}) //RegExp metoda wyszukiwania po kawałku tekstu. Trim metoda ignorująca spacę przed wyszyukiwanym tekstem
    .select('_id title description'); //metoda  ogranicza pola które sa wyświetlane 


  newsList.exec((err, data) => {
    res.json({data});
  });

});

router.get('/:id', (req, res) => {
    const id = req.params.id;
  
    const newsList = News
      .findById(id)
      .select('_id title author description');  //metoda  ogranicza pola które sa wyświetlane 
  
    newsList.exec((err, data) => {
      res.json({data});
    });
  
  });

module.exports = router;