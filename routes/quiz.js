const express = require('express');
const router = express.Router();
const quizService = require('../services/database/quizService');
const quizHelper = require('../helpers/quizHelper');

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
        quiz: null,
        quiz_available: null,
        quiz_passed: null,
        quiz_id: null,
        course_description: null
    }
    let message = {
        type:null,
        text: null
    }

    if(typeof params.c !== "undefined"){
        await quizService.getByCourseId(params.c)
            .then((data)=>{
                res.body = data;
                payloadContent.quiz = data;
                if(data.length > 0){
                    payloadContent.quiz_available = data[0].available;
                    payloadContent.quiz_passed = data[0].passed;
                    payloadContent.quiz_id = data[0].quiz_id;
                    payloadContent.course_description = data[0].quiz_description;
                }
            })
            .catch((err)=>{
                next(err);
            })

        if(payloadContent.quiz_passed ){
           message.text = "Utilizatorul a obtinut deja certificarea pentru acest curs.";
           message.type = "info"
        }else{
            if(!payloadContent.quiz_available && payloadContent.quiz.length > 0){
               message.text = "Utilizatorul nu poate sustine acest curs deoarece este blocat.Pentru deblocare este necesara sustinerea cursurilor anterioare, mai multe informatii sunt disponibile in meniul 'Status Cursuri'";
               message.type = "warning"
            }else if (payloadContent.quiz.length === 0){
               message.text = "Nu exista teste disponibile pentru acest curs.Va rugam contactati administratorul aplicatiei.";
               message.type = "danger"
            }
        }

        res.render('quiz',
            {
                payload: payloadContent,
                message: message
            });
    }else{
        res.redirect('/cursuri');
    }
});

router.post('/submit', async(req,res,next)=>{
    if (!req.user) {
        res.render('login', {
            layout: 'base',
            message: 'Please login to continue',
            messageClass: 'alert-danger'
        });
        return;
    }
    let quizDb;
    let quizUser;
    let qId = req.body.quiz_id
    if(req.body){
        quizUser = req.body;
        await quizService.getCorrectChoices(qId)
            .then((data)=>{
                res.body = data;
                quizDb = data;
            })
            .catch((err)=>{
                next(err);
            })
    }

    req.session.score = {
        points : quizHelper.quizScore(quizHelper.quizDbConverter(quizDb), quizHelper.quizUserConverter(quizUser)),
        scored: quizHelper.correctAnswers(),
        quiz_id: qId
    };

    res.redirect("/results")

});

module.exports = router;

