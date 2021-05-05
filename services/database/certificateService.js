const db = require('./mysqlService');
const helper = require('../../helpers/dbHelper');

const certQuery = `select u.first_name,u.last_name,c.description,qr.score,DATE_FORMAT(qr.quiz_date, "%d %M,%Y") "quiz_date"
                    from courses c 
                    join quiz q on q.course_id = c.id
                    join quiz_results qr on qr.quiz_id = q.id
                    join users u on u.id = qr.user_id
                    where c.id = ?
                    and u.username = ?
                    and qr.passed = 1;`;

function getCertificate(courseId, userName){
    return new Promise(async (resolve,reject)=>{
        try{
            const rows = await db.query(certQuery,[courseId, userName]);
            const data = helper.emptyOrRows(rows);
            resolve(data);
        }catch(err){
            reject(err)
        }
    });
}

module.exports = {
 getCertificate
}