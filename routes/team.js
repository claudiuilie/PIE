const express = require('express');
const router = express.Router();


router.get('/', async (req, res, next) => {
    if (!req.user) {
        res.render('login', {
            layout: 'base',
            message: 'Please login to continue',
            messageClass: 'alert-danger'
        });
        return;
    }
    const user = req.user;
    let payloadContent = {
        user: user,
        curs_status:null
    }

    res.render('team', {payload: payloadContent});

});

module.exports = router;
