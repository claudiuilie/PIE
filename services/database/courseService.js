const db = require('./mysqlService');
const helper = require('../../helpers/dbHelper');

const getByIdQuery = `select c.*,cc.description "cc_description"
                        from courses c 
                        join course_chapters cc on cc.course_id = c.id
                      where c.id =?;`;

const getAllQuery = `select c.*,qr.available, qr.passed, qr.score from courses c 
                      left join quiz q on q.course_id = c.id
                      left join quiz_results qr on qr.quiz_id = q.id
                      left join users u on u.id = qr.user_id
                      where u.username = ?`

const getByQuizIdQuery = `select c.* from quiz q 
                        join courses c on c.id = q.course_id
                        where q.id = ?`

const getChaptersByCourseIdQuery = `select cc.description,cs.description "cs_description",cs.context
                        from course_chapters cc 
                        join course_subchapters cs on cs.chapter_id = cc.id
                      where cc.course_id = ?`;
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

function getChaptersByCourseId(id){
    return new Promise(async (resolve,reject)=>{
        try{
            const rows = await db.query(getChaptersByCourseIdQuery,[id]);
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

function getAll(userName){
    return new Promise(async (resolve,reject)=>{
        try{
            const rows = await db.query(getAllQuery, [userName]);
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
    getByQuizId,
    getChaptersByCourseId
}