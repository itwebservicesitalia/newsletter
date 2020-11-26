import fs from "fs";
import path from "path";

import parse from "csv-parse";

export const parse_csv = (
  filename: string,
  options?: parse.Options
): Promise<Array<any>> => {
  const data: any[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, `../csv/${filename}.csv`))
      .pipe(parse(options))
      .on("data", (dataRow) => {
        data.push(dataRow);
      })
      .on("end", () => {
        resolve(data);
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};
