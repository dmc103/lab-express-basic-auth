const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User.model');


router.get('/signup', (req, res) => {
    res.render('signup');
});


router.post('/signup', (req, res) => {
    const { username, password, email } = req.body;

    //check if all the fields are filled
    if(!email || !password || !username) {
        res.render('signup', { errorMessage: 'Please fill in all the fields', showLogin: false });
        return;
    }

    //check password strength
    const validPassword = password => {
        const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        return regex.test(password);
    }
    

    //check if the user email already exists
    User.findOne({ email: req.body.email })
    .then(userMail => {
        if (userMail) {
            res.render('signup', { errorMessage: 'User already exists, please log in', showLogin: true });
        } else {
            // hash the password
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(req.body.password, salt);

            //create the user
            User.create({ username: req.body.username, password: hashedPassword, email: req.body.email })
                .then(createdUser => {
                    console.log(createdUser);
                    res.redirect('/');
                })
                .catch(err => {
                    if(err.code === 11000) {
                        res.render('signup', { errorMessage: 'Username or email already exists, please try again', showLogin: false});
                    } else {
                        console.log(err);
                        res.render('signup', { errorMessage: 'Something went wrong, please try again'});
                    }
                    
                });
        
        }
    })
    .catch(err => {
        console.log(err);
        res.render('signup', { errorMessage: 'Something went wrong, please try again'});
    })
});





module.exports = router;