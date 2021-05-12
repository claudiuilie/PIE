const express = require('express');
const router = express.Router();

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

module.exports = router;