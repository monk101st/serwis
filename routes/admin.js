const express = require('express');
const News = require('../models/news');
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
    News.find({}, (err, data) => {
        console.log(data);
        res.render('admin/index', { title: 'Admin', data});
    });
})    
    

router.get('/news/add', (req, res) => {
    res.render('admin/news-form', { title: 'Dodaj nowy artykuł', body: {}, errors: {} });    //przkazanie body jako pusty obiekt bo to GET
})

router.post('/news/add', (req, res) => {
    const body = req.body;  //przypisanie danych z post
    
    const newsData = new News(body) //nowy Model News z danymi z body
    const errors = newsData.validateSync(); //uruchomienie funkcji walidujących - są w modelu

    newsData.save((err) => {        //zapisanie danych
        if(err) {
            res.render('admin/news-form', { title: 'Dodaj nowy artykuł', errors, body }); //przesłanie nagłówka i błedów i danych 
        } else {
            res.redirect('/admin')
        }
    })
})

router.get('/news/delete/:id', (req, res) => {
    News.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            console.log("Błąd podczas usuwania artykułu");
        } else {
            res.redirect('/admin')
        }
    });
})

module.exports = router;
