const express = require('express');
const router = express.Router();


router.get('/', async (req, res, next) => {

    const user = req.user;
    let payloadContent = {
        user: user,
        curs_status:null
    }

    res.render('team', {payload: payloadContent});

});

module.exports = router;
