const express = require('express');
const router = express.Router();

router.all('*', (req, res, next) => {
    if (!req.session.admin) {
        res.redirect('/login');
        return; //jeśli nie ma sesji trzeba zatrzymać funkcję żeby nie robiła kolejnych roterów
    }
    next(); //jeśli sesja istnieje to przechodzi do admin - pamieta 24 godziny
})

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('admin', { title: 'Admin' });
});

module.exports = router;
