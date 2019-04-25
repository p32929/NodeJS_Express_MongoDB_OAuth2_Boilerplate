var express = require('express');
var router = express.Router();
const Model = require('../models/User');
const mongoose = require('../utils/mongoose')
const jwt = require('passport-jwt')
const Auth = require('./../middlewares/Auth')

// Lazy Responder :)
function responder(res, err, data) {
    if (err || !data) {
        console.log({
            err, data
        })
        res.status(400).send({
            err, data
        })
    } else {
        console.log("Data: " + data)
        res.status(200).send(data)
    }
}

// Login
router.post('/login/', (req, res) => {
    console.log(JSON.stringify(req.body))
    Auth.authenticate(req, (err, data) => {
        responder(res, err, data)
    })
})

// C
router.post('/', Auth.isAuthenticated, (req, res) => {
    Model.createData(req.body, (err, data) => {
        responder(res, err, data)
    })
})

// Ra
router.get('/', Auth.isAuthenticated, (req, res) => {
    Model.getAllData({}, req.query['page'] ? req.query['page'] : 0, (err, data) => {
        responder(res, err, data)
    })
})


// R1
router.get('/byemail/:id', Auth.isAuthenticated, (req, res) => {
    Model.getOneData({email: req.params['id']}, (err, data) => {
        responder(res, err, data)
    })
})

// R1
router.get('/byid/:id', Auth.isAuthenticated, (req, res) => {
    Model.getOneData({_id: req.params['id']}, (err, data) => {
        responder(res, err, data)
    })
})

// U1
router.put('/:id', Auth.isAuthenticated, (req, res) => {
    delete req.body.email

    Model.updateOneData({_id: req.params.id}, req.body, (err, data) => {
        responder(res, err, data)
    })
})

// D1
router.delete('/:id', Auth.isAuthenticated, (req, res) => {
    Model.removeOneData({_id: req.params['id']}, (err, data) => {
        responder(res, err, data)
    })
})

// Da
router.delete('/', Auth.isAuthenticated, (req, res) => {
    Model.removeAllData((err, data) => {
        responder(res, err, data)
    })
})

module.exports = router;