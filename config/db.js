const mysql = require("promise-mysql");

const db = {
  host: "wed-usa.com",
  user: "rexnewsletter",
  password: "Pippo565",
  database: "rex_newsletter"
};

async function mysql_query(query) {
  const con = await mysql.createConnection(db);

  console.log(`Connected to ${db.host} on database ${db.database}`.blue.bold);

  const result = await con.query(query);

  return result;
}

module.exports = mysql_query;
