const express = require('express');
const router = express.Router();
const quizService = require('../services/database/quizService');
const courseService = require('../services/database/courseService');

router.get('/', async (req, res, next) => {
    let minScore;
    const quizResults = req.session.score;
    const user = req.user;
    let message = {
        type:null,
        text: null
    }
    let payloadContent = {
        user: user,
        score: null,
        questions: null,
        quiz_pass: false,
        course_id: null
    }

    if (typeof quizResults === "undefined") {
        res.redirect('/');
    } else {
        payloadContent.score = quizResults;
        await quizService.getByQuizId(quizResults.quiz_id)
            .then((data) => {
                payloadContent.questions = data;
            })
            .catch((err) => {
                next(err);
            });

        const scored = quizResults.scored;
        for (let k in payloadContent.questions) {
            payloadContent.questions[k]["scored"] = scored.includes(payloadContent.questions[k].id);
        }

        await quizService.getQuizMinScore(quizResults.quiz_id)
            .then((data) => {
                minScore = data[0].minimum_score;
            })
            .catch((err) => {
                next(err);
            });

        if (payloadContent.score.points >= minScore){
            payloadContent.quiz_pass = true;
            message.type = "success"
            message.text = `Felicitari! Ai obtinut ${payloadContent.score.points} de puncte din 100 disponibile.`
        }else if(payloadContent.score.points < minScore){
            payloadContent.quiz_pass = false;
            message.type = "danger"
            message.text = `Din pacate ai obtinut doar ${payloadContent.score.points} de puncte din 100 disponibile.Pentru a putea promova ai nevoie de cel putin ${minScore} de puncte.`
        }

        await courseService.getByQuizId(quizResults.quiz_id)
            .then((data) => {
                payloadContent.course_id = data[0].id;
            })
            .catch((err) => {
                next(err);
            });


        console.log(payloadContent)
        res.render('quiz_results', {payload: payloadContent, message:message})
    }

});

module.exports = router;