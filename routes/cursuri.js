const express = require('express');
const router = express.Router();
const courseService = require('../services/database/courseService');

router.get('/', async (req, res, next) => {

    const user = req.user;
    const params = req.query;
    let payloadContent = {
        user: user,
        curs: null,
        curs_name:null,
        curs_id:null
    }

    if(typeof params.id !== "undefined"){
        await courseService.getById(params.id)
            .then((data)=>{
                res.body = data;
                payloadContent.curs = data;

                if(data.length > 0 ){
                    payloadContent.curs_name = data[0].name;
                    payloadContent.curs_id = data[0].id;
                }
            })
            .catch((err)=>{
                next(err);
            });

        res.render('cursuri',
            {
                payload: payloadContent
            });
    }else{
        res.redirect('/');
    }
});

module.exports = router;
