const db = require('./mysqlService');
const helper = require('../../helpers/dbHelper');

const getAllQuery = `Select c.name,q.course_id, qr.quiz_id,qr.available,qr.score,
                        DATE_FORMAT(qr.quiz_date, "%d/%m/%Y") "quiz_date",
                        qr.passed, q.minimum_score from courses c
                      left join quiz q on q.course_id = c.id
                      left join quiz_results qr on qr.quiz_id = q.id`;

function getAll(){
    return new Promise(async (resolve,reject)=>{
        try{
            const rows = await db.query(getAllQuery);
            const data = helper.emptyOrRows(rows);
            resolve(data);
        }catch(err){
            reject(err)
        }
    });
}

module.exports = {
    getAll
}


