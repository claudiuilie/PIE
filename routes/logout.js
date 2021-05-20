const express = require('express');
const router = express.Router();
const authHelper = require('../helpers/authHelper');
const authService = require('../services/authService');

router.get('/',  (req, res, next) => {

    // authHelper.getAuthTokens()
    const token = req.cookies.AuthToken
    delete authHelper.getAuthTokens()[token]
    res.redirect('/logare');

});

module.exports = router;
