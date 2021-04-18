const express = require('express');
const router = express.Router();
const courseService = require('../services/database/courseService');

router.get('/', async (req, res, next) => {

    const user = req.user;
    const params = req.query;
    let payloadContent = {
        title: "PIE",
        user: user,
        curs: null,
        cursuri: null
    }

    if(typeof params.id !== "undefined"){
        await courseService.getById(params.id)
            .then((data)=>{
                payloadContent.curs = data;
            })
            .catch((err)=>{
                next(err);
            })

        console.log(payloadContent);

        res.render('cursuri',
            {
                payload: payloadContent
            });
    }else{
        await courseService.getAll()
            .then((data)=>{
                payloadContent.cursuri = data;
            })
            .catch((err)=>{
                next(err);
            })

        console.log(payloadContent);

        res.render('cursuri',
            {
                payload: payloadContent
            });
    }
});

module.exports = router;