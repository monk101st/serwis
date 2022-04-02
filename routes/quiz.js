const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz');

/* GET home page. */
router.get('/', (req, res, next) => {
  const show = !req.session.vote    //negacja sprawia żę jeśli jest sesja to nie pokazuje formularza

  
  Quiz.find({}, (err, data) => {
    let sum = 0;  //suma wszystkich głosów
    data.forEach((item) => {
      sum += item.vote; //za pomocą forEach zlicza wszystkie oddane głosy
    })
    res.render('quiz', { title: 'Quiz', data, show, sum});
  })
});

router.post('/', (req, res, next) => {
  const id = req.body.quiz;
  
  Quiz.findOne({_id: id}, (err, data) => {  //Wyszukanie kliknietej odpowiedzi w bazie

  data.vote = data.vote + 1;  //dodanie liczby głosowań 
  data.save(() => {     //zapisanie do bazy - nie zawsze trzeba stosować update
    req.session.vote = 1;
    res.redirect('/quiz');  //redirect w callbacku żeby wykonał się po zapisaniu
  });
  });
});
module.exports = router;
