const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User.model');


router.get('/login', (req, res) => {
    res.render('login');
})

router.post('/login',(req, res) => {
    const { username, password} = req.body;

    if(!username || !password) {
        res.render('login', {errorMessage: 'Please enter valid credentials'});
        return;
    }

    User.findOne({username})
    .then(user => {
        if(!user) {
            res.render('login', {errorMessage: 'Invalid credentials, please try again'});
            return;
        }
        if(bcrypt.compareSync(password, user.password)) {
            res.redirect('/profile');
        } else {
            res.render('login', {errorMessage: 'Incorrect login credentials, try again'});
        }

    })
    .catch(error => console.log(error));

});










module.exports = router;
