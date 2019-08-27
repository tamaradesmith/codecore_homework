const express = require('express');
const router = express.Router();
const knex = require('../public/client');



router.get('/', (req, res) => {
    knex('cohorts')
        .select("*")
        .then((data) => {
            res.render('cohorts/index', {
                cohorts: data,
            })

        })
})

// new page 
router.get('/new', (req, res) => {
    res.render('cohorts/new')
});

router.post('/cohorts/new', (req, res) => {
    const cohortsParams = {
        name: req.body.name,
        members: req.body.members,
        logoUrl: req.body.logoUrl,
    }
    knex('cohorts')
        .insert(cohortsParams)
        .returning("*")
        .then((data) => {
            res.redirect('/')
        })
})

router.get("/show", (req, res) =>{
    res.render("cohorts/show")
})











module.exports = router;
