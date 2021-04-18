const httpAuth = require('http-auth');
const authConnect = require("http-auth-connect");
const db = require('./database/mysqlService');
const helper = require('../helpers/dbHelper');

function getCredentials(username, password) {
    const credQuery = `Select * from users;`
    return new Promise(async (resolve, reject) => {
        try {
            const rows = await db.query(credQuery, [username, password]);
            const data = helper.emptyOrRows(rows);
            resolve(data);
        } catch (err) {
            reject(err)
        }
    });
}

const basicAuth = httpAuth.basic(
    // {file: path.join(__dirname, '../users.htpasswd')}
    {realm: "Simon Area."},
    async function (username, password, callback) {
        let user;
        await getCredentials(username,password)
            .then((data)=>{
                const user = data[0];
                callback(username === user.username && password === user.password)
            })
            .catch((err)=>{console.log(err)})
    });

module.exports = authConnect(basicAuth);