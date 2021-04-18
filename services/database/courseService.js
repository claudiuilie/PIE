const db = require('./mysqlService');
const helper = require('../../helpers/dbHelper');

const getByIdQuery = `select c.*,cc.description,cc.context
                        from courses c 
                        join course_chapters cc on cc.course_id = c.id
                      where c.id = ?;`;
const getAllQuery = `select * from courses;`

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
    getAll
}