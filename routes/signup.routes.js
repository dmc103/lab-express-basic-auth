const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User.model');


router.get('/signup', (req, res) => {
    res.render('signup');
});


router.post('/signup', (req, res) => {
    console.log(req.body);
    

    //check if the user already exists
    User.findOne({ username: req.body.username })
    .then(user => {
        if (user) {
            res.render('signup', { errorMessage: 'User already exists, please log in' });
        } else {
            // hash the password
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(req.body.password, salt);

            //create the user
            User.create({ username: req.body.username, password: hashedPassword })
                .then(createdUser => {
                    console.log(createdUser);
                    res.redirect('/');
                })
                .catch(err => {
                    console.log(err);
                })
        
        }
    })
    .catch(err => {
        console.log(err);
    })
});





module.exports = router;