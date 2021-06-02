const db = require('./database/mysqlService');
const helper = require('../helpers/dbHelper');

function getCredentials(email, password) {
    const credQuery = `Select * from users where email = ? and password = ?;`
    return new Promise(async (resolve, reject) => {
        try {
            const rows = await db.query(credQuery, [email, password]);
            const data = helper.emptyOrRows(rows);
            resolve(data[0]);
        } catch (err) {
            reject(err)
        }
    });
}

function getUser(email) {
    const credQuery = `Select count(*) "count" from users where email = ?;`
    return new Promise(async (resolve, reject) => {
        try {
            const rows = await db.query(credQuery, [email]);
            const data = helper.emptyOrRows(rows);
            resolve(data[0].count);
        } catch (err) {
            reject(err)
        }
    });
}

function insertUser(params) {

    const credQuery = `INSERT INTO users ( username,email, password, first_name, last_name ) VALUES(?,?,?,?,?);`;
    return new Promise(async (resolve, reject) => {
        try {
            const rows = await db.query(credQuery, Object.values(params));
            const data = helper.emptyOrRows(rows);
            resolve(data);
        } catch (err) {
            reject(err)
        }
    });
}



module.exports = {
    getCredentials,
    getUser,
    insertUser
}