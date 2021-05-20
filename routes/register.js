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

    res.render('register', {
        layout: 'base',
        payload: payloadContent,
        message: message
    });

});

router.post('/', async (req, res) => {
    const { email, firstName, lastName, password, confirmPassword } = req.body;
    console.log(req.body)
    // Check if the password and confirm password fields match
    if (password === confirmPassword) {

        const user = await authService.getUser(email);
        // Check if user with the same email is also registered
        if (user) {

            res.render('register', {
                layout: 'base',
                message: {
                    type: 'danger',
                    text: 'Exista deja un utilizator cu aceasta adresa de email!'
                }
            });

            return;
        }
        const hashedPassword = authHelper.getHashedPassword(password);

        // Store user into the database if you are using one
        const insertResult = await authService.insertUser({
            username:lastName,
            email: email,
            password:hashedPassword,
            first_name: firstName,
            last_name: lastName
        });

        res.render('login', {
            layout: 'base',
            message: {
                type: 'success',
                text: 'Utilizatorul a fost inregistrat! Va rugam sa va autentificati.'
            }
        });
    } else {
        res.render('register', {
            layout: 'base',
            message: {
                type: 'danger',
                text: 'Parola incorecta!'
            }
        });
    }
});

module.exports = router;
