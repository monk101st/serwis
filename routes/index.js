const express = require('express');
const router = express.Router();

const login = 'admin';
const password = 'maciek3003';

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

/* GET LOGOWANIE _ FORM */
router.get('/login', (req, res, next) => {
  res.render('login', { title: 'Logowanie' });
});

/* POST LOGOWANIE PRZEJĘCIE DANYCH */
router.post('/login', (req, res) => {
  const body = req.body;
  if (body.login === login && body.password === password) {

    req.session.admin = 1;  //Wywołanie sesji

    res.redirect('/admin');
  }else {
    res.redirect('/login');
  }
  
});

module.exports = router;
