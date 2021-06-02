const express = require('express');
const router = express.Router();
const courseService = require('../services/database/courseService');

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
    const params = req.query;
    let payloadContent = {
        user: user,
        curs: null,
        curs_name:null,
        curs_id:null,
        curs_description: null
    }

    if(typeof params.id !== "undefined"){
        await courseService.getById(params.id)
            .then((data)=>{
                res.body = data;
                payloadContent.curs = data;

                if(data.length > 0 ){
                    payloadContent.curs_name = data[0].name;
                    payloadContent.curs_id = data[0].id;
                    payloadContent.curs_description = data[0].description;
                }
            })
            .catch((err)=>{
                next(err);
            });

        const subchapters = await  courseService.getChaptersByCourseId(params.id);

        for(let x in payloadContent.curs)
            payloadContent.curs[x].subchapters = [];

        for(let k in subchapters) {
            subchapters[k].context = subchapters[k].context !== null ? subchapters[k].context.trim() : subchapters[k].context;
            for(let z in payloadContent.curs)
            {
                if(subchapters[k].description === payloadContent.curs[z].cc_description){
                    payloadContent.curs[z].subchapters.push(subchapters[k])
                }
            }
        }

        res.render('cursuri',
            {
                payload: payloadContent
            });
    }else{
        res.redirect('/');
    }
});

module.exports = router;
