const express = require('express');
const router = express.Router();
const quizService = require('../services/database/quizService');

router.get('/', async (req, res, next) => {

    const user = req.user;
    const params = req.query;
    let payloadContent = {
        title: "PIE",
        user: user,
        quiz: null
    }

    if(typeof params.c !== "undefined"){
        await quizService.getByCourseId(params.c)
            .then((data)=>{
                res.body = data;
                payloadContent.quiz = data;
            })
            .catch((err)=>{
                next(err);
            })

        res.render('quiz',
            {
                payload: payloadContent
            });
    }else{
        res.redirect('/cursuri');
    }
});

module.exports = router;
