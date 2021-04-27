const express = require('express');
const router = express.Router();
const courseService = require('../services/database/courseService');

/* GET home page. */
router.get('/', async (req, res, next) => {

    let payloadContent = {
        user: req.user,
        cursuri: null
    }

    await courseService.getAll()
        .then((data)=>{
            res.body = data;
            payloadContent.cursuri = data;
        })
        .catch((err)=>{
            next(err);
        });

    console.log(payloadContent)
    res.render('home',
        {
            payload: payloadContent
        });

});

module.exports = router;
