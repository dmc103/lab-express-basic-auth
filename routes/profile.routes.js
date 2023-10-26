const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User.model');


router.get('/profile', (req, res) => {
    res.render('profile');
})








module.exports = router;


