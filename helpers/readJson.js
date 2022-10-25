import fs from "fs";
import { promisify } from "util";

const readFile = promisify(fs.readFile);

const readJson = (urlFile) => {
  readFile(urlFile)
    .then((data) => {
      json = JSON.parse(data.toString()).responses;
      console.log(data);
    })
    .catch((err) => {
      json = null;
      console.error(err);
    });
};

export { readJson };
