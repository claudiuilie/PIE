const express = require('express');
const router = express.Router();
const authHelper = require('../helpers/authHelper');
const authService = require('../services/authService');

router.get('/', async (req, res, next) => {

    const user = req.user;
    let payloadContent = {
        user: user,
        curs_status:null
    }

    res.render('login', {
        layout: 'base',
        payload: payloadContent,
        message: {}
        });

});

router.post('/', async (req, res) => {

    const { email, password } = req.body;
    const hashedPassword = authHelper.getHashedPassword(password);
    const user = await authService.getCredentials(email,hashedPassword);

    if (user) {
        const authToken = authHelper.generateAuthToken();
        authHelper.getAuthTokens()[authToken] = user.username;

        res.cookie('AuthToken', authToken);

        res.redirect('/');
    } else {
        res.render('login', {
            layout: 'base',
            message: {
                text: 'Credentiale invalide.',
                type: "danger"
            }
        });
    }
});

module.exports = router;