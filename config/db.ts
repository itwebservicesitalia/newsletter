import mysql from "mysql";

const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

const db_options = {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
};

export const db = mysql.createConnection(db_options);

db.connect((err: mysql.MysqlError) => {
  if (err) throw err;

  console.log(
    `Connected to ${db_options.host} on database ${db_options.database}`
  );
});

export const query = async (query: string, options?: any) => {
  return new Promise((resolve, reject) => {
    db.query(query, options, (err, results) => {
      if (err) reject(err);

      resolve(results);
    });
  });
};
