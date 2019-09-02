const express = require('express');
const router = express.Router();
const knex = require('../public/client');
const makeTeam = require('../public/js/makeTeams');


router.get('/', (req, res) => {
    knex('cohorts')
        .select("*")
        .then((data) => {
            res.render('cohorts/index', {
                cohorts: data,
            });
        });
});

// new cohorts

router.get('/new', (req, res) => {
    res.render('cohorts/new');
});

// create

router.post('/cohorts/new', (req, res) => {
    const cohortsParams = {
        name: req.body.name,
        members: req.body.members,
        logoUrl: req.body.logoUrl,
    };
    knex('cohorts')
        .insert(cohortsParams)
        .returning("*")
        .then((data) => {
            res.redirect('/');
        });
});
// show by Id

router.get('/cohorts/:id', (req, res) => {
    knex('cohorts')
        .select("*")
        .where({ id: req.params.id })
        .then((data) => {
            res.render('cohorts/show', {
                cohorts: data[0],
                cohortsTeam: "none",
            });
        });
});
// team picker

router.post('/cohorts/:id/assign', (req, res) => {
    const cohortsTeam = {
        members: req.body.members,
        quantity: req.body.quantity,
        type: req.body.type,
    };
    knex('cohorts')
        .select("*")
        .where({ id: req.params.id })
        .then((data) => {
            res.render('cohorts/show', () => {
                cohorts: data[0],
                 makeTeam(cohortsTeam)
            });
        });
});

// delete

router.delete('/cohorts/:id', (req, res) =>{
    knex('cohorts')
    .where({id: req.params.id})
    .then((data) =>{
        res.redirect('/')
    })
})


// edit

router.get('/cohorts/:id/edit', (req, res) =>{
    knex('cohorts')
    .select("*")
    .where({id: req.params.id})
    .then((data)=>{
        res.render('cohorts/edit', {
            cohorts: data[0]
        })
    })
})


module.exports = router;
