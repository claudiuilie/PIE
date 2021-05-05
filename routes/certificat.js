const express = require('express');
const router = express.Router();
const certificateService = require('../services/database/certificateService');

router.get('/', async (req, res, next) => {

    const user = req.user;
    let message = {
        type:null,
        text: null
    }
    let payloadContent = {
        user: user,
        certificate:null
    }

    if(typeof req.query.c !== "undefined"){
        await certificateService.getCertificate(req.query.c,user)
            .then((data)=>{
                if(data.length > 0){
                    payloadContent.certificate = data[0];
                }else{
                    message.type = "warning";
                    message.text = "Pentru a putea genera certificatul este nevoie de sutinerea testului."
                }
            })
            .catch((err)=>{
                next(err);
            });

        res.render('certificat', {payload: payloadContent, message: message});
    }else{
        res.redirect('/');
    }
});

module.exports = router;