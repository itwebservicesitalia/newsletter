import dotenv from "dotenv";

dotenv.config();

import { query } from "./config/db";

import { parse_csv } from "./utils/csv";

const filename = "rex_email17";

(async () => {
  const emails = await parse_csv(filename, {
    delimiter: "\r",
    encoding: "utf-8",
  });

  await query("SET CHARACTER SET utf8");

  await query("CREATE DATABASE IF NOT EXISTS newsletter");

  await query(`
    CREATE TABLE IF NOT EXISTS ${filename} (
      id INT NOT NULL AUTO_INCREMENT, 
      email TEXT NOT NULL,
      PRIMARY KEY (id)
    );
  `);

  const result = await query(
    `INSERT INTO ${filename} (email) VALUES ? ON DUPLICATE KEY UPDATE email=email`,
    [emails]
  );

  console.log(result);

  process.exit();
})();
