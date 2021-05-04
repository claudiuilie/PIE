const express = require('express');
const router = express.Router();
const profileService = require('../services/database/profileService');


router.get('/', async (req, res, next) => {

    const user = req.user;
    let payloadContent = {
        user: user,
        curs_status:null
    }

    await profileService.getAll()
        .then((data)=>{
            res.body = data;
            payloadContent.curs_status = data;
            console.log(payloadContent)
            res.render('profil', {payload: payloadContent});
        })
        .catch((err)=>{
            next(err);
        });

});

module.exports = router;
