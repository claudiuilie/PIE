const db = require('./mysqlService');
const helper = require('../../helpers/dbHelper');

const getByIdQuery = ` select qq.id,qq.description,qq.context,qq.choice_a,qq.choice_b,qq.choice_c,qq.choice_d, qr.passed,qr.available
                        from quiz q 
                        join quiz_questions qq on qq.quiz_id = q.id
                        join quiz_results qr on qr.quiz_id = q.id
                       where q.course_id =?;`;

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

module.exports = {
    getByCourseId
}