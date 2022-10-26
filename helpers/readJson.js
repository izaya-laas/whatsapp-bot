import fs from "fs";
import { promisify } from "util";

const readFile = promisify(fs.readFile);

const readJson = (urlFile) => {
  const res = readFile(urlFile)
    .then((data) => {
      console.log(data.toString());
      return JSON.parse(data.toString()).responses;
    })
    .catch((err) => {
      console.error(err);
      return null;
    });

  return res;
};

export { readJson };
