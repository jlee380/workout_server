const express = require('express');
const Gym = require('../models/gym.model');
// import express from 'express';
// import Gym from '../models/gym.model';

const router = express.Router();
// const router = express.Router();

router.route('/').get((req, res) => {
    Gym.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const company = req.body.company;
    // const location = req.body.location;

    const newCompany = new Gym({ company });

    newCompany
        .save()
        .then(() => res.json('Company added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
