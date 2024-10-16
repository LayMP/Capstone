//Import 
const sql  = require('mssql');


const dbSettings = {
    user:'sa',
    password: 'Bbenja386-',
    server: 'localhost',
    database: 'MediConnect360',
    options: {
        encrypt: false,
        trustServerCertificate: false
    }
}



const getConnection = async () => {
    try {
        const pool = await sql.connect(dbSettings);
        return pool;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getConnection: getConnection,
    sql: sql
}
