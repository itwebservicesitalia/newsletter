import dotenv from "dotenv";

dotenv.config();

import { query } from "./config/db";

import { parse_csv } from "./utils/csv";

const filename = "rex_email16";

const seeder = (async () => {
  const emails = await parse_csv(filename, {
    delimiter: "\r",
    encoding: "utf-8",
  });

  const result = await query(
    "INSERT INTO email (email) VALUES ? ON DUPLICATE KEY UPDATE email=email",
    [emails]
  );

  console.log(result);

  process.exit();
})();
