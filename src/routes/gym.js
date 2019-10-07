const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Gym = require('../models/gym.model');
const User = require('../models/user.model');

// Getting all gyms in a database
router.get('/', (req, res, next) => {
    Gym.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

// Getiing a gym by id
router.get('/:gymId', (req, res, next) => {
    const id = req.params.gymId;
    Gym.findById(id)
        .populate('User')
        .then(doc => {
            console.log('This is from database', doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: 'No vaild user' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

// Adding a user to a gym
router.post('/:gymId', (req, res, next) => {
    const gymId = req.params.gymId;
    const userId = req.body.userId;

    Gym.findByIdAndUpdate(gymId, { $push: { user: userId } })
        .exec()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Handling add user to gym',
                registedGym: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err.message });
        });
});

// Adding a gym to database
router.post('/add', (req, res, next) => {
    const newGym = new Gym({
        _id: new mongoose.Types.ObjectId(),
        company: req.body.company,
        name: req.body.name,
        formattedAddress: req.body.formattedAddress,
        lat: req.body.lat,
        lng: req.body.lng
    });

    newGym
        .save()
        .then(result => {
            console.log('this is req.body', req.body);
            res.status(201).json({
                message: 'Handling gym registration',
                registedGym: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err.message });
        });
});

// Deleting a gym by id
router.delete('/:gymId', (req, res, next) => {
    const id = req.params.gymId;
    Gym.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;
