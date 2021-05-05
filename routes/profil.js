const express = require('express');
const router = express.Router();
const profileService = require('../services/database/profileService');


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

    await profileService.getAll(req.user)
        .then((data)=>{
            res.body = data;
            payloadContent.curs_status = data;
        })
        .catch((err)=>{
            next(err);
        });

    if(payloadContent.curs_status.length === 0){
        message.type = "warning";
        message.text = "Nu exista cursuri disponibile pentru acest utilizator.Va rugam contactati administratorul aplicatiei."
    }

    res.render('profil', {payload: payloadContent, message: message});

});

module.exports = router;
