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

    let message = {
        type:null,
        text: null
    }

    res.render('login', {
        layout: 'base',
        payload: payloadContent,
        message: message
        });

});


router.post('/', async (req, res) => {

    const { email, password } = req.body;
    const hashedPassword = authHelper.getHashedPassword(password);
    const user = await authService.getCredentials(email,hashedPassword);

    console.log(user);

    if (user) {
        const authToken = authHelper.generateAuthToken();
        console.log(1 ,authToken)
        // Store authentication token
        authHelper.getAuthTokens()[authToken] = user.username;
        console.log(authHelper.getAuthTokens())
        // Setting the auth token in cookies
        res.cookie('AuthToken', authToken);

        // Redirect user to the protected page
        res.redirect('/');
    } else {
        res.render('login', {
            layout: 'base',
            message: {
                text: 'Invalid username or password',
                type: "danger"
            }
        });
    }
});

module.exports = router;