import fs from "fs";

const readFile = fs.readFile;

const readJson = async (urlFile) => {
  let json;

  try {
    const response = await readFile(urlFile);
    json = JSON.parse(response.toString());
  } catch (err) {
    console.error(err);
    json = null;
  }
  console.log(json);

  return json;
};

export { readJson };
