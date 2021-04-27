const express = require('express');
const router = express.Router();
const quizService = require('../services/database/quizService');

router.get('/', async (req, res, next) => {

    const user = req.user;
    const params = req.query;
    let payloadContent = {
        user: user,
        quiz: null,
        quiz_available: null,
        quiz_passed: null,
        message: {
            type:null,
            text: null
        }
    }

    if(typeof params.c !== "undefined"){
        await quizService.getByCourseId(params.c)
            .then((data)=>{
                res.body = data;
                payloadContent.quiz = data;
                if(data.length > 0){
                    payloadContent.quiz_available = data[0].available;
                    payloadContent.quiz_passed = data[0].passed;
                }
            })
            .catch((err)=>{
                next(err);
            })
        console.log(payloadContent)

        if(payloadContent.quiz_passed ){
            payloadContent.message.text = "Utilizatorul a obtinut deja certificarea pentru acest curs.";
            payloadContent.message.type = "info"
        }else{
            if(!payloadContent.quiz_available && payloadContent.quiz.length > 0){
                payloadContent.message.text = "Utilizatorul nu poate sustine acest curs deoarece este blocat.Pentru deblocare este necesara sustinerea cursurilor anterioare, mai multe informatii sunt disponibile in meniul 'Status Cursuri'";
                payloadContent.message.type = "warning"
            }else if (payloadContent.quiz.length === 0){
                payloadContent.message.text = "Nu exista teste disponibile pentru acest curs.Va rugam contactati administratorul aplicatiei.";
                payloadContent.message.type = "danger"
            }
        }

        res.render('quiz',
            {
                payload: payloadContent
            });
    }else{
        res.redirect('/cursuri');
    }
});

router.post('/submit', async(req,res,next)=>{

    console.log(req.body);
    res.redirect("/")
});

module.exports = router;
