const express = require('express');
const router = express.Router();
const courseService = require('../services/database/courseService');

/* GET home page. */
router.get('/', async (req, res, next) => {

    if (!req.user) {
        res.render('login', {
            layout: 'base',
            message: 'Please login to continue',
            messageClass: 'alert-danger'
        });
       return;
    }

    let payloadContent = {
        user: req.user,
        cursuri: null
    }
    let message = {
        type:null,
        text: null
    }

    await courseService.getAll(req.user)
        .then((data)=>{
            res.body = data;
            payloadContent.cursuri = data;
        })
        .catch((err)=>{
            next(err);
        });

    if(payloadContent.cursuri.length === 0){
        message.type = "warning";
        message.text = "Nu exista cursuri disponibile pentru acest utilizator.Va rugam contactati administratorul aplicatiei."
    }
    res.render('home',
        {
            payload: payloadContent,
            message: message
        });

});


module.exports = router;
