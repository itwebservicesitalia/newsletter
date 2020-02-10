const mysql = require("promise-mysql");

const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

const db = {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME
};

async function mysql_query(query) {
  const con = await mysql.createConnection(db);

  console.log(`Connected to ${db.host} on database ${db.database}`.blue.bold);

  const result = await con.query(query);

  return result;
}

module.exports = mysql_query;
