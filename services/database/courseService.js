const db = require('./mysqlService');
const helper = require('../../helpers/dbHelper');

const getByIdQuery = `select c.*,cc.description,cc.context
                        from courses c 
                        join course_chapters cc on cc.course_id = c.id
                      where c.id = ?;`;
const getAllQuery = `select c.*,qr.available, qr.passed, qr.score from courses c 
                      left join quiz q on q.course_id = c.id
                      left join quiz_results qr on qr.quiz_id = q.id;`

const getByQuizIdQuery = `select c.* from quiz q 
                        join courses c on c.id = q.course_id
                        where q.id = ?`
function getById(id){
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
    getById,
    getAll,
    getByQuizId
}