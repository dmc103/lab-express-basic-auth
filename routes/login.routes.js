const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User.model');


router.get('/login', (req, res) => {
    res.render('login');
})



module.exports = router;
