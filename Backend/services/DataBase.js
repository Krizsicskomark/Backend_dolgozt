const mysql = require("mysql2/promise");
const {config} = require("../config/config");

async function query(sql, params) {
    const conection = await mysql.createConnection(config.db);
    try {
        const [result] = await conection.execute(sql, params);
        return result;
    }
    finally {
        await conection.end();
    }
}

module.exports = {query}