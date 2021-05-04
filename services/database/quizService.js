const db = require('./mysqlService');
const helper = require('../../helpers/dbHelper');
const pString = "?,";
const getByIdQuery = ` select q.id "quiz_id",q.description "quiz_description",qq.id,qq.description,qq.context,qq.choice_a,qq.choice_b,qq.choice_c,qq.choice_d, qr.passed,qr.available
                        from quiz q 
                        join quiz_questions qq on qq.quiz_id = q.id
                        join quiz_results qr on qr.quiz_id = q.id
                       where q.course_id =?;`;

const getCorrectChoicesQuery = `select qr.id,qr.correct_choice 
                                   from quiz_questions qr
                                   join quiz q on q.id= qr.quiz_id
                                where quiz_id = ?;`;

const getByQuizIdQuery = `select * from quiz_questions where quiz_id = ?`;
const getQuizScoreQuery = `select minimum_score from quiz where id = ?;`;

const setQuizUnlockQuery = `update quiz_results
                            set available = 1 
                            where id = (
                            select sum(id+1) 
                            from quiz_results
                            where user_id = (select id from users where username = ?)
                            and quiz_id = (select id from quiz where course_id = ?)
                            );`



function setQuizStatus(score,username,courseId) {
    return new Promise(async (resolve,reject)=>{
        try{
            let d = new Date();
            console.log(d.getFullYear());
            let year = d.getFullYear();
            let month = d.getMonth()+1;
            let day = d.getDate()
            let qd = year + "/" + month + "/" + day;
            console.log(qd);
            const setQuizStatusQuery = `update quiz_results
                            set passed = 1,
                            score = ?,
                            quiz_date = '${qd}'
                            where user_id = (select id from users where username = ?)
                            and quiz_id = (select id from quiz where course_id = ?)`;

            const rows = await db.query(setQuizStatusQuery,[score,username,courseId]);
            const data = helper.emptyOrRows(rows);
            resolve(data);
        }catch(err){
            reject(err)
        }
    });
}

function setQuizUnlock(username,courseId) {
    return new Promise(async (resolve,reject)=>{
        try{
            const rows = await db.query(setQuizUnlockQuery,[username,courseId]);
            const data = helper.emptyOrRows(rows);
            resolve(data);
        }catch(err){
            reject(err)
        }
    });
}

function getQuizMinScore(id) {
    return new Promise(async (resolve,reject)=>{
        try{
            const rows = await db.query(getQuizScoreQuery,id);
            const data = helper.emptyOrRows(rows);
            resolve(data);
        }catch(err){
            reject(err)
        }
    });
}

function getByQuizQuestionId(id, isIn){
    let getByQuizQuestionIdQuery = `select * from quiz_questions where id ${isIn ? "in" : "not in"}`;
    getByQuizQuestionIdQuery += `(${pString.repeat(id.length).slice(0,-1)})`;
    return new Promise(async (resolve,reject)=>{
        try{
            const rows = await db.query(getByQuizQuestionIdQuery,id);
            const data = helper.emptyOrRows(rows);
            resolve(data);
        }catch(err){
            reject(err)
        }
    });
}

function getByCourseId(id){
    return new Promise(async (resolve,reject)=>{
        try{
            const rows = await db.query(getByIdQuery,[id]);
            const data = helper.emptyOrRows(rows);
            resolve(data);
        }catch(err){
            reject(err)
        }
    });
}

function getByQuizId(id){
    return new Promise(async (resolve,reject)=>{
        try{
            const rows = await db.query(getByQuizIdQuery,[id]);
            const data = helper.emptyOrRows(rows);
            resolve(data);
        }catch(err){
            reject(err)
        }
    });
}

function getCorrectChoices(quizId){
    return new Promise(async (resolve,reject)=>{
        try{
            const rows = await db.query(getCorrectChoicesQuery,[quizId]);
            const data = helper.emptyOrRows(rows);
            resolve(data);
        }catch(err){
            reject(err)
        }
    });
}

module.exports = {
    getByCourseId,
    getCorrectChoices,
    getByQuizQuestionId,
    getByQuizId,
    getQuizMinScore,
    setQuizUnlock,
    setQuizStatus
}